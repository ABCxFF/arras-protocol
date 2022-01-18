# Clientbound
|Header|Alias|Description|
|:-:|:-:|:--|
|`b`|Broadcast|Information about the minimap and scoreboard|
|`F`|Record|Score and other results when a player dies|
|`K`|Kicked|A packet which is received when kicked by the server|
|`m`|Message|Notifications displayed on the screen|
|`p`|Pong|Ping → pong packet|
|`R`|Room|Information about the arena|
|`u`|Update|Information about a player or entities|
|`w`|Welcome|Welcomes the player and tells the client what is required to connect|
|`J`|Mockups|Entity mockups data|
|`c`|Spawn Animation|Information about the spawning camera animation|

## Broadcast
Structure：
```
b {
	<global_minimap>
		number(deleted_entities) {
			number(id)
			...
		}
		number(updated_entities) {
			number(id)
			number(type)
			number(x)
			number(y)
			number(color)
			number(size)
			...
		}
	<team_minimap>
		number(deleted_entities) {
			number(id)
			...
		}
		number(updated_entities) {
			number(id)
			number(x)
			number(y)
			number(size)
			...
		}
	<scoreboard>
		number(deleted_entities) {
			number(id)
			...
		}
		number(updated_entities) {
			number(id)
			number(score)
			number(index)
			string(name)
			number(color)
			number(barColor)
			...
		}
}
```

## Record
Structure：
```
F {
	number(score)
	number(seconds)
	number(player_kills)
	number(assists)
	number(boss_kills)
	number(killers_length)
	number(killers)
	number(baseCooldown)
	string(???)
}
```

## Kicked
Structure：
```
K {
	string(reason)
}
```

## Message
Structure：
```
m {
	string(content)
}
```

## Pong
Structure：
```
p {
	number(randomUint16)
}
```

## Room
Structure：
```
R {
	(???)
}
```

## Update
Structure：
```
u {
	<player(you)>
		number(camera_x)
		number(camera_y)
		number(camera_fov)
		number(camera_vx)
		number(camera_vy)
		number(updated_flags) {
			0x00000001: {
				number(fps)
			}
			0x00000002: {
				number(body_type)
				number(body_color)
				number(body_id)
			}
			0x00000004: {
				number(score)
			}
			0x00000008: {
				number(points)
			}
			0x00000010: {
				number(tanks) {
					number(index)
					...
				}
			}
			0x00000020: {
				number(???) number(???) number(???)
				number(???) number(???) number(???)
				number(???) number(???) number(???)
				number(???) number(???) number(???)
				number(???) number(???) number(???)
				number(???) number(???) number(???)
				number(???) number(???) number(???)
				number(???) number(???) number(???)
				number(???) number(???) number(???)
				number(???) number(???) number(???)
			}
			0x00000040: {
				const result = parseInt(string(skills_data), 36)
				const skills = [
					(result / 0x1000000000 & 15),
					(result / 0x0100000000 & 15),
					(result / 0x0010000000 & 15),
					(result / 0x0001000000 & 15),
					(result / 0x0000100000 & 15),
					(result / 0x0000010000 & 15),
					(result / 0x0000001000 & 15),
					(result / 0x0000000100 & 15),
					(result / 0x0000000010 & 15),
					(result / 0x0000000001 & 15)
				]
			}
			0x00000080: {
				number(???)
			}
			0x00000100: {
				number(???)
			}
			0x00000200: {
				number(party)
			}
			0x00000400: {
				number(???)
			}
		}
	<entities>
		number(???)
		while (true) {
			number(deleted_id)
			if (deleted_id == -1) break
			...
		}
		while (true) {
			number(updated_id)
			if (updated_id == -1) break
			...
			<parse_entity>
		}
}
```
```
<parse_entity>
	number(updated_flags) {
		0x00000001: {
			const real_x = (number(x) * 0.0625)
			const real_y = (number(y) * 0.0625)
		}
		0x00000002: {
			const real_facing = (number(facing) * (360 / 256))
		}
		0x00000004: {
			number(flags)
		}
		0x00000008: {
			const health_percentage = (number(health) / 255);
		}
		0x00000010: {
			const shield_percentage = (number(shield) / 255);
		}
		0x00000020: {
			const opacity_percentage = (number(opacity) / 255);
		}
		0x00000040: {
			const real_size = (number(size) * 0.0625)
		}
		0x00000080: {
			number(score)
		}
		0x00000100: {
			string(name)
		}
		0x00000200: {
			number(???)
		}
		0x00000400: {
			number(color)
		}
		0x00000800: {
			number(type)
		}
		0x00001000: {
			while (true) {
				number(gun_id)
				if (gun_id == -1) break
				number(gun_flags): {
					0x00000001: {
						number(gun_time)
					}
					0x00000002: {
						number(gun_power)
					}
				}
				...
			}
		}
		0x00002000: {
			while (true) {
				number(turret_id)
				if (turret_id == -1) break
				<parse_entity>
				...
			}
		}
	}
```

## Mockups
Structure:
```
J {
	number(index)
	string(mockup)
	...
}
```

## Spawn Animation
Structure:
```
c {
	number(x)
	number(y)
	number(zoom)
}
```
