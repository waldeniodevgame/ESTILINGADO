# Índice de desenvolvimento — ESTILINGADO

> Painel simples do projeto. Use este arquivo para saber onde estamos; marque a execução no [checklist ativo](CHECKLIST_DESENVOLVIMENTO.md).

## Base oficial

- **Build de referência:** [`TESTgordon/TESTE26gordon.html`](../TESTgordon/TESTE26gordon.html)
- **Estado:** funcional e visualmente aprovada no Android.
- **Regra:** não alterar esta base diretamente. Cada ajuste nasce em cópia versionada ou branch própria.
- **Registro técnico:** [Base atual Gordon](BASE_ATUAL_GORDON.md)

## Revisão de interface — comandos centralizados

Execute `npm run serve:gordon` para abrir a [cópia com comandos centralizados](../TESTgordon/BATALHA_CENTRALIZADA.html). A build-base original permanece preservada em `TESTgordon/TESTE26gordon.html` e acessível pelo seu nome no servidor. A revisão reúne habilidades abaixo da arena e pausa/som acima dela. Validação em Android físico ainda pendente.

## Visão rápida

| Frente | Onde estamos | Próximo marco |
|---|---|---|
| Base Gordon | Referência definida e preservada | Trabalhar sempre a partir de uma cópia |
| Combate | Física, lançamento, colisões, dano e turnos existem | Fechar regressão crítica |
| Arena de Teste | Editor, telemetria e replay de lançamento existem | Usar para reproduzir bugs e gravar evidências |
| Jogo Livre | Build jogável no Android | Validar a mesma experiência no PC |
| Câmera e efeitos de arena | Android está correto; PC não mostra todos os efeitos | Capturar, comparar e corrigir sem mudar configurações atuais |
| Interface/HUD | Funcional, em evolução | Ajustar somente depois da câmera estar reproduzível |
| Conteúdo V1 | 1 arena, 2 Capitães e 4 monstros definidos como alvo | Definir vertical slice após QA do combate |
| Publicação | Ainda não iniciada | Migrar para Android depois do vertical slice |

## Prioridade atual — câmera no PC

**Problema conhecido:** no jogo livre, os efeitos de câmera/arena que aparecem no Android não ficam visíveis no PC. A configuração atual permanece congelada porque está funcionando no Android.

**Objetivo da rodada:** gerar evidência comparável do mesmo movimento nos dois dispositivos e nos dois modos de jogo, localizar a diferença e corrigir apenas a causa reproduzível.

- [Plano de captura e diagnóstico da câmera](CAMERA_PC_CAPTURA.md)
- [Biblioteca de poderes dos Capitães](BIBLIOTECA_PODERES_CAPITAES.md)
- [Índice estruturado de poderes](../captains/powers/index.json)
- [Fichas individuais dos poderes](../captains/powers/)
- [Checklist ativo](CHECKLIST_DESENVOLVIMENTO.md)

## Ordem de trabalho

1. Capturar Android e PC na **Arena de Teste**.
2. Capturar Android e PC no **Jogo Livre**.
3. Comparar evento, intensidade, duração e retorno da câmera.
4. Registrar a causa reproduzível antes de tocar no código.
5. Corrigir em cópia da build Gordon e validar Android + PC.
6. Só então retomar HUD, combos, armadilhas e vertical slice.

## Documentos de apoio

- [Checklist ativo](CHECKLIST_DESENVOLVIMENTO.md)
- [Câmera: captura e diagnóstico](CAMERA_PC_CAPTURA.md)
- [Mecânicas aprovadas](MECANICAS_APROVADAS.md)
- [Casos de teste V0.5](TESTES_V0.5.md)
- [Roadmap](ROADMAP.md)
- [Progresso anterior](PROGRESSO_2026-10-26.md)
- [Changelog](../CHANGELOG.md)

## Regras de registro

- Uma alteração por vez.
- Uma correção só entra após reproduzir o problema e repetir o teste.
- Todo ajuste aprovado atualiza o checklist e o changelog.
- Não misturar correção de câmera com mudança de mecânica, balanceamento ou HUD no mesmo commit.