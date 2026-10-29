# Cloud save V1 — protótipo v0.5

Escopo: `prototype/v0.5.html`. A biblioteca CMC, seus saves anteriores e as demais
builds continuam independentes; este serviço não migra registros dessas linhas.
Não altera física, dano, animação, QA ou regras do jogo.

## Executar sem Firebase

Node.js 20+; nenhuma instalação é necessária para jogar ou executar os testes unitários:

```sh
npm run serve
# http://localhost:4174/v0.5.html
npm test
npm run lint
```

Mantenha a pasta `prototype/cloud-save/` junto do HTML. Os scripts clássicos locais
não exigem bundler. Abrir o HTML diretamente também foi previsto, mas a disponibilidade
de localStorage em `file://` varia por navegador; prefira o servidor local.
O jogo já aberto continua funcionando sem internet. Não há service worker/cache
para reabrir uma página hospedada remotamente sem conexão.

A UI mostra visitante/conta, login, sair, sincronização e erros. Sem configuração,
o login fica desabilitado e nenhuma requisição ao Firebase/CDN acontece.
O protótipo atual é uma demonstração: só `stats.demoRuns` é atualizado ao clicar
em Testar impacto. Não inventamos fases, moedas ou recompensas. O modelo reserva
esses campos para integração futura, sem salvar posições/HP de uma partida.

## Firebase: configuração manual

1. Crie um projeto e um aplicativo **Web** no Firebase Console.
2. Em Authentication → Sign-in method, ative **Google** e escolha o e-mail de suporte.
   Não ative login anônimo para este fluxo. Em Authorized domains, inclua `localhost`
   e o domínio HTTPS que realmente hospedará o jogo.
3. Crie o Cloud Firestore. Publique `firebase/firestore.rules` na aba Rules.
   Alternativa, com Firebase CLI instalado e autenticado: `firebase deploy --only firestore:rules --project YOUR_PROJECT`.
   Essa publicação não foi executada por esta entrega.
4. Em `prototype/cloud-save/firebase-config.js`, substitua os placeholders pelos
   valores públicos do aplicativo Web e ajuste `enabled: true`.
   `apiKey` Web, `authDomain`, `projectId` e `appId` identificam o aplicativo; não
   são autorização de acesso. Restrinja a chave/domínios no console conforme o projeto.
5. Sirva por `http://localhost` em desenvolvimento ou HTTPS em produção. Login
   com popup exige clique do usuário e não deve ser testado por `file://`.
6. Faça login, clique em Testar impacto, sincronize e confira o documento
   `players/{uid}/save/main`. Em outro navegador/dispositivo, entre com a mesma conta.

Nunca use senha Gmail, chave de service account, OAuth client secret, token privado
ou arquivo de credenciais no frontend/Git. O SDK gerencia OAuth e a sessão local.
A configuração entregue contém apenas placeholders. Nenhum Firebase real é necessário
para continuar jogando como visitante.

## Modelo, API e migração

`schemaVersion: 1`; `updatedAt` é inteiro em **milissegundos Unix UTC**;
`buildVersion: "v0.5-cloud-save-v1"`. Campos: campaign, currency, collection,
settings e stats, com os padrões descritos em `schema.js`.

- `SaveService.loadLocal()` / `saveLocal(data)`: leitura/escrita validada síncrona.
- `getState()`: cópia; `update(partial)`: merge profundo (arrays substituem), timestamp
  monotônico, escrita local imediata e tentativa de sync. Preferir esta API no jogo.
- `loadCloud()`: leitura validada do servidor para o uid atual, sem substituir local.
- `saveCloud(data)`: persiste localmente e usa a mesma resolução transacional de `sync()`.
  APIs de baixo nível preservam o timestamp fornecido; mudanças de progresso devem usar `update`.
- `migrate(data)`: V0 (ausência de versão ou 0, mesmo modelo) recebe defaults e vira V1.
  V1 é validado; versões futuras, valores inválidos e payloads >200 mil caracteres são rejeitados.
- `AuthService`: `loginGoogle`, `logout`, `getState`, `subscribe`; visitante é `user:null`.
- Ponte pública do protótipo: `window.CapsuleProgress.getState()`, `.update(partial)`, `.sync()`.

Exemplo no console, para testar persistência, sem criar uma regra de recompensa:

```js
CapsuleProgress.update({ settings: { sound: false } });
CapsuleProgress.getState(); // permanece após refresh
```

