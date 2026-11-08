import { expect, test, type Page } from '@playwright/test'

const presentation = (page: Page) => page.locator('.presentation-control')
const start = (page: Page) => page.getByRole('button', { name: 'Iniciar apresentação' })
const scrollY = (page: Page) => page.evaluate(() => window.scrollY)

async function openWithClock(page: Page, path = '/') {
  const time = new Date('2026-01-01T00:00:00Z')
  await page.clock.install({ time })
  await page.clock.pauseAt(time)
  await page.goto(path)
}

async function assertStopped(page: Page) {
  await expect(presentation(page)).toHaveAttribute('data-state', 'paused')
  // Aguarda a rolagem nativa da roda/tecla, que continua permitida.
  await page.clock.runFor(1_000)
  await page.waitForTimeout(250)
  const position = await scrollY(page)
  await page.clock.runFor(6_000)
  expect(await scrollY(page)).toBeCloseTo(position, 0)
  await expect(presentation(page)).toHaveAttribute('data-state', 'paused')
}

test('aguarda quatro segundos e mantém aproximadamente 20 px/s', async ({ page }) => {
  await openWithClock(page)
  await expect(presentation(page)).toHaveAttribute('data-state', 'waiting')
  await page.clock.runFor(3_990)
  expect(await scrollY(page)).toBe(0)
  await page.clock.runFor(1_010)
  await expect(presentation(page)).toHaveAttribute('data-state', 'playing')
  expect(await scrollY(page)).toBeGreaterThanOrEqual(18)
  expect(await scrollY(page)).toBeLessThanOrEqual(22)
  const before = await scrollY(page)
  await page.clock.runFor(2_000)
  expect((await scrollY(page)) - before).toBeGreaterThanOrEqual(38)
  expect((await scrollY(page)) - before).toBeLessThanOrEqual(42)
})

test('controle cancela a espera, inicia e pausa explicitamente', async ({ page }) => {
  await openWithClock(page)
  await page.getByRole('button', { name: 'Pausar apresentação' }).click()
  await assertStopped(page)
  await start(page).click()
  await page.clock.runFor(1_000)
  expect(await scrollY(page)).toBeGreaterThan(15)
  await page.getByRole('button', { name: 'Pausar apresentação' }).click()
  await assertStopped(page)
})

for (const phase of ['waiting', 'playing'] as const) {
  for (const interaction of ['wheel', 'touch', 'scrollbar', 'keyboard', 'focus', 'click', 'hidden'] as const) {
    test(`${interaction} interrompe no estado ${phase} e não retoma sozinho`, async ({ page }) => {
      await openWithClock(page)
      if (phase === 'playing') await page.clock.runFor(5_000)
      if (interaction === 'wheel') await page.mouse.wheel(0, 170)
      if (interaction === 'touch') await page.locator('main').dispatchEvent('touchstart')
      if (interaction === 'scrollbar') {
        // Uma alteração externa de scroll representa a barra nativa; não usa a API do controlador.
        await page.evaluate(() => window.scrollTo({ top: 400, behavior: 'instant' }))
        await page.clock.runFor(20)
      }
      if (interaction === 'keyboard') await page.keyboard.press('ArrowDown')
      if (interaction === 'focus') await page.locator('.hero-actions a').first().focus()
      if (interaction === 'click') await page.locator('.hero-description').click()
      if (interaction === 'hidden') {
        await page.evaluate(() => {
          Object.defineProperty(document, 'hidden', { configurable: true, get: () => true })
          document.dispatchEvent(new Event('visibilitychange'))
        })
      }
      await assertStopped(page)
      if (interaction === 'hidden') {
        await page.evaluate(() => {
          Object.defineProperty(document, 'hidden', { configurable: true, get: () => false })
          document.dispatchEvent(new Event('visibilitychange'))
        })
        await page.clock.runFor(5_000)
        await expect(presentation(page)).toHaveAttribute('data-state', 'paused')
      }
    })
  }
}

test('uma interrupção permite retomada somente pelo controle', async ({ page }) => {
  await openWithClock(page)
  await page.clock.runFor(5_000)
  await page.mouse.wheel(0, 100)
  await assertStopped(page)
  const before = await scrollY(page)
  await start(page).click()
  await page.clock.runFor(1_000)
  expect((await scrollY(page)) - before).toBeGreaterThan(15)
})

for (const setting of ['mobile', 'touch-desktop', 'reduced-motion', 'anchor'] as const) {
  test(`${setting} não inicia automaticamente, mas aceita início explícito`, async ({ page }) => {
    if (setting === 'mobile') await page.setViewportSize({ width: 390, height: 844 })
    if (setting === 'touch-desktop') await page.addInitScript(() => {
      const native = window.matchMedia.bind(window)
      window.matchMedia = (query) => {
        const result = native(query)
        if (query.includes('pointer: fine')) Object.defineProperty(result, 'matches', { value: false })
        return result
      }
    })
    if (setting === 'reduced-motion') await page.emulateMedia({ reducedMotion: 'reduce' })
    await openWithClock(page, setting === 'anchor' ? '/#projetos' : '/')
    await expect(presentation(page)).toHaveAttribute('data-state', 'paused')
    await page.clock.runFor(6_000)
    await expect(presentation(page)).toHaveAttribute('data-state', 'paused')
    const before = await scrollY(page)
    await start(page).click()
    await page.clock.runFor(1_000)
    expect((await scrollY(page)) - before).toBeGreaterThan(15)
  })
}

