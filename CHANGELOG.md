# Registro Gordon — Workspace multiambiente
- Adicionado `README_GORDON.md` com regras de trabalho e ciclo de validação.
- Adicionado `docs/ARQUIVOS_IMPORTANTES.md` com o inventário operacional.
- Adicionado `configs/environments.json` para separar local, QA, preview e produção.
- Adicionado `configs/models.json` para registrar modelos e regras de seleção.
- Mantida a lógica dos protótipos existentes sem alterações.
# Changelog

## 2026-10-28 — Identidade ESTILINGADO
- Corrigidos nomes e links em 17 arquivos HTML e documentos; caminhos, identificadores e scripts preservados.
- Validação e divergência local/remota registradas em `docs/VALIDACAO_IDENTIDADE_2026-10-28.md`.

## V0.5 — Colisões
- Mantida a mecânica de lançamento aprovada na V0.4.1.
- Colisão aliada sem dano e com transferência de impulso.
- Colisão entre times opostos com dano por impacto.
- Bloqueio de dano repetido durante o mesmo contato.
- Nova colisão após separação pode causar novo dano.
- Diagnóstico visual de impacto.
- HP por unidade e eliminação em 0 HP.

## V0.4.1 — Hotfix do estilingue
- Corrigido bug em que soltar o mouse/toque não lançava a unidade.
- Removida dependência de confirmação separada.
- P1 e P2 mantêm referências independentes.
- Unidade do disparo é capturada no início do arrasto.
- Pointer capture revisado.
- Arrasto curto cancela o lançamento.

## V0.4 — Física, dano e cenário
- Separação entre unidade selecionada e unidade em movimento.
- Dano por impacto.
- Bloqueio de dano duplicado.
- Início da evolução visual do terreno.
- Grid reduzido gradualmente.

## V0.3 — Movimento + dano
- HP individual.
- Dano proporcional à força do impacto.
- Eliminação em 0 HP.

## V0.2 — Movimento
- Seleção de unidade.
- Slingshot.
- Força proporcional ao arrasto.
- Previsão de trajetória.
- Ricochete.
- Atrito.
- Alternância de turnos.

## V0.1 — Protótipo inicial
- Arena básica.
- Lançamento.
- IA simples.
- Dano e turnos iniciais.


## 2026-10-26 — Organização da base e correção do Ímã
- Adicionada a build-base `TESTE LULA 26 - ARRASTO CORRIGIDO`.
- Adicionada a build `TESTE LULA 26 - IMÃ DANO ALIADO CORRIGIDO`.
- Corrigido o dano de parede/bumpeamento aplicado a unidades da equipe do lançador durante o próprio lançamento.
- Versionada a biblioteca modular com tabelas JSON, CSS, JavaScript, assets, compilador e documentação.
- Adicionados índice, checklist e registro de progresso para guiar as próximas rodadas.

## CAM-01 — Cópia de captura de câmera
- Criada cópia isolada da base TESTgordon/TESTE26gordon.html em uilds/camera-captura-2026-10-26_16-01-58/.
- Registrado ambiente PC inicial em environment-pc.json.
- Nenhuma mecânica ou configuração da base foi alterada.



## 2026-10-29 — Comandos de batalha centralizados
- Nova cópia de interface em `TESTgordon/BATALHA_CENTRALIZADA.html`; base `TESTE26gordon.html` preservada.
- Habilidades reunidas abaixo do campo, especial central em destaque e pausa/som agrupados acima da arena.
- Botões de batalha com alvo mínimo de 44 px; no celular, habilidades distribuídas em duas colunas e página com rolagem para manter acesso aos painéis.
- `npm run serve:gordon` abre a nova cópia; a base segue disponível pelo nome original.
- Chromium/Playwright: 1440×900, 768×1024, 390×844 e 360×740 sem overflow horizontal ou erros JavaScript; pausa/retomada verificadas. Sobrecarga consumiu energia e foi desabilitada após uso. Arena de Teste mantém a barra oculta.
- Todos os scripts originais foram comparados e preservados; apenas um script de disposição foi acrescentado. Validação em aparelho Android físico permanece pendente.


## 2026-10-29 — Preparação do GitHub Pages
- Adicionados `npm run build:pages` e workflow de publicação em pushes para `main`.
- Artefato estático contém a build centralizada como `index.html` e `.nojekyll`, sem fontes ou documentação.
- Instruções de ativação e verificação em `docs/GITHUB_PAGES.md`.
