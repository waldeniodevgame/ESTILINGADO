# ESTILINGADO

Protótipo HTML5 de arena por turnos com lançamento por arrasto, colisões, combos e habilidades de criaturas. O repositório guarda a build testável e a biblioteca modular usada para editar atributos, CSS e funções sem depender de um único HTML gigantesco.

## Começar por aqui

1. Leia [Índice de desenvolvimento](docs/INDICE_DESENVOLVIMENTO.md).
2. Para testar a build atual, abra [TESTE LULA 26 — Ímã corrigido](builds/TESTE%20LULA%2026%20-%20IM%C3%83%20DANO%20ALIADO%20CORRIGIDO.html) no navegador.
3. Para editar atributos de forma modular, siga [CMC_Biblioteca/LEIA_PRIMEIRO.md](CMC_Biblioteca/LEIA_PRIMEIRO.md).
4. Registre o resultado de cada rodada no [checklist](docs/CHECKLIST_DESENVOLVIMENTO.md).

## Estrutura

| Caminho | Uso |
|---|---|
| `builds/` | HTMLs completos para teste manual. |
| `CMC_Biblioteca/dados/` | Tabelas JSON de criaturas, arena, física, capitães, efeitos e progresso. |
| `CMC_Biblioteca/src/engine/` | Regras de turno, dano, colisão, IA e habilidades. |
| `CMC_Biblioteca/src/ui/` | Mira, ponteiro, HUD, desenho, efeitos e telas. |
| `CMC_Biblioteca/styles/` | CSS separado por responsabilidade. |
| `CMC_Biblioteca/assets/` | Assets locais do projeto. |
| `CMC_Biblioteca/compilar.py` | Gera `dist/CMC_Modular.html` a partir da biblioteca. |
| `docs/` | Decisões, progresso, QA e checklist. |

## Build atual de teste

`builds/TESTE LULA 26 - IMÃ DANO ALIADO CORRIGIDO.html` parte da build `TESTE LULA 26 - ARRASTO CORRIGIDO.html`.

A única alteração desta rodada impede que dano de parede/bumpeamento atinja uma unidade do mesmo time do lançador. A regra é baseada no time, portanto vale para todas as criaturas. O teste manual do Ímã ainda está pendente.

## Atenção sobre as duas linhas de trabalho

A build em `builds/` é a referência mais recente para testar o jogo. `CMC_Biblioteca/` é a biblioteca editável preservada da linha modular anterior. Não recompile a biblioteca esperando substituir automaticamente a build de teste atual: a consolidação entre as duas linhas é uma tarefa pendente e está registrada no checklist.

## Princípios de desenvolvimento

- Uma alteração de mecânica por vez.
- Sempre manter uma build HTML funcional para teste.
- Aliados atravessados podem gerar combo, mas não recebem dano de colisão no turno do lançador.
- Dano por impacto deve ocorrer uma vez por contato válido, sem repetição por frame.
- Não marcar item como concluído sem teste executado.
