// @RayAdams and I (@ABC) will work on a class that takes in one parameter, the websocket, and retrieves data like total life time, total kill count etc from that.

class StatMonitor {
  constructor(ws) {
    this.ws = ws;
  }
}


usage:  {
  const stats = new StatMonitor(hookedWS);

  stats.onDeath = (data) => {
    console.log('Death, time alive: ' + data.timeAlive);
    console.log('Death, total kills: ' + data.totalKills);
    console.log('Death, died to a : ' + data.killer);
  }

  setInterval(() => {
    console.log('Calculated time alive: ' + StatMonitor.beautifyTime(stats.timeAlive));
    console.log('Calculated kill count: ' + stats.killCount);
  });

}
