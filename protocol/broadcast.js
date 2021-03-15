function rotator(packet) {
  return {
    i: 0,
    arr: packet,
    get(index) {
      return packet[index];
    },
    set(index, value) {
      return (packet[index] = value);
    },
    nex() {
      if (this.i === this.arr.length) {
        console.error(new Error('End reached'), this.arr)
        return -1;
      }
       return packet[this.i++];
    },
  };
}
Array.prototype.remove = function (index) {
  if (index === this.length - 1) return this.pop();
  this[index] = this.pop();
}
class BroadcastParser {
  constructor() {
    this.leaderboard = [];
    this.teamMinimap = [];
    this.globalMinimap = [];
  }

  parse(packet) {
    const rot = rotator(packet);

    if (rot.nex() !== 'b') throw new TypeError('Invalid packet header; expected packet `b`');

    this._array(rot, () => {
      const del = rot.nex();
      
      this.globalMinimap.remove(this.globalMinimap.findIndex(({id}) => id === del));
    });

    this._array(rot, () => {
      const dot = {
        id: rot.nex(),
        type: rot.nex(),
        x: rot.nex(),
        y: rot.nex(),
        color: rot.nex(),
        size: rot.nex()
      };
      
      let index = this.globalMinimap.findIndex(({id}) => id === dot.id);
      if (index === -1) index = this.globalMinimap.length;

      this.globalMinimap[index] = dot;
    });

    this._array(rot, () => {
      const del = rot.nex();
      
      this.teamMinimap.remove(this.teamMinimap.findIndex(({id}) => id === del));
    });

    this._array(rot, () => {
      const dot = {
        id: rot.nex(),
        x: rot.nex(),
        y: rot.nex(),
        size: rot.nex()
      };
      
      let index = this.teamMinimap.findIndex(({id}) => id === dot.id);
      if (index === -1) index = this.teamMinimap.length;

      this.teamMinimap[index] = dot;
    });

    this._array(rot, () => {
      const del = rot.nex();
      
      this.leaderboard.remove(this.leaderboard.findIndex(({id}) => id === del));
    });

    this._array(rot, () => {
      const champ = {
        id: rot.nex(),
        score: rot.nex(),
        index: rot.nex(),
        name: rot.nex(),
        color: rot.nex(),
        barColor: rot.nex()
      };
      
      let index = this.leaderboard.findIndex(({id}) => id === champ.id);
      if (index === -1) index = this.leaderboard.length;

      this.leaderboard[index] = champ;
    });

    this.leaderboard.sort((c1, c2) => c2.score - c1.score);

    return this;
  }

  _array(rot, read, length=rot.nex()) {
    const out = Array(Math.max(0, length));

    for (let i = 0; i < length; ++i) out[i] = read.call(this, i, rot);

    return out;
  }
}
