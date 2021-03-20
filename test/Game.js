const request = require("sync-request");

class Game {

	constructor() {

		this.gamemodeTable = [
			[
				{
					id: "x",
					u: "Private"
				}
			],
			[
				{
					id: "e",
					Hb: "word"
				}
			],
			[
				{
					id: "w",
					Hb: "words"
				}
			],
			[
				{
					id: "p",
					u: "Portal"
				}
			],
			[
				{
					id: "o",
					u: "Open"
				}
			],
			[
				{
					id: "m",
					u: "Maze",
					delay: true,
					remove: "f"
				}
			],
			[
				{
					id: "f",
					u: "FFA"
				},
				{
					id: "table",
					u: "Duos"
				},
				{
					id: "s",
					u: "Squads"
				},
				{
					id: "1",
					u: "1tdm",
					advance: true
				},
				{
					id: "2",
					u: "2tdm",
					advance: true,
					end: "2TDM"
				},
				{
					id: "3",
					u: "3tdm",
					advance: true,
					end: "3TDM"
				},
				{
					id: "4",
					u: "4tdm",
					advance: true,
					end: "4TDM"
				}
			],
			[
				{
					id: "table",
					u: "Domination"
				},
				{
					id: "m",
					u: "Mothership",
					remove: "2"
				},
				{
					id: "a",
					u: "Assault",
					remove: ["2", "m"]
				},
				{
					id: "s",
					u: "Siege",
					remove: "1"
				},
				{
					id: "t",
					u: "Tag",
					remove: ["o", "4"]
				},
				{
					id: "p",
					u: "Pandemic",
					remove: ["o", "2"]
				},
				{
					id: "z",
					u: "Sandbox"
				}
			]
		];

		this._getServers();

	}

	_getServers() {
		if (this.servers == null) {
			const responce = request("GET", "https://n15rqgeh01clbn7n.d.nsrv.cloud:2222/status");
			const json = JSON.parse(responce.body.toString());
			const servers = json.status;
			this.servers = servers;
		}
		return this.servers;
	}

	getGamemode(id) {
		if (!this.servers.hasOwnProperty(`#${id}`)) {
			return null;
		}
		const server = this.servers[`#${id}`];
		return this._parseGamemode(server.code.split("-")[2]);
	}

	_parseGamemode(code) {

		if (!code || "%" === code) {
			return "Unknown";
		}

		let name = [],
			filter = [];
		let at = 0;
		let table = this.gamemodeTable;
		for (const games of this.gamemodeTable) {
			for (const game of games) {
				if (game.id === code.charAt(at)) {
					at++;
					table = Object.assign({}, game);
					if (Array.isArray(game.remove)) {
						filter.push(...game.remove)
					} else {
						filter.push(game.remove);
					}
					name.push(table);
					break
				}
			}
		}
		if (name.length == 0) {
			return "Unknown";
		}

		for (let i = 0; ((i + 1) < name.length); i++) {
			const value = name[i];
			name[i] = name[(i + 1)];
			name[(i + 1)] = value;
			i++;
		}
		name = name.filter(({ id }) => !filter.includes(id));
		return name.map(data => data.u).join(" ");

	};

}

const game = new Game();
console.log(game.getGamemode("oc"));
