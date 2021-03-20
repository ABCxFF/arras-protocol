// input
const keyInput = {
	NONE: 0x00000000,
	UP: 0x00000001,
	DOWN: 0x00000002,
	LEFT: 0x00000004,
	RIGHT: 0x00000008,
	LEFT_MOUSE: 0x00000010,
	CENTER_MOUSE: 0x00000020,
	RIGHT_MOUSE: 0x00000040
};
const keyInputEx = {
	AUTO_FIRE: 0x00000000,
	AUTO_SPIN: 0x00000001,
	UNKNOWN_3: 0x00000002,
	UNKNOWN_4: 0x00000003,
	UNKNOWN_5: 0x00000004
};

// entity
const entityType = {
	BULLET: 0,
	PLAYER: 5,
	SHAPE: 10
};
const entityFlag = {
	BASIC: 0x00000004, // ?
	INVINCIBLE: 0x00000008
};
const entityColor = {
	TRIANGLE: 2,
	EGG: 6,
	BLUE: 10,
	GREEN: 11,
	RED: 12,
	SQUARE: 13,
	PENTAGON: 14,
	PURPLE: 15
};
