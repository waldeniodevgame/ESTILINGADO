# ScreenMenu — Guia de Telas

Esta pasta reúne protótipos navegáveis e referências visuais dos menus de **Legiões das Armadilhas**.

## Convenção

`NN_NOME_DA_TELA.html`

- `NN` define a ordem da jornada do jogador.
- Cada tela funciona isoladamente como protótipo HTML responsivo.
- A implementação na build-base só começa depois da aprovação visual.

## Jornada inicial

| Ordem | Arquivo | Tela | Objetivo |
|---|---|---|---|
| 01 | `01_PORTAL_DA_ARENA.html` | Portal da Arena | Home: jogar, treinar ou entrar em jogo livre. |
| 02 | `02_ESCOLHA_DE_MODO.html` | Escolha de Modo | Definir o formato da partida. |
| 03 | `03_MONTAGEM_DE_EQUIPE.html` | Montagem de Equipe | Escolher Capitão e criaturas. |
| 04 | `04_ARENA.html` | Arena | Tela de combate. |
| 05 | `05_RESULTADO_DA_PARTIDA.html` | Resultado | Vitória, recompensa e próximo passo. |

## Regras visuais

- Fundo azul-noite com acentos violeta, ciano e dourado.
- Um único CTA principal por tela.
- Áreas de toque de no mínimo 48 px.
- Alto contraste e texto curto.
- Não alterar câmera, física ou controles nos menus.

## Status

- **Tela 01:** proposta navegável pronta para revisão.
- As próximas telas só entram após aprovação da anterior.
