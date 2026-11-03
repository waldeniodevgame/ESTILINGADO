# Validação da identidade ESTILINGADO — 28/10/2026

## Escopo e versões

Correção de nomes de apresentação e URLs autorizada pelo proprietário. Base remota: `e213e474d94dfb3bcd5608c24cea927ea47020e6`; commit da correção: `7bdc4b8`.

A auditoria original avaliou 328 arquivos da cópia Desktop/ESTILINGADO, com GORDON como repositório interno. GORDON estava em `1bc9b2f`, 35 commits atrás da base remota. Foram preservadas suas quatro modificações técnicas: `CMC_Biblioteca/dados/efeitos_e_escalas.json`, `CMC_Biblioteca/docs/estrutura_dados.json`, `CMC_Biblioteca/src/engine/010_useSkill.js` e `CMC_Biblioteca/src/engine/023_startShot.js`.

Na cópia local, foram corrigidos os 17 arquivos reais da auditoria e duas builds HTML classificadas como binárias pelo verificador. Backup dos 19 arquivos foi salvo na pasta de trabalho da conversa. As 14 correções dentro de GORDON estão na branch local `fix/estilingado-brand-local`, commit `7008dd2`; cinco HTML externos não pertencem àquele repositório. O origin local aponta para o GitHub atual. As modificações técnicas locais não foram mescladas com o remoto.

No remoto, correções anteriores já haviam alterado README e índice de desenvolvimento; novas telas ainda continham marcas antigas. A correção remota alcançou 17 arquivos: nove HTML e oito documentos. Arquivos, funções, chaves, CMC_, localStorage e parâmetros físicos não foram renomeados. O verificador permanece intacto.

## Evidências

- Blocos script binariamente idênticos antes/depois nos nove HTML remotos e em todos os HTML locais corrigidos. Bytes de codificação inválidos nas duas builds preservados.
- Auditoria original reexecutada: zero correspondências/caminhos no remoto; uma correspondência local, exclusivamente no verificador. Relatório original preservado como evidência histórica.
- `build.ps1` executado em cópia isolada: fonte e build idênticas, SHA-256 `3f54dd2bf681b0a23cb38b44394642655c2f5a8809d39b34ab5398cd2824ae80`.
- Chromium: nove páginas HTML alteradas com HTTP 200, identidade atual e zero erros JavaScript, em desktop 1280×800 e tablet 1024×768 com toque. Total: 18 verificações aprovadas.
- `git diff --check`: aprovado.
- Suíte local Playwright: 11 casos passaram na execução com um worker e gravações desativadas; o limite global de 120 segundos interrompeu o encerramento do servidor e deixou um caso sem concluir. Esse último caso, cancelamento do toque, passou isoladamente com servidor gerenciado fora da configuração. Resultado agregado: os 12 casos existentes passaram, cobrindo seleção dos 16 monstros, estado do motor e arrasto/cancelamento em desktop e toque. A execução agregada não teve saída limpa devido ao teardown; a repetição isolada terminou com código zero.

## Limitações e falhas anteriores

`verify-project.ps1` acusa divergência do baseline de motor e interface neste ambiente. A execução sobre o arquivo original anterior à correção reproduz os mesmos hashes e as mesmas duas falhas. Não foi redefinido o baseline nem alterado o verificador para ocultar o resultado. Marcadores de colisão, dano, combos e eventos de ponteiro continuam presentes.

O package.json remoto declara servidores de páginas estáticas, sem comandos de compilação ou testes. Os testes de regressão utilizados são os existentes na cópia local. Emulação de toque no Chromium não equivale a validação em aparelho Android físico. Inscrições em imagens binárias não foram inspecionadas.

## Reversão

Reverter os commits remotos desta entrega pelo Git. O commit local `7008dd2` contém somente a identidade; o backup na pasta da conversa preserva os 19 arquivos anteriores. Evitar reset na cópia local, pois os quatro arquivos técnicos do proprietário permanecem modificados sem commit.
