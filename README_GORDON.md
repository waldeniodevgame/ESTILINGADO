# Espaço Gordon

Este diretório é o workspace principal para evoluir o ESTILINGADO com múltiplos modelos, ambientes e ciclos de validação.

## Regras de trabalho

- Preservar a diretriz clean-room e não importar assets proprietários.
- Alterar uma mecânica por vez.
- Validar a versão atual antes de iniciar a próxima.
- Registrar cada mudança em `CHANGELOG.md`.
- Atualizar o comportamento aprovado em `docs/MECANICAS_APROVADAS.md`.
- Atualizar o plano em `docs/ROADMAP.md` quando uma fase for concluída.
- Manter protótipos executáveis em `prototype/`.
- Usar `configs/environments.json` para ambientes de desenvolvimento, teste e produção.
- Usar `configs/models.json` para registrar modelos de IA, simulação ou assistência usados em cada tarefa.

## Pontos de entrada

- `prototype/v0.5.html`: protótipo principal de colisões.
- `prototype/v0.6-cinematic.html`: protótipo com feedback cinematográfico.
- `prototype/TESTE LULA 26.html`: atalho para uma versão hospedada.
- `docs/TESTES_V0.5.md`: casos de teste da fase atual.
- `docs/MECANICAS_APROVADAS.md`: regras que não devem regredir.
- `docs/ROADMAP.md`: sequência planejada de desenvolvimento.
- `docs/ARQUIVOS_IMPORTANTES.md`: inventário operacional do projeto.

## Ciclo padrão

1. Escolher a fase e o ambiente em `configs/environments.json`.
2. Ler as mecânicas aprovadas antes de editar o protótipo.
3. Criar uma cópia versionada do protótipo.
4. Executar os casos de `docs/TESTES_V0.5.md`.
5. Registrar resultado, regressões e decisão no changelog.
6. Só avançar a versão após os critérios de saída do roadmap.
