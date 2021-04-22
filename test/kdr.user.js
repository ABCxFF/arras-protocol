// ==UserScript==
// @name         Arras KDR Tracker
// @author       Salt
// @namespace    stores and displays your k/d ratio over time
// @description  stores and displays your k/d ratio over time
// @match        *://arras.io/*
// @match        *://arras.netlify.app/*
// @version      1.3.1
// @run-at       document-end
// @grant        none
// ==/UserScript==    
 
alert('Due to recent anti scripting attempts, this script will no longer work');
 
/*
 * Options / Configuration
 * SHOW_KDR:
 *   When set to true, this script will display your
 *   kdr while  in  game. When false, it  will  only
 *   track and not display
 * 
 * SHOW_EXACT_VALUES:
 *   When set to true, this script will display your
 *   kills, and  deaths  alongside  your  KDR, or by
 *   itself if you've disabled SHOW_KDR.
 *
 */
 
"use strict";
 
const SHOW_KDR = true; // true or false
const SHOW_EXACT_VALUES = true; // true or false
 
(async (imports) => {
  
  // wait for game to load
  const coder = imports.coder;
  const socket = await imports.socket;
 
  const originReqAnim = window.requestAnimationFrame;
  const killRegex = /You killed .*'s .*\./g;
  const gameCtx = document.getElementById('gameCanvas').getContext('2d');
 
  const getColor = (id) => Arras('cx :pray:').COLOR_TABLE // FIX THIS LINE
  const isInGame = () => socket.readyState !== 1 ? false : socket.player ? true : false;
 
  // pretty wasteful lol
  const state = {
    get _storage() {
      try {
        return JSON.parse(localStorage._arrasKDR || {})
      } catch (err) {
        return {}
      }
    },
    set _storage({kills=0, deaths=0}) {
      return localStorage._arrasKDR = JSON.stringify({kills, deaths})
    },
 
    get kills() {
      return this._storage.kills || 0;
    },
    set kills(value) {
      this._storage = {
        kills: this._storage.kills + 1,
        deaths: this._storage.deaths
      }
      return this._storage.kills
    },
 
    get deaths() {
      return this._storage.deaths || 0;
    },
    set deaths(value) {
      this._storage = {
        kills: this._storage.kills,
        deaths: this._storage.deaths + 1
      }
      return this._storage.deaths
    },
    get kdr() {
      return Number.isNaN(this.kills/this.deaths) ? 0 : this.kills/this.deaths
    },
    
    isDead: false,
    lastKill: 0
  }
 
 
  function drawStats() {
    gameCtx.globalAlpha = 0.9;
    gameCtx.fillStyle = getColor(8); // guiwhite
    gameCtx.strokeStyle = getColor(9); // black
    gameCtx.lineWidth = 5;
    gameCtx.font = "bold 15px Ubuntu";
    gameCtx.fontWeight = "900";
 
    let y = 20;
    if (SHOW_EXACT_VALUES) {
      gameCtx.strokeText(`${state.kills} kill${state.kills!==1?"s":""} and ${state.deaths} death${state.deaths!==1?"s":""}`, 20, gameCtx.canvas.height - y);
      gameCtx.fillText(`${state.kills} kill${state.kills!==1?"s":""} and ${state.deaths} death${state.deaths!==1?"s":""}`, 20, gameCtx.canvas.height - y);
      y += 20
    }
    if (SHOW_KDR) {
      gameCtx.strokeText(`KDR: ${Number.isFinite(state.kdr) ? state.kdr.toFixed(2) : '∞'}`, 20, gameCtx.canvas.height - y);
      gameCtx.fillText(`KDR: ${Number.isFinite(state.kdr) ? state.kdr.toFixed(2) : '∞'}`, 20, gameCtx.canvas.height - y);
    }
  }
  
  function update() {
 
    // Check deaths
    if (false) {// !state.isDead && globalGame.died) {
      // Untracked death
      state.isDead = true;
      state.deaths += 1;
    }
    
    // Check kills
    // let killMessages = globalGame.messages.filter(({text}) => killRegex.test(text)).map(message => ({text: message.text, time: message.time})).sort(({time1}, {time2}) => time2 - time1); // newest show up last
    
    /* while (killMessages.length) {
      if (killMessages[0].time <= state.lastKill) {
        break;
      } else {
        // Untracked kill
        state.lastKill = killMessages.shift().time;
        state.kills += 1;
      }
    }*/
    return;
    
  }
 
  let isStupid = /Chrome\/8[4-6]\.0\.41([4-7][0-9]|8[0-3])\./.test(navigator.userAgent);
  // redefine animation
  window.requestAnimationFrame = function(paintCallback, game=1) {
    originReqAnim((timeout) => {
      paintCallback(timeout);
      update()
      if (game) drawStats(timeout);
    })  
  };
  if (isStupid) {
    let _oT = window.setTimeout;
    window.setTimeout = function(func, time) {
      if (time === 1e3 / 60) {
        return _oT(() => {
          func()
          update()
          drawStats(time);
        }, time)
      }
      return _oT(...arguments)
    }
  }
})()
