#!/usr/bin/env node

/**
 * Config Validator für Countdown-Projekt
 * Überprüft config.json auf Konsistenz und Gültigkeit
 * 
 * Verwendung: node scripts/validate-config.js
 */

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '../config.json');

let errorCount = 0;

const log = {
  error: (msg) => { console.error('❌', msg); errorCount++; },
  warning: (msg) => console.warn('⚠️', msg),
  success: (msg) => console.log('✅', msg)
};

try {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  
  // Validiere Countdown-Ziele
  if (!config.countdown.targets || !Array.isArray(config.countdown.targets)) {
    log.error('countdown.targets muss ein Array sein');
  } else {
    if (config.countdown.targets.length < 2) {
      log.warning('Es sollten mindestens 2 Zieldaten definiert sein');
    }
    
    config.countdown.targets.forEach((target, idx) => {
      if (typeof target.month !== 'number' || target.month < 0 || target.month > 11) {
        log.error(`targets[${idx}].month muss zwischen 0 und 11 liegen (0=Jan)`);
      }
      if (typeof target.day !== 'number' || target.day < 1 || target.day > 31) {
        log.error(`targets[${idx}].day muss zwischen 1 und 31 liegen`);
      }
      if (!target.displayFormat) {
        log.error(`targets[${idx}].displayFormat fehlt`);
      }
    });
    
    log.success(`${config.countdown.targets.length} Countdown-Ziele validiert`);
  }
  
  // Validiere Farben
  if (!config.ui.colors) {
    log.error('ui.colors ist nicht definiert');
  } else {
    const requiredColors = ['bg', 'fg', 'muted', 'card'];
    requiredColors.forEach(color => {
      if (!config.ui.colors[color]) {
        log.error(`ui.colors.${color} fehlt`);
      }
    });
    log.success('Farbschema validiert');
  }
  
  // Validiere Animationen
  if (config.ui.animation) {
    if (config.ui.animation.bgIntervalMs < 100) {
      log.warning('bgIntervalMs sollte mindestens 100ms sein');
    }
    if (config.ui.animation.flipDurationMs < 100) {
      log.warning('flipDurationMs sollte mindestens 100ms sein');
    }
    log.success('Animation-Parameter validiert');
  }
  
  // Validiere Zeitzone
  if (!config.countdown.timezone) {
    log.error('countdown.timezone ist nicht definiert');
  } else {
    log.success(`Zeitzone: ${config.countdown.timezone}`);
  }
  
  // Zusammenfassung
  console.log('---');
  if (errorCount === 0) {
    console.log('✅ config.json ist gültig');
    process.exit(0);
  } else {
    console.log(`❌ ${errorCount} Fehler gefunden`);
    process.exit(1);
  }
  
} catch (error) {
  console.error('❌ Fehler beim Lesen von config.json:', error.message);
  process.exit(1);
}