`sound`/`music` são preferências persistidas; este demo não possui subsistema de áudio.

## Contas, conflitos e recuperação

Chaves: `capsulemon:save:v1:guest` e `capsulemon:save:v1:{uid}`. Primeiro login em um
uid ainda sem save local importa uma cópia do visitante. Sair retorna ao visitante.
Trocar A por B nunca copia A para B. A sessão OAuth é restaurada pelo SDK quando configurado. Um indicador local
`capsulemon:last-local-profile:v1` permite reabrir o último perfil no refresh offline;
esse indicador não autentica ninguém e nunca autoriza sincronização. O adaptador
cloud só é associado depois de o observador Firebase confirmar o usuário.
Eventos `storage` recarregam alterações de outras abas. Não há merge de moedas/coleções
entre versões de save: **o documento inteiro com maior updatedAt vence**.
Empate favorece a nuvem, inclusive para a primeira associação. O save vazio nasce com
updatedAt 0 e não ganha prioridade só por abrir o jogo.

A decisão roda dentro de transação Firestore, com releitura em concorrência. Não há
fila de escrita offline do Firestore que possa enviar um documento antigo antes da comparação.
Se houver edição local enquanto a transação aguarda, outra rodada envia a versão mais nova.
Resultados de uma sincronização antiga não hidratam uma nova conta após logout/troca.
A nuvem é tentada após update, login, reconexão e botão manual; erros transitórios
são retentados a cada 30 s enquanto autenticado e online.

Antes de substituir local por nuvem, o registro anterior é escrito em
`{chave}:backup` com motivo/data. É um backup rotativo único por perfil: substituições
seguintes o renovam. Se o backup falhar por quota, a substituição é abortada.
JSON corrompido/versão futura permanece **intacto na chave original**, sem ser
substituído por defaults ou enviado. A UI mostra erro e o jogo continua. Para recuperar:
exporte a chave original e o backup pelas ferramentas do navegador; após examinar,
restaure um JSON V1 válido e recarregue. Não há botão de apagar automaticamente saves.
Erros de localStorage são visíveis, e um save não persistido não é enviado.

Limites: depende do relógio do dispositivo (um relógio adiantado pode vencer conflitos);
localStorage não é uma base transacional entre abas. Atualizações simultâneas entre
abas podem perder incrementos. LWW pode descartar progresso divergente de outro dispositivo.
Os dados do próprio jogador são editáveis pelo cliente: estas regras isolam contas,
mas **não são um sistema antitrapaça**. Não aplicar esse modelo a compras/ranking autoritativos.
A exclusão de dados do navegador remove saves/backups locais; nuvem requer login/configuração.

## Verificação

`npm test`: serialização, migração, offline, conflitos/empate, corrupção, quota,
concorrência, troca de conta, AuthService e retentativa com adaptadores em memória.
`npm run lint`: checagem de sintaxe Node, scripts inline, links e higiene das fontes
sem dependências (não é ESLint). Comparação adicional do script original é registrada
em `docs/CLOUD_SAVE_VALIDATION.md`.

Smoke de navegador (Playwright opcional, não usado pelo jogo):

```sh
npm install --no-save --package-lock=false playwright
npx playwright install chromium
npm run test:browser
# Se Chromium já estiver instalado: CHROMIUM_PATH=/usr/bin/chromium npm run test:browser
```

Em ambiente gerenciado que proíbe file://: `SKIP_FILE_TEST=1` omite só esse caso e
registra o skip. O teste HTTP verifica visitante, refresh, offline, corrupção,
zero chamadas externas sem configuração e UI autenticada com adaptador falso.
Isso não comprova OAuth real nem regras Firestore.

Integração das regras, em ambiente com Java/Firebase CLI e rede:

```sh
npm install --no-save --package-lock=false firebase@10.14.1 @firebase/rules-unit-testing@3.0.3 firebase-tools@14.22.0
npx firebase emulators:exec --only firestore --project demo-capsulemon "npm run test:rules"
```

O teste verifica dono autorizado, outro uid/visitante negados, schema e timestamp.
Antes de habilitar produção, execute esse teste e o fluxo Google real (incluindo
popup cancelado, refresh autenticado, duas contas, dois dispositivos e reconexão).
Não use credenciais reais nos testes automatizados.

Rollback: reverta os commits desta branch; os registros localStorage e Firestore
continuam preservados. A branch não publica o site nem configura serviços externos.
