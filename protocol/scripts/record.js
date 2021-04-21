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
        this.killers = packet;

        return this;
    }
}
