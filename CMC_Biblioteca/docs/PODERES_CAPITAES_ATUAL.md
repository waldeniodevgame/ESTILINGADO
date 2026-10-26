# Poderes dos Capitães — especificação atual

## Vetor

- Custo: 2 de energia.
- Uso: clicar no poder antes do lançamento.
- Efeito: dobra a velocidade do próximo lançamento do monstro ativo.
- Consumo: aplicado uma vez no início do lançamento.

## Parede

- Custo: 3 de energia.
- Uso: clicar no poder antes do lançamento.
- Efeito: quando um adversário é arremessado contra uma parede válida, o dano da parede é dobrado.
- Restrições: não causa dano em aliados nem no próprio lançador; o bônus vale somente para o contato do adversário com a parede.

## Protocolo

- Custo: 5 de energia.
- Uso: clicar diretamente no poder, sem selecionar monstro ou alvo.
- Efeito: causa 50 de dano em cada monstro inimigo vivo e 50 de dano no Capitão inimigo.
- Resolução: imediata durante o planejamento; elimina unidades derrotadas e verifica vitória.

## Validação

- A build modular foi recompilada em `dist/CMC_Modular.html`.
- Os estados dos três poderes foram testados diretamente no motor.
- A base oficial `TESTgordon/TESTE26gordon.html` não foi alterada.
