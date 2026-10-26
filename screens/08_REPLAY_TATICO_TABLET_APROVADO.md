# Tela 08 — Replay Tático (Tablet)

**Status:** Conceito de ícones aprovado em 26/10/2026.

## Escopo da aprovação

A aprovação cobre exclusivamente a linguagem e a organização dos ícones da régua de comando do replay. O tabuleiro e a lateral de eventos continuam em revisão independente.

## Padrão aprovado

A régua inferior organiza os controles em grupos separados por divisórias sutis, com alvos de toque de pelo menos 44 × 44 px e ícones lineares de traço consistente.

| Grupo | Controles |
|---|---|
| Navegação | evento anterior, reproduzir/pausar, próximo evento, reiniciar replay |
| Reprodução | velocidade com selo `1×`, repetir |
| Visualização | camadas, guias de trajetória, tela cheia |
| Utilidade | ajustes, eventos |

## Estados aprovados

- Selecionado: preenchimento ciano em círculo ou pílula.
- Hover: brilho ciano suave e elevação discreta.
- Desativado: 35% de opacidade.
- Reiniciar replay: contorno violeta discreto, sem alerta vermelho.
- Rótulos aparecem apenas em dica flutuante ao passar o ponteiro ou manter o toque.

## Regras de interação

- Em mouse, a dica flutuante aparece no hover.
- Em tablet por toque, a dica é acessível por manter o toque, sem depender de hover.
- Os grupos, e não cada botão, recebem separação visual.
- A régua não invade a área física do tabuleiro.

## Próximo escopo

Validar o painel de `Eventos da Batalha` e sua sincronização bidirecional com a timeline do replay.
