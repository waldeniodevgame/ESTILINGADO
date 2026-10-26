# Tela 03 — Preparo: Escolha de Equipe

**Status:** Regras funcionais fechadas; composição visual base ainda pendente de redesenho e aprovação.

## Papel no fluxo

A Tela 03 recebe a fase escolhida no Mapa de Fases e permite montar a equipe antes da Batalha. Ela não altera física, câmera, colisões, poderes ou balanceamento da arena.

```text
02 Mapa de Fases → 03 Preparo de Equipe → 03A Modal de Seleção → 03 Preparo de Equipe → 04 Batalha
```

## Regras fechadas em 26/10/2026

- A equipe tem exatamente **4 vagas**.
- **Criaturas repetidas não são permitidas** na mesma equipe.
- O cabeçalho da fase deve exibir **objetivo + recompensa**.
- As sinergias aparecem como **resumo compacto**: quantidade de combinações ativas, bônus total e nomes das combinações ativas. Detalhes completos ficam disponíveis por expansão ou toque, sem competir com a montagem da equipe.
- O botão para iniciar a batalha só fica ativo com as 4 vagas preenchidas.
- A fase escolhida no Mapa de Fases permanece selecionada ao entrar e ao retornar para esta tela.
- O rival é definido pela fase na Campanha. A configuração manual do rival não aparece neste fluxo.

## Estrutura funcional para o redesenho

1. **Cabeçalho de fase:** nome/fase, objetivo e recompensa.
2. **Equipe:** quatro vagas em ordem fixa; cada vaga mostra retrato, nome, função e ação de remover/trocar.
3. **Sinergias:** resumo compacto atualizado após cada confirmação de criatura.
4. **Ação principal:** `Iniciar batalha`, bloqueada até completar quatro vagas.
5. **Ação de retorno:** volta ao Mapa de Fases preservando a fase escolhida.

## Lógica de estado aprovada

```js
teamSlots: [null, null, null, null]
activeSlot: null
modalCandidate: null
activeFilter: all
selectedPhase: { id, name, objective, reward, enemyTeam }
```

- Tocar uma vaga vazia, ou trocar uma vaga preenchida, define `activeSlot` e abre a Tela 03A.
- A escolha dentro da 03A é temporária em `modalCandidate`.
- `Confirmar` grava a criatura em `teamSlots[activeSlot]`, fecha a 03A e recalcula sinergias.
- Fechar ou voltar na 03A descarta `modalCandidate`; a equipe não muda.
- Uma criatura que já esteja em outra vaga não pode ser confirmada; o card deve informar que ela já compõe a equipe.
- Ao iniciar a batalha, os quatro índices de `teamSlots` são enviados para a arena junto com o time rival definido pela fase.

## Integração com a build Gordon

A build já usa um array de quatro índices (`selected`) e o envia ao motor via `createGame({ teams: [selected, enemySelected] })`. O redesenho deve adaptar `teamSlots` para esse mesmo formato no clique de iniciar, sem mudar o motor de batalha.

## Função validada da Tela 03A

- Ação de origem: vaga `Adicionar Criatura` ou ação de trocar.
- Abertura: painel sobreposto, sem sair da tela de preparo.
- Conteúdo: grade com as **16 criaturas** disponíveis.
- Filtros: Todas, Tanque, Atacante e Suporte.
- Seleção: uma criatura por vez, com borda e marca de confirmação.
- Rodapé: resumo da criatura selecionada e botão `Confirmar`.
- Fechamento: confirmar preenche somente a vaga de origem; voltar/fechar não altera a equipe.

## Pendência de aprovação

A composição visual completa da Tela 03 ainda deve ser redesenhada e aprovada. As regras acima são o contrato funcional para esse redesenho e para a implementação posterior.