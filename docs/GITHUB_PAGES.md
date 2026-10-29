# Jogar pelo GitHub Pages

O workflow `.github/workflows/pages.yml` publica a build `TESTgordon/BATALHA_CENTRALIZADA.html` como página inicial. A build Gordon original permanece preservada.

## Ativação no GitHub

1. Envie estas alterações para `main` do repositório `waldeniodevgame/ESTILINGADO`.
2. Em **Settings → Pages → Build and deployment → Source**, selecione **GitHub Actions**.
3. Em **Actions → Publicar jogo no GitHub Pages**, acompanhe a execução. Se o primeiro envio ocorreu antes da ativação, use **Run workflow** em `main`.
4. Use a URL mostrada no deployment. Sem domínio personalizado, a URL esperada é `https://waldeniodevgame.github.io/ESTILINGADO/`. Essa URL só estará disponível após uma publicação bem-sucedida.

Os próximos pushes para `main` publicam automaticamente a build. Não são necessários tokens pessoais ou dependências npm. Em repositório privado, a disponibilidade de Pages depende do plano e das políticas da conta.

## Verificar localmente

Execute `npm run build:pages`, depois `python3 -m http.server 4180 --directory _site`. A pasta `_site` é gerada e ignorada pelo Git. O artefato contém somente `index.html` e `.nojekyll`; fontes e documentos não são publicados.

O jogo usa progresso local do navegador; Firebase permanece desativado. Progresso de localhost não migra automaticamente para a origem do GitHub Pages.
