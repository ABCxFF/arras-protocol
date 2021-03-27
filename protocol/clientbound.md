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
b
	<global_minimap>
		number(deleted entities)
			number(id)
			...
		number(updated entities)
			number(id)
			number(type)
			number(x)
			number(y)
			number(color)
			number(size)
			...
	<team_minimap>
		number(deleted entities)
			number(id)
			...
		number(updated entities)
			number(id)
			number(x)
			number(y)
			number(size)
			...
	<scoreboard>
		number(deleted entities)
			number(id)
			...
		number(updated entities)
			number(id)
			number(score)
			number(index)
			string(name)
			number(color)
			number(barColor)
			...
```

## Record
Structure：
```
F
	(???)
```

## Kicked
Structure：
```
K
	string(reason)
```

## Message
Structure：
```
m
	string(content)
```

## Pong
Structure：
```
p
```

## Room
Structure：
```
R
```

## Update
Structure：
```
u

```
