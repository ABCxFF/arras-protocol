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
	(???)
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

		number(updated_flag) {
			0x00000001:
				number(fps)
			0x00000002:
				number(body_type)
				number(body_color)
				number(body_id)
			0x00000004:
				number(score)
			0x00000008:
				number(points)
			0x00000010:
				number(tanks)
					number(index)
					...
			0x00000020:
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
			0x00000040:
				const result = parseInt(string(skills_data), 36)
				skills = [
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
			0x00000080:
				number(???)
			0x00000100:
				number(???)
			0x00000200:
				number(party)
			0x00000400:
				number(???)
		}
	<entities>
	
}
```
