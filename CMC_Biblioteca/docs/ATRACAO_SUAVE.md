# Revisão 3 — atração suave

Única fonte de execução alterada desde a revisão 2: `src/engine/ancora_vortex.js`, função `stepWorld()`.
`castAnchorVortex()`, mira, desenho do núcleo, CSS e todas as tabelas JSON permaneceram iguais.

## Movimento

Durante os 3 segundos de simulação ativa, a velocidade cresce e depois decresce suavemente. Usa a curva `sin²(π × tempo / duração)`, multiplicada pela velocidade proporcional à distância restante. O teto continua sendo `pullSpeed = 60`. A integral da curva evita dependência da taxa de quadros. Não altera o estado de lançamento nem aplica impulso, colisões, combos ou ataques. Âncora e capitães permanecem imóveis.

Exemplo medido: começando a 80 unidades do centro, o monstro percorre cerca de 30,69 unidades e termina a 49,31 unidades, após 3 s. O movimento começa e termina com velocidade zero. Não foi implementada separação de corpos, conforme o pedido de não disparar colisões.

## Dano

Nos instantes 0,5; 1; 1,5; 2; 2,5 e 3 s, cada monstro inimigo vivo dentro do círculo recebe uma aplicação de 7 de dano pela rotina existente (escudos e mortes mantêm as regras atuais). Estar parado junto ao núcleo não evita o dano. Aliados nunca são alvos desses pulsos. A rotina de turno continua aguardando a expiração; vitória/derrota encerra o efeito como já acontecia. Pausar ou ocultar a página congela o tempo de jogo, como antes.

## Configurações preservadas

`dados/ancora_vortex.json`: raio 6 × raio de criatura (114 unidades), duração 3 s, dano 7, intervalo 0,5 s, velocidade limite 60, distância mínima ao núcleo 2, recarga 1.

## Verificação

- `QA_ATRACAO_SUAVE.json`: integração comparada em 30/60/144 FPS; seis pulsos; aliado sem dano; inimigo imóvel no núcleo recebe dano; sem eventos extras de ataque/colisão/combo.
- `QA_SUAVE_BROWSER.json`: criação, cancelamento, pausa, término e conclusão do tutorial em largura 1366 e 390.
- `node verificar.cjs`: regressão de 30 lançamentos dos demais monstros.

O sentimento de suavidade precisa da sua avaliação no jogo; os testes verificam limites, continuidade e comportamento, não substituem essa avaliação.
