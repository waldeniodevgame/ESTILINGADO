# Tela 08 — Replay Tático (Tablet)

**Status:** Conceito de ícones e painel lateral aprovado em 26/10/2026.

## Escopo aprovado

Estão aprovados a linguagem de ícones da régua de comando e o painel lateral de `Eventos da Batalha`. A ficha flutuante dos monstros e a implementação da sincronização real continuam como detalhamento técnico posterior.

## Régua de comando aprovada

A régua inferior organiza controles em grupos separados por divisórias sutis, com alvos de toque de pelo menos 44 × 44 px e ícones lineares de traço consistente.

| Grupo | Controles |
|---|---|
| Navegação | evento anterior, reproduzir/pausar, próximo evento, reiniciar replay |
| Reprodução | velocidade com selo `1×`, repetir |
| Visualização | camadas, guias de trajetória, tela cheia |
| Utilidade | ajustes, eventos |

### Estados

- Selecionado: preenchimento ciano em círculo ou pílula.
- Hover: brilho ciano suave e elevação discreta.
- Desativado: 35% de opacidade.
- Reiniciar replay: contorno violeta discreto, sem alerta vermelho.
- Rótulos aparecem apenas em dica flutuante ao passar o ponteiro ou manter o toque.

## Painel lateral aprovado — Eventos da Batalha

A lateral substitui definitivamente as colunas técnicas e o resumo estático por um histórico de eventos ligado à reprodução.

- Exibe uma caixa com apenas os **três eventos mais recentes**.
- Cada linha contém horário, ícone do tipo de evento e frase curta.
- O evento ativo recebe destaque ciano.
- Clicar ou tocar em um evento leva a reprodução ao instante correspondente.
- A lista completa possui barra de rolagem estreita; seu indicador acompanha automaticamente o avanço do replay.
- A linha do tempo possui cursor arrastável, tempo atual/duração e marcas de evento.
- Sincronização é bidirecional: mover a timeline atualiza a lista; selecionar evento move o cursor da timeline.

Exemplos de texto: `12:14 Névoa empurrou Prisma`, `12:12 Impacto contra a borda`, `12:09 Escudo do Capitão ativado`.

## Regras de interação

- Em mouse, dicas dos ícones aparecem no hover.
- Em tablet por toque, dicas são acessíveis por manter o toque.
- A régua não invade a área física do tabuleiro.
- O painel lateral mantém a proporção aprovada do tabuleiro e não invade suas bordas.

## Pendente técnico

A ficha flutuante do monstro será detalhada depois: abre no hover ou toque, exibe retrato, função, vida, energia, habilidades e efeitos ativos, e se reposiciona para permanecer visível.