test('para no fim, sem retornar ao topo', async ({ page }) => {
  await openWithClock(page)
  await page.getByRole('button', { name: 'Pausar apresentação' }).click()
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight - innerHeight - 8, behavior: 'instant' }))
  await start(page).click()
  await page.clock.runFor(1_000)
  await expect(presentation(page)).toHaveAttribute('data-state', 'finished')
  const end = await scrollY(page)
  await page.clock.runFor(10_000)
  expect(await scrollY(page)).toBe(end)
  expect(end).toBeGreaterThan(1_000)
})

test('âncoras continuam navegando durante a apresentação', async ({ page }) => {
  await openWithClock(page)
  await page.clock.runFor(5_000)
  await page.getByRole('link', { name: 'Ver projetos', exact: true }).click()
  await expect(page).toHaveURL(/#projetos$/)
  await expect(presentation(page)).toHaveAttribute('data-state', 'paused')
  await page.clock.runFor(1_000)
  await expect(page.getByRole('heading', { name: 'Do conceito à aplicação.' })).toBeInViewport()
})

test('Tab pausa e o controle funciona por teclado', async ({ page }) => {
  await openWithClock(page)
  await page.keyboard.press('Tab')
  await assertStopped(page)
  await start(page).focus()
  await page.keyboard.press('Enter')
  await expect(presentation(page)).toHaveAttribute('data-state', 'playing')
  await page.clock.runFor(1_000)
  expect(await scrollY(page)).toBeGreaterThan(15)
  await page.keyboard.press('Space')
  await expect(presentation(page)).toHaveAttribute('data-state', 'paused')
})

test('o controle inicia e pausa por toque no celular', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true })
  const page = await context.newPage()
  await openWithClock(page)
  await expect(presentation(page)).toHaveAttribute('data-state', 'paused')
  await start(page).tap()
  await page.clock.runFor(1_000)
  expect(await scrollY(page)).toBeGreaterThan(15)
  await page.getByRole('button', { name: 'Pausar apresentação' }).tap()
  await assertStopped(page)
  await context.close()
})

test('rola e para com a roda também usando o relógio real do navegador', async ({ page }) => {
  await page.goto('/')
  await expect(presentation(page)).toHaveAttribute('data-state', 'waiting')
  await expect(presentation(page)).toHaveAttribute('data-state', 'playing', { timeout: 6_000 })
  await expect.poll(() => scrollY(page)).toBeGreaterThan(15)
  await page.mouse.wheel(0, 180)
  await expect(presentation(page)).toHaveAttribute('data-state', 'paused')
  await page.waitForTimeout(400)
  const position = await scrollY(page)
  await page.waitForTimeout(800)
  expect(await scrollY(page)).toBe(position)
})

for (const viewport of [{ width: 1440, height: 900 }, { width: 1366, height: 768 }, { width: 768, height: 1024 }, { width: 390, height: 844 }, { width: 360, height: 800 }, { width: 320, height: 740 }]) {
  test(`layout sem transbordamento em ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.emulateMedia({ reducedMotion: 'reduce' })
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(viewport.width)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(start(page)).toBeInViewport()
    const buttons = await page.locator('.hero-actions').boundingBox()
    expect(buttons!.y + buttons!.height).toBeLessThan(viewport.height)
    if (viewport.width > 1024) {
      const photo = await page.locator('.portrait').boundingBox()
      expect(photo!.y + photo!.height).toBeLessThan(viewport.height)
    }
    if (viewport.width <= 760) {
      await page.getByRole('button', { name: 'Abrir menu' }).click()
      await expect(page.getByRole('navigation')).toBeVisible()
      expect(await page.locator('.hero').evaluate((element) => element.getBoundingClientRect().top)).toBeGreaterThan(250)
      await page.keyboard.press('Escape')
      await expect(page.getByRole('button', { name: 'Abrir menu' })).toBeFocused()
      await page.getByRole('button', { name: 'Abrir menu' }).click()
      await page.getByRole('navigation').getByRole('link', { name: 'Projetos', exact: true }).click()
      await expect(page).toHaveURL(/#projetos$/)
      await expect(page.getByRole('navigation')).toBeHidden()
    }
    for (const summary of await page.locator('.project-details summary').all()) {
      await summary.click()
      await expect(summary.locator('..')).toHaveAttribute('open', '')
    }
    const invalidLinks = await page.locator('a').evaluateAll((links) => links.filter((link) => !link.getAttribute('href') || link.getAttribute('href') === '#').length)
    expect(invalidLinks).toBe(0)
    expect(errors).toEqual([])
  })
}
