# Índice de desenvolvimento

Use este arquivo como porta de entrada do repositório e atualize o [checklist](CHECKLIST_DESENVOLVIMENTO.md) ao encerrar cada tarefa.

## 1. Onde testar

- **Build atual:** [`../builds/TESTE LULA 26 - IMÃ DANO ALIADO CORRIGIDO.html`](../builds/TESTE%20LULA%2026%20-%20IM%C3%83%20DANO%20ALIADO%20CORRIGIDO.html)
- **Base imediata:** [`../builds/TESTE LULA 26 - ARRASTO CORRIGIDO.html`](../builds/TESTE%20LULA%2026%20-%20ARRASTO%20CORRIGIDO.html)
- **Biblioteca compilável:** [`../CMC_Biblioteca/dist/CMC_Modular.html`](../CMC_Biblioteca/dist/CMC_Modular.html)

## 2. Onde editar

| Objetivo | Arquivo ou pasta |
|---|---|
| Vida, ataque, descrição e cor | `CMC_Biblioteca/dados/monstros.json` |
| Velocidade, raio, massa e impulso | `CMC_Biblioteca/dados/fisica_monstros.json` |
| Arena, limites e colisores | `CMC_Biblioteca/dados/arena.json` e `dados/fisica_global.json` |
| Vórtice da Âncora | `CMC_Biblioteca/dados/ancora_vortex.json` |
| Combos e efeitos | `CMC_Biblioteca/dados/combos.json` e `dados/efeitos_e_escalas.json` |
| Turno, dano, colisão e IA | `CMC_Biblioteca/src/engine/` |
| Mira, arrasto, canvas e HUD | `CMC_Biblioteca/src/ui/` |
| Layout e responsividade | `CMC_Biblioteca/styles/` |
| Compilar a biblioteca | `python CMC_Biblioteca/compilar.py` |

Leia também: [guia completo da biblioteca](../CMC_Biblioteca/LEIA_PRIMEIRO.md), [mecânicas aprovadas](MECANICAS_APROVADAS.md) e [progresso atual](PROGRESSO_2026-10-26.md).

## 3. Estado das mecânicas

| Área | Estado | Referência |
|---|---|---|
| Arrasto e captura de ponteiro | Build de teste disponível | `builds/TESTE LULA 26 - ARRASTO CORRIGIDO.html` |
| Dano de parede por equipe | Corrigido em código; teste manual pendente | build Ímã corrigida |
| Aliados e combos | Implementado em variações por criatura | `src/engine/025_nextContact.js` e `027_stepShot.js` |
| Vitória por Capitão e rebirth | Implementado na linha de teste; requer regressão | build atual |
| Arena de Teste e telemetria | Existe em build paralela; ainda não consolidada | histórico de builds |
| Biblioteca modular | Editável e compilável | `CMC_Biblioteca/` |

## 4. Ordem de trabalho

1. Rodar o teste manual do Ímã e registrar o resultado.
2. Fazer a regressão crítica de lançamento, turno, vitória e rebirth.
3. Consolidar a build atual com a biblioteca modular antes de ampliar criaturas.
4. Definir e validar uma criatura por vez.
5. Só então avançar para progressão, nuvem, Android e publicação.

## 5. Documentos

- [Checklist ativo](CHECKLIST_DESENVOLVIMENTO.md)
- [Progresso desta subida](PROGRESSO_2026-10-26.md)
- [Changelog](../CHANGELOG.md)
- [Roadmap anterior](ROADMAP.md)
- [Testes V0.5](TESTES_V0.5.md)
- [Teste LULA 26](TESTE_LULA_26.md)
