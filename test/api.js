const request = require("sync-request");

const gamemodeTable = [
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
			delay: !0,
			remove: "f"
		}
	],
	[
		{
			id: "f",
			u: "FFA"
		},
		{
			id: "d",
			u: "Duos"
		},
		{
			id: "s",
			u: "Squads"
		},
		{
			id: "1",
			u: "1 Team",
			advance: !0
		},
		{
			id: "2",
			u: "2 Team",
			advance: !0,
			end: "2TDM"
		},
		{
			id: "3",
			u: "3 Team",
			advance: !0,
			end: "3TDM"
		},
		{
			id: "4",
			u: "4 Team",
			advance: !0,
			end: "4TDM"
		}
	],
	[
		{
			id: "d",
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

class Client {

	// Constructor
	constructor() {
		this.servers = this.get.servers();
	}

	// Check the server
	_serverExists(id) {
		return this.servers.hasOwnProperty(`#${id}`);
	}

	// Server code → Gamemode
	_parseGamemode(code) {
		if (!code || "%" === code) {
			return "Unknown";
		}
		let name = [],
			filter = [];
		let at = 0;
		let table = gamemodeTable;
		for (const games of gamemodeTable) {
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

		return name.map((n, i, l) => l[i + Math.pow(-1, i)]).filter(({ id }) => !filter.includes(id)).map(data => data.u).join(" ");
	};

	// Get
	get get() {
		return {

			// Get all servers
			servers: () => {
				const response = request("GET", "https://n15rqgeh01clbn7n.d.nsrv.cloud:2222/status");
				if (response.statusCode != 200) {
					throw new Error(`status code: ${response.statusCode}`);
				}
				const json = JSON.parse(response.body.toString());
				const servers = json.status;
				return servers;
			},

			// Get server
			server: (id) => {
				if (!this._serverExists(id)) {
					throw new Error("the server does not exist");
				}
				return this.servers[`#${id}`];
			},

			// Server ID → Gamemode
			gamemode: (id) => {
				if (!this._serverExists(id)) {
					throw new Error("the server does not exist");
				}
				const server = this.get.server(id);
				return this._parseGamemode(server.code.split("-")[2]);
			},

			// Get mockups.json
			mockups: (id) => {
				if (!this._serverExists(id)) {
					throw new Error("the server does not exist");
				}
				const server = this.get.server(id);
				const url = `https://${server.host}/mockups.json`;
				const response = request("GET", url);
				if (response.statusCode != 200) {
					throw new Error(`status code: ${response.statusCode}`);
				}
				const mockups = JSON.parse(response.body.toString());
				return mockups;
			}

		}
	}

}

const client = new Client();
console.log(client.get.gamemode("ba"));
// console.log(client.get.mockups("ba"));
