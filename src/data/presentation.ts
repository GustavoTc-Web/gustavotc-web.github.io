/** Velocidade em pixels CSS por segundo; o movimento usa o tempo real entre quadros. */
export const presentationConfig = {
  speed: 20,
  delay: 4_000,
  desktopQuery: '(min-width: 1024px) and (hover: hover) and (pointer: fine)',
} as const

export const presentationLabels = {
  title: 'Modo apresentação',
  start: 'Iniciar apresentação',
  pause: 'Pausar apresentação',
  waiting: 'Começa em 4 s',
  playing: 'Rolagem suave',
  paused: 'No seu ritmo',
  finished: 'Apresentação concluída',
}
