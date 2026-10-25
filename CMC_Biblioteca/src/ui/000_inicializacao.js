
(() => {
  'use strict';
  const VFX = {{DATA:efeitos_visuais}};
  const PROGRESS = {{DATA:progresso}};
  const E = window.EloEngine, ANCHOR = E.ANCHOR, C = E.C, T = E.TYPES, furnaceProfile=E.PHYSICS_PROFILES[0];
  const $ = id => document.getElementById(id);
  const canvas = $('arena'), ctx = canvas.getContext('2d');
  const jade = '#9ee8d5', amethyst = '#ed9bbd', gold = '#e9bf83';
  const teamColor = team => team ? amethyst : jade;
  const teamName = team => team ? 'Ametista' : 'Jade';
  const modals = ['helpDialog', 'monsterDialog', 'restartDialog'].map($);
  const guideStorageKey = 'estilingado-tutorial-progress-v3';
  const guideStepKeys = {{DATA:ui_guideStepKeys}};
  const blankGuideProgress = () => ({introSeen:false,aim:false,combo:false,captain:false,special:false});
