# Portfólio — Gustavo Tecedora

Site de página única em português brasileiro, feito com React, TypeScript e Vite. Não depende de back-end. As fontes são servidas pelo próprio projeto, sem requisições a serviços de fontes.

URL pública: https://gustavotc-web.github.io/

## Executar

Requer Node.js 22.12+ e npm. Node.js 24 LTS é a versão recomendada e usada no GitHub Actions; `.nvmrc` registra essa versão.

```bash
npm ci
npm run dev
```

No PowerShell com scripts bloqueados, use `npm.cmd` no lugar de `npm`. Acesse o endereço local exibido pelo Vite.

## Verificar e gerar produção

```bash
npm run check
npm run build
npm run preview
```

O build estático fica em `dist/`. `preview` permite revisar esse build localmente. O projeto não usa serviço de envio de mensagens nem analytics.

## Personalizar

- **Textos, projetos, tecnologias e links:** `src/data/portfolio.ts`. O conteúdo tem tipos TypeScript. Repositórios e demonstrações são opcionais e só aparecem quando um endereço está definido.
- **Cores, fontes e espaçamento:** variáveis no início de `src/styles.css`. O restante do arquivo está dividido em camadas de base, componentes e responsividade.
- **Modo apresentação:** `src/data/presentation.ts` define velocidade (`speed`, em px/s), espera inicial (`delay`, em ms) e a condição de desktop (`desktopQuery`). O comportamento está em `src/lib/PresentationController.ts` e o controle em `src/components/PresentationControl.tsx`.
- **Seções:** componentes em `src/components/`; composição da página em `src/App.tsx`.
- **Título, descrição e compartilhamento:** `index.html`. URL canônica, `og:url` e imagens de compartilhamento usam o endereço final `https://gustavotc-web.github.io/`. A imagem social atual é a foto pessoal; se trocar o domínio ou a foto, atualize também os metadados.

### Substituir a foto

A foto atual está em `public/gustavo.png`, com o texto alternativo “Gustavo Tecedora”. Para trocar, substitua esse arquivo ou configure outro caminho em `hero.photo`:

```ts
photo: {
  src: '/gustavo.png',
  alt: 'Gustavo Tecedora',
},
```

Prefira WebP/AVIF, enquadramento vertical com o rosto centralizado e cerca de 720 px de largura. A área já reserva espaço para evitar mudanças de layout. Ajuste `object-position` em `.portrait-art > img` se necessário. Sem imagem, as iniciais permanecem visíveis.

### Substituir as ilustrações dos projetos

Os quatro visuais atuais são **ilustrações conceituais, não capturas reais**, identificadas na página e feitas com CSS/SVG. Coloque capturas autorizadas em `public/images/` e acrescente `image` ao projeto correspondente:

```ts
image: {
  src: '/images/tecesupport.webp',
  alt: 'Tela de acompanhamento de chamados do Tecesupport',
},
```

Prefira imagens com aproximadamente 1000 px de largura. O enquadramento usa `object-fit: cover` e proporção reservada. Use somente material autorizado no PGR Agora; não inclua dados ou telas privadas do cliente. As imagens fora da abertura usam carregamento sob demanda.

## Informações a preencher

- Capturas autorizadas dos projetos.
- `links.linkedin`: URL completa do LinkedIn.
- `links.email`: endereço de e-mail, sem o prefixo `mailto:`.
- `links.resume`: caminho de um PDF em `public/` ou URL real do currículo.
- `repository` e/ou `demo` de PGR Agora e Tecesupport, apenas se disponíveis e autorizados.

Campos opcionais vazios permanecem ocultos. O GitHub e os dois repositórios fornecidos já estão configurados.

## Acessibilidade e revisão

O menu móvel expande no fluxo da página, informa seu estado e fecha com Escape. Há link para pular a navegação, foco visível, HTML semântico, descrições de imagens e respeito a `prefers-reduced-motion`. Os detalhes dos projetos complementares funcionam por teclado com `<details>` nativo. As animações são breves, sem ocultar conteúdo permanentemente.

Ao editar, revise pelo menos 360 px, 768 px e 1440 px, o menu por teclado, os detalhes dos projetos e os destinos dos links. O comando `check` valida tipos; o build também executa essa verificação.

## Modo apresentação

Em desktop com mouse, no topo e sem fragmento na URL, a rolagem começa após 4 segundos a 20 px/s. O botão fixo fica disponível desde a abertura. O movimento usa `requestAnimationFrame`, tempo decorrido e posição fracionária acumulada, sem herdar a animação suave das âncoras.

Roda, toque no conteúdo, clique fora do controle, teclas de navegação, entrada de foco, rolagem externa (incluindo a barra), troca de seção, redimensionamento e aba oculta cancelam a espera ou pausam o movimento. Após qualquer interrupção, somente o botão pode retomar. O fim da página encerra a apresentação sem retornar ao topo.

Em telas menores, dispositivos com toque, links diretos a seções e `prefers-reduced-motion`, o início é manual. A opção de movimento reduzido continua permitindo início explícito pelo controle, conforme solicitado. A apresentação não intercepta a rolagem manual nem usa `preventDefault` nos eventos de navegação.

## Testes de navegador

```bash
npm run test:e2e
```

O Playwright usa uma instância isolada e sem janela do Microsoft Edge instalado no Windows. O servidor local é iniciado automaticamente se necessário. Os testes verificam espera, velocidade, interrupções, retomada explícita, controle por teclado/toque, fim da página, âncoras, menu móvel, detalhes e transbordamento em 320, 360, 390, 768, 1366 e 1440 px. Há uma verificação de rolagem com relógio real; os demais testes de tempo usam relógio controlado para serem reproduzíveis.

Os sinais de aba oculta e rolagem pela barra são simulados nos testes; roda, clique, teclado e toque no controle usam as entradas do navegador. A revisão visual foi feita com capturas de desktop, tablet e celular emulado, não em um aparelho físico. Os quadros extraídos do vídeo foram usados somente na comparação visual local e não fazem parte do site.

## Publicação no GitHub Pages

Repositório: https://github.com/GustavoTc-Web/gustavotc-web.github.io

O workflow `.github/workflows/deploy-pages.yml` roda a cada push em `main` e também pode ser iniciado manualmente em **Actions → Publicar portfólio no GitHub Pages → Run workflow**. Ele usa as actions oficiais, fixadas pelos commits das releases, instala com `npm ci`, verifica TypeScript, gera o build e publica exclusivamente `dist/` pelo ambiente `github-pages`.

Em **Settings → Pages → Build and deployment → Source**, selecione **GitHub Actions**. Essa opção já estava selecionada na configuração consultada durante a preparação. Não é necessário criar branch `gh-pages`, enviar `dist/` ao Git ou configurar token pessoal no workflow.

O Vite usa `base: '/'`, pois este é o site principal da conta. Foto (`/gustavo.png`), favicon (`/favicon.svg`), fontes e arquivos de build são resolvidos a partir da raiz. Dependências, caches, arquivos `.env` e artefatos de revisão ficam fora do Git; `package-lock.json`, fontes da aplicação, workflow e arquivos públicos são preservados.

Para atualizar:

```bash
npm run check
npm run build
git add <arquivos-alterados>
git commit -m "Atualiza o portfólio"
git push origin main
```

Confira o resultado em **Actions** e aguarde o job de publicação concluir. O build local aprovado não comprova que o site está publicado. O status de cada execução fica em https://github.com/GustavoTc-Web/gustavotc-web.github.io/actions.
