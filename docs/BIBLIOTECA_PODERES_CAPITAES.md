# Biblioteca de poderes dos Capitães

> **Estado:** proposta inicial de balanceamento. Este documento não ativa poderes automaticamente no HTML. Use-o para escolher o conjunto antes de implementar e testar cada efeito.

## Regras-base propostas

- Antes da partida, cada Capitão escolhe **3 poderes** desta biblioteca para compor sua carga.
- Energia atual do jogo: começa em **3**, ganha **2 por turno próprio** e tem máximo de **6**.
- Só é permitido ativar **um poder de Capitão por turno próprio**, antes do lançamento.
- “Lançamento atual” termina quando a física do monstro parar e o turno trocar.
- “Fim do turno” significa que o efeito expira antes da vez do adversário.
- Um bônus consumido no primeiro contato não pode reaplicar em contatos contínuos.
- Poderes de Capitão preparam uma jogada; não podem derrotar o Capitão rival sem participação de monstros.

## Índice de poderes

| # | Poder | Mana | Como usar | Efeito e valores | Duração | Melhor combinação | Estado |
|---:|---|---:|---|---|---|---|---|
| 1 | Cura de Campo | 2 | Antes do lançamento | Cura o aliado mais ferido em **20 PV**. | Imediato | Reator, Marcelo, Muralha | Já existe |
| 2 | Sobrecarga | 2 | Antes do lançamento | Adiciona **+8 dano** ao primeiro impacto válido. | Consumido no 1º impacto | Broca, Marcelo, Rebatedor | Já existe |
| 3 | Vetor | 2 | Antes do lançamento | Aumenta o empurrão dos impactos diretos em **25%**. | Lançamento atual | Ímã, Âncora, Muralha | Já existe |
| 4 | Circuito | 3 | Antes do lançamento | O primeiro dano causado por combo recebe **×1,5**. | Consumido no 1º combo | Voltagem, Eco, Pulso | Já existe |
| 5 | Parede Rúnica | 3 | Antes do lançamento | Todas as paredes podem causar **12 dano** por impacto; cada inimigo recebe no máximo 2 ativações por parede. | Lançamento atual | Rebatedor, Ímã, Turbina | Já existe |
| 6 | Protocolo Máx. | 5 | Antes do lançamento | Começa a sequência de dano com **+10%** de crescimento em danos de impacto não-exatos. | Lançamento atual | Fornalha, Broca, Lulla | Já existe |
| 7 | Escudo de Impacto | 2 | Escolha o monstro ativo | Concede **25 de escudo temporário** ao monstro que será lançado. | Até fim do turno | Marcelo, Reator, Muralha | Proposto |
| 8 | Motor de Impulso | 2 | Escolha o monstro ativo | Aumenta em **25%** a velocidade inicial de lançamento. | Lançamento atual | Rebatedor, Turbina, Lulla | Proposto |
| 9 | Estabilizador | 1 | Escolha o monstro ativo | Reduz em **35%** o empurrão recebido pelo monstro lançado. | Lançamento atual | Reator, Marcelo, Âncora | Proposto |
| 10 | Mira Prismática | 1 | Antes do lançamento | Mostra a prévia até o **segundo ricochete** e destaca aliados que ativariam combo. Não aumenta dano. | Durante a mira | Rebatedor, Broca, Prisma | Proposto |
| 11 | Runa de Ricochete | 3 | Antes do lançamento | Permite **1 ricochete válido extra** em parede ou ruína; preserva a regra normal de perda de velocidade. | Consumido no ricochete | Rebatedor, Turbina | Proposto |
| 12 | Pulso Sísmico | 3 | Antes do lançamento | O primeiro inimigo atingido emite uma onda de **10 dano** em raio de **55 px**, uma vez. Aliados não sofrem dano. | Consumido no 1º impacto | Fornalha, Ímã, Lulla | Proposto |
| 13 | Marca de Ruptura | 2 | Antes do lançamento | O primeiro inimigo tocado recebe **+25% dano de impacto**. | Consumido no 1º impacto | Marcelo, Broca, Glacial | Proposto |
| 14 | Campo Inercial | 2 | Antes do lançamento | Aliados deslocados por efeitos durante a jogada recebem **30% menos impulso**. | Lançamento atual | Eco, Pulso, Âncora | Proposto |
| 15 | Ímã de Retorno | 3 | Antes do lançamento | No primeiro inimigo atingido, puxa o inimigo mais próximo até **40 px** em sua direção, sem causar dano. | Consumido no 1º impacto | Fornalha, Âncora, Lulla | Proposto |
| 16 | Casulo de Recuperação | 3 | Escolha o monstro ativo | Se sobreviver ao lançamento, recupera **12 PV** ao fim do turno. | Fim do turno | Reator, Marcelo, Muralha | Proposto |
| 17 | Sobrecarga de Combo | 3 | Antes do lançamento | Cada aliado atravessado adiciona **+5% dano**, até **+15%**; não altera velocidade. | Lançamento atual | Voltagem, Glacial, Pulso | Proposto |
| 18 | Freio de Campo | 2 | Antes do lançamento | O primeiro inimigo empurrado tem sua velocidade reduzida em **35% por 1,5 s**. | Consumido no 1º empurrão | Glacial, Âncora, Ímã | Proposto |
| 19 | Passagem Fantasma | 4 | Antes do lançamento | O monstro ativo pode ignorar **uma ruína** no lançamento, sem dano nem ricochete nessa ruína. | Consumido na ruína | Broca, Lulla, Prisma | Proposto |
| 20 | Barreira Tática | 4 | Escolha um ponto livre | Cria uma barreira curta de **70 px** que bloqueia um contato e desaparece. Não causa dano. | Até fim do turno | Rebatedor, Fornalha, Ímã | Proposto |

## Famílias para leitura na tela de seleção

| Família | Cor sugerida | Poderes |
|---|---|---|
| Ataque | Vermelho/laranja | Sobrecarga, Circuito, Protocolo Máx., Pulso Sísmico, Marca de Ruptura |
| Movimento | Ciano | Vetor, Motor de Impulso, Runa de Ricochete, Passagem Fantasma |
| Defesa | Verde | Cura, Escudo de Impacto, Estabilizador, Campo Inercial, Casulo |
| Controle | Roxo | Parede Rúnica, Ímã de Retorno, Freio de Campo, Barreira Tática |
| Leitura | Dourado | Mira Prismática, Sobrecarga de Combo |

## Primeiro conjunto para testar

Para não abrir vinte poderes de uma vez, a primeira rodada deve validar apenas:

1. Cura de Campo
2. Sobrecarga
3. Vetor
4. Parede Rúnica
5. Escudo de Impacto
6. Motor de Impulso
7. Mira Prismática
8. Marca de Ruptura

Depois do teste, ajustar mana, duração e limites antes de adicionar os outros poderes à tela de seleção.
