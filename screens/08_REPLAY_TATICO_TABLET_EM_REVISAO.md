# Tela 08 — Replay Tático (Tablet)

**Status:** Em revisão. Conceito baseado na visão atual do jogo em tablet.

## Objetivo

Permitir assistir, navegar e compreender uma batalha já encerrada sem alterar a proporção, a área física ou a leitura do tabuleiro original.

## Decisão estrutural

- A proporção atual do tabuleiro no tablet está preservada.
- O campo continua central e amplo, com a moldura física totalmente visível.
- A interface de replay organiza informações ao redor do campo, nunca dentro dele.

## Barra de comando do replay

Os controles deixam de depender de nomes extensos e passam a usar ícones reconhecíveis, agrupados e separados por divisórias finas.

| Grupo | Ícones | Comportamento |
|---|---|---|
| Navegação | voltar evento, pausar/reproduzir, avançar evento, reiniciar | move a reprodução no tempo |
| Reprodução | velocímetro com velocidade atual | abre opções de velocidade |
| Visualização | olho, tela cheia, ajustes | mostra camadas, amplia campo e abre preferências |

Regras:

- Cada botão deve ter alvo mínimo de 44 px no tablet.
- Ícones recebem rótulo curto somente em dica flutuante ao passar o ponteiro ou manter toque.
- Grupos têm espaço entre si e divisórias verticais discretas.
- O botão de pausar/reproduzir é o centro visual da régua; os demais não competem com ele.

## Ficha flutuante do monstro

Ao passar o ponteiro sobre um marcador de monstro, aparece uma ficha flutuante ancorada ao marcador, sem abrir por padrão e sem cobrir a rota de replay.

A ficha contém:

- retrato, nome e ícone de função;
- vida e energia;
- duas habilidades por ícone, com descrição curta em dica;
- efeitos ativos positivos e negativos;
- estado atual na linha do tempo.

No toque, a ficha abre por toque simples e fecha tocando fora. Ela deve se reposicionar automaticamente para nunca sair da área visível.

## Painel de eventos

A barra lateral deixa de exibir colunas técnicas e passa a ser `Eventos da Batalha`:

- mostra somente os três eventos mais recentes;
- cada linha traz horário, ícone do tipo e frase curta;
- o evento atual recebe destaque ciano;
- clique em um evento move o replay para aquele instante;
- uma barra de rolagem estreita acompanha a posição da reprodução na lista completa de eventos.

Exemplos: `12:14 Névoa empurrou Prisma`, `12:12 Impacto contra a borda`, `12:09 Escudo do Capitão ativado`.

## Linha do tempo

A linha do tempo fica abaixo do painel de eventos, com:

- tempo atual e duração total;
- cursor arrastável;
- marcas coloridas para eventos;
- sincronização bidirecional com a lista: mover a linha rola a lista, clicar na lista move a linha.

## Informações de topo

Somente: `Replay da batalha`, turno/parte ativa, energia e tempo atual/duração.

## Fora de escopo

Sem alteração de física, câmera, proporção do tabuleiro, posições das unidades, resultado da partida ou recompensas.
