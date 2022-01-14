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

class RecordParser {
	constructor() {
		this.score = null;
		this.seconds = null;
		this.killCount = {
			players: null,
			assists: null,
			bosses: null
		};
		this.killersLength = null;
		this.killers = [];
		this.baseCooldown = null;
	}

	parse(packet) {
		const rot = rotator(packet);

		if (rot.nex() !== 'F') throw new TypeError('Invalid packet header; expected packet `F`');

		this.score = rot.nex();
		this.seconds = rot.nex();

		this.killCount.players = rot.nex();
		this.killCount.assists = rot.nex();
		this.killCount.bosses = rot.nex();

		this.killersLength = rot.nex();
		for (let i = 0; i < this.killersLength; i++) {
			this.killers.push(rot.nex());
		}
		
		this.baseCooldown = rot.nex();

		return this;
	}
}
