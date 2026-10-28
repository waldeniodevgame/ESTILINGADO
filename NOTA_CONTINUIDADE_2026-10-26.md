# Nota de continuidade — Gordon / ESTILINGADO

Data: 26/10/2026

## Objetivo do projeto

O repositório principal de trabalho é o ESTILINGADO, mantido em uma pasta separada chamada `GORDON`.

Repositório remoto:

```text
https://github.com/waldeniodevgame/ESTILINGADO
```

O projeto é uma reimplementação clean-room de um jogo de combate por turnos com movimentação por estilingue, colisões, dano e IA. Não reutilizar código, sprites, áudio ou outros assets proprietários do jogo de referência.

## O que foi feito hoje

### Projeto anterior fora do GORDON

Foi analisado o arquivo:

```text
TESTE LULA REATOR BOMBA REGRESSAO.html
```

Foram validados:

- Motor de física e colisões.
- Arrastar e soltar por mouse e toque.
- Ricochetes e limites da arena.
- Combos.
- Dano, cura, escudos e efeitos.
- Os 16 monstros.
- 1.200 trajetórias determinísticas.
- Testes Playwright desktop e touch.

Foi corrigido um erro de sintaxe causado por uma vírgula duplicada na tabela de combos.

Também foram criados nesse projeto antigo:

- `build.ps1`
- `serve.ps1`
- `publish.ps1`
- `verify-project.ps1`
- `iniciar-jogo.bat`
- `verificar-projeto.bat`
- `package.json`
- `playwright.config.mjs`
- `test-server.mjs`
- `tests/pointer-drag.spec.mjs`
- `tests/monster-regression.spec.mjs`
- `mechanics-baseline.json`
- Builds versionadas em `builds/`

O projeto antigo usa a porta `4173`.

### Repositório GORDON

O repositório foi clonado em:

```text
C:\Users\Suporte\Desktop\GIT\GORDON
```

Estado original encontrado:

- V0.4.1 de movimento aprovada.
- V0.5 de colisões em validação.
- V0.6 cinematográfica disponível como protótipo de referência.
- Documentação existente sobre mecânicas, testes e roadmap.

Arquivos importantes existentes:

```text
GORDON/README.md
GORDON/CHANGELOG.md
GORDON/docs/MECANICAS_APROVADAS.md
GORDON/docs/ROADMAP.md
GORDON/docs/TESTES_V0.5.md
GORDON/docs/TESTE_LULA_26.md
GORDON/prototype/v0.5.html
GORDON/prototype/v0.6-cinematic.html
GORDON/prototype/TESTE LULA 26.html
```

Arquivos adicionados hoje ao GORDON:

```text
GORDON/README_GORDON.md
GORDON/docs/ARQUIVOS_IMPORTANTES.md
GORDON/configs/environments.json
GORDON/configs/models.json
GORDON/tools/prototype-server.mjs
GORDON/iniciar-prototipo.bat
GORDON/package.json
```

A lógica dos protótipos do GORDON não foi alterada.

## Servidor local do GORDON

O servidor dedicado serve somente `GORDON/prototype` na porta `4174`.

Para iniciar com duplo clique:

```text
GORDON/iniciar-prototipo.bat
```

Endereços:

```text
http://localhost:4174/
http://localhost:4174/v0.5.html
http://localhost:4174/v0.6-cinematic.html
```

Também é possível iniciar pelo terminal dentro de `GORDON`:

```powershell
node tools/prototype-server.mjs
```

Ou:

```powershell
npm run serve
```

A validação de hoje confirmou HTTP 200 para o catálogo, V0.5 e V0.6.

## Como continuar em outro computador

### Opção A — usando Git

Instale Git e Node.js. Depois execute:

```powershell
git clone https://github.com/waldeniodevgame/ESTILINGADO GORDON
cd GORDON
node tools/prototype-server.mjs
```

Abra:

```text
http://localhost:4174/v0.5.html
```

### Opção B — usando uma cópia da pasta

Copie a pasta inteira `GORDON` para o outro computador. Não copie apenas um protótipo isolado, pois os documentos, configurações e servidor também fazem parte do fluxo.

Depois, dentro da pasta `GORDON`, execute:

```powershell
node tools/prototype-server.mjs
```

Ou dê duplo clique em:

```text
iniciar-prototipo.bat
```

## Antes de alterar mecânicas

Leia nesta ordem:

1. `README_GORDON.md`
2. `docs/MECANICAS_APROVADAS.md`
3. `docs/TESTES_V0.5.md`
4. `docs/ROADMAP.md`
5. `docs/ARQUIVOS_IMPORTANTES.md`

A prioridade atual é concluir a validação V0.5 antes de desenvolver combos, habilidades ou IA avançada.

## Próximos passos recomendados

1. Criar testes automatizados para os casos C01–C14 de `docs/TESTES_V0.5.md`.
2. Criar cópia versionada do protótipo antes de cada alteração.
3. Validar colisões aliadas e inimigas.
4. Medir transferência de impulso e dano frontal/lateral.
5. Confirmar que o turno só termina quando todos os objetos param.
6. Só depois iniciar a V0.6 de combos.

## Observação sobre Cloudflare

No projeto anterior, foi preparado `publish.ps1` para Cloudflare Pages, mas o Wrangler ainda precisava de login:

```powershell
npx wrangler login
```

A hospedagem do GORDON ainda não foi configurada. Não publicar a V0.5 como versão final antes de validar os casos C01–C14.

## Estado de segurança do trabalho

- Os protótipos do GORDON continuam sem alterações de mecânica.
- O servidor local dedicado está funcionando.
- Os arquivos JSON de configuração foram validados.
- A documentação de continuidade foi criada para retomar o trabalho em outra estação.
- Ao continuar, verificar `git status` antes de editar qualquer arquivo.
