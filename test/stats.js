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
    console.log('Calculated kill count: ' + stats.getKills().length);
  });

}
