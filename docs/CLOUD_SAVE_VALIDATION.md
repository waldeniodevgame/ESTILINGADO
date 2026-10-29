# Validação — Cloud save V1

Data: 2026-10-29. Branch: `feat/cloud-save-v1`.
Repositório identificado pelo ID 1402434733: renomeado para `waldeniodevgame/ESTILINGADO`.
Base upstream: `4dffeb5872106b63c3bb46e3d0531383d394e94e`.
Escopo preservado: somente integração em `prototype/v0.5.html`; CMC e outras builds intactas.

## Resultados executados

- `npm test`: **17/17 testes passaram**. Inclui serialização/refresh, migração V0,
  versões futuras, corrupção, quota, offline, conflito/empate, backup, atualização
  durante transação, retentativa, login/logout e troca de uid com falha de storage.
- `CAPSULEMON_BASE_HTML=/tmp/capsulemon-base-v05.html npm run lint`: passou.
  Sintaxe dos novos JS/testes/scripts, script inline, links e higiene de fontes.
- `git diff --check`: passou.
- Comparação do script inline com o original da base: **idêntico byte a byte**.
  SHA-256: `9504c7e2815dc962b7daf6d1eb328b9e1d4d8e0fb1403eb57125428ba07f289a`.
  Não foram alterados os testes de QA de física existentes.
- `SKIP_FILE_TEST=1 CHROMIUM_PATH=/usr/bin/chromium npm run test:browser`: passou.
  Chromium/Playwright com servidor local: visitante, refresh, offline, save corrompido,
  jogo utilizável após erro, zero requisições externas sem Firebase, interface Google
  com adaptador simulado, associação uid, sync, logout e refresh offline no último perfil.
- Emulador Firestore 1.19.8, SDK 10.14.1, rules-unit-testing 3.0.3, Firebase CLI 14.22.0:
  `firebase emulators:exec --only firestore --project demo-capsulemon "npm run test:rules"`:
  **2/2 testes passaram**. Leitura/gravação pelo dono; negativa para outro uid e
  visitante; negativa para schema inválido e timestamp anterior. Logs PERMISSION_DENIED
  são esperados nesses testes de rejeição. Não houve acesso a projeto Firebase real.
- Revisão independente do isolamento de contas e conflitos concluída. Corrigido o
  caso de erro em getItem durante troca de uid; regressão coberta nos 17 testes.
- Varredura dos arquivos novos por padrões de chave privada/token/segredo: nenhuma
  credencial encontrada. Configuração Firebase entregue desabilitada, com placeholders.

## Limites e pendências

- O navegador gerenciado bloqueia `file://` (ERR_BLOCKED_BY_ADMINISTRATOR); esse caso
  foi tentado, depois explicitamente omitido na rodada HTTP. Verificar em navegador pessoal.
- OAuth Google real, persistência de sessão real em refresh e sincronização entre
  dispositivos dependem do projeto Firebase configurado. UI e AuthService foram
  exercitados com adaptador simulado; regras foram exercitadas no emulador real.
- Nenhuma regra, site ou configuração foi publicada em produção.
- `updatedAt` usa relógio do cliente e LWW substitui o documento inteiro; relógios
  incorretos e edições simultâneas entre abas continuam limitações documentadas.
- O demo ainda não possui campanha/economia: integração atual mede `stats.demoRuns`
  e expõe a API de progresso. Configurações de áudio são somente preferências salvas.

## Manifesto de alteração

- Serviços: `prototype/cloud-save/schema.js`, `save-service.js`, `auth-service.js`,
  `firebase-adapter.js`, `firebase-config.js`.
- Interface: `prototype/cloud-save/bootstrap.js`, `cloud-save.css`, inclusão de
  referências externas em `prototype/v0.5.html`.
- Segurança/configuração: `firebase/firestore.rules`, `firebase.json`.
- Verificação: `tests/cloud-save.test.cjs`, `tests/browser-smoke.cjs`,
  `tests/firestore-rules.test.mjs`, `tools/check-cloud-save.cjs`.
- Documentação/comandos: `docs/CLOUD_SAVE.md`, este relatório, README, package.json e .gitignore.
