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
		this.scoreCode = null;
    }

    parse(packet) {
        const header = packet.shift();
        if (header !== 'F') throw new TypeError('Invalid packet header; expected packet `F`');

        this.score = packet.shift();
        this.seconds = packet.shift();

        this.killCount.players = packet.shift();
        this.killCount.assists = packet.shift();
        this.killCount.bosses = packet.shift();

        this.killersLength = packet.shift();
		this.killers = packet.slice(0, this.killersLength);
			
		packet = packet.slice(this.killersLength);

		this.baseCooldown = packet.shift();
		this.scoreCode = packet.shift() || null; 

        return this;
    }
}
