# Fichas individuais dos poderes dos Capitães

A biblioteca de poderes agora possui uma ficha por poder em `captains/powers/`.

## Estrutura

- `index.json`: índice geral, regras de energia, limite de poderes e referências.
- Cada pasta numerada contém:
  - `power.json`: custo, uso, efeito, duração, combinações e estado.
  - `implementation.json`: arquivos do motor e dados consumidos.

## Estados

- `implemented`: comportamento já existente e validado na biblioteca modular.
- `proposed`: poder descrito na biblioteca de design, ainda não ativado no motor.

A separação dos arquivos não ativa poderes propostos automaticamente. A base oficial do jogo permanece protegida; cada implementação futura deve nascer em cópia versionada, receber testes e só depois ser promovida.

## Fonte de design

O catálogo foi derivado de `docs/BIBLIOTECA_PODERES_CAPITAES.md`, que continua sendo a referência textual de balanceamento e combinações.
