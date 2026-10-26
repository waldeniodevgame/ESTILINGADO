# Registro Gordon — Workspace multiambiente
- Adicionado `README_GORDON.md` com regras de trabalho e ciclo de validação.
- Adicionado `docs/ARQUIVOS_IMPORTANTES.md` com o inventário operacional.
- Adicionado `configs/environments.json` para separar local, QA, preview e produção.
- Adicionado `configs/models.json` para registrar modelos e regras de seleção.
- Mantida a lógica dos protótipos existentes sem alterações.
# Changelog

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

