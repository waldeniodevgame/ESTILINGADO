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
## Revisão V2 — correção visual (02/11/2026)

- A nova `index.html` contém o CSS crítico embutido, além de `assets/css/portal.css`, para evitar a página branca desformatada ao carregar o HTML.
- Ilustrações independentes em `assets/img/portal/`: `arena.svg`, `loja.svg`, `passe.svg`, `cla.svg` e `ranking.svg`. São recursos SVG reais, não recortes de um screenshot que impediriam a responsividade.
- Todos os botões continuam sendo links HTML independentes e acessíveis.
- **Teste automatizado de caminhos:** `npm run test:portal`.
- **Abrir a home:** `npm run serve:portal` e navegar em `http://localhost:4176/`.
- `npm run serve:gordon` continua reservado à build de batalha original.
- Testar obrigatoriamente no PC e Android antes de marcar integração visual como concluída.
- Loja e Passe não realizam cobranças; Clã e Ranking são telas preparatórias, não serviços online.
- Treino e Livre continuam na build existente: a seleção definitiva de modo é realizada dentro do jogo, sem modificação no motor.
