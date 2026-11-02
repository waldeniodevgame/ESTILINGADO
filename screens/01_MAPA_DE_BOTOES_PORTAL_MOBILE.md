# ESTILINGADO — Mapa do portal mobile (02/11/2026)

A entrada do portal é `/index.html`; CSS isolado em `/assets/css/portal.css`.

| Botão | Destino | Estado |
|---|---|---|
| Escolha como jogar | `telas/jogar/index.html` | Abre build existente (seleção de modo dentro do jogo) |
| Arena de Treino | `telas/treino/index.html` | Abre build existente (seleção de modo dentro do jogo) |
| Jogo Livre | `telas/livre/index.html` | Abre build existente (seleção de modo dentro do jogo) |
| Campanha | `telas/campanha/index.html` | Página de planejamento, sem backend |
| Loja | `telas/loja/index.html` | Página de planejamento, sem backend |
| Passe Mensal | `telas/passe/index.html` | Página de planejamento, sem backend |
| Clã | `telas/cla/index.html` | Página de planejamento, sem backend |
| Ranking de Pontos | `telas/ranking/index.html` | Página de planejamento, sem backend |
| Eventos | `telas/eventos/index.html` | Página de planejamento, sem backend |
| Perfil | `telas/perfil/index.html` | Página de planejamento, sem backend |

**Proteção:** `TESTgordon/TESTE26gordon.html` e `TESTgordon/BATALHA_CENTRALIZADA.html` não foram modificados. Não foi implantado checkout, compra real, ranking ou clã online.

**Teste manual:** abrir `index.html`; conferir navegação e botão Voltar; abrir Treino e Livre e escolher o modo dentro da build original. Conferir também no celular. Nenhum teste real de browser foi confirmado nesta entrega.

**Pendência de integração:** permitir seleção direta do modo via parâmetro/estado controlado no jogo, somente após validar entradas existentes.