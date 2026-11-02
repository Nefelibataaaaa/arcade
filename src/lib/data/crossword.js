export const CROSSWORD_SIZE = 6;

// A 6x6 double word square. The top-left square is blocked, which turns the
// leading W of WASHES into the equally valid ASHES.
// Source: "Answer to Word Square", The Sun (Auckland), 18 June 1927, p. 26,
// digitised by Papers Past, National Library of New Zealand.
export const SOLUTION = [
	'#ASHES',
	'ARTERY',
	'STORMS',
	'HERMIT',
	'ERMINE',
	'SYSTEM'
];

export const ACROSS_CLUES = [
	{ number: 1, text: 'What remains in the grate after a fire dies', length: 5 },
	{ number: 6, text: 'Vessel that carries blood away from the heart', length: 6 },
	{ number: 7, text: 'Violent weather systems with wind and rain', length: 6 },
	{ number: 8, text: 'Person who lives alone, apart from others', length: 6 },
	{ number: 9, text: 'Stoat in white winter fur, once used to trim royal robes', length: 6 },
	{ number: 10, text: 'Organized set of connected parts working together', length: 6 }
];

export const DOWN_CLUES = [
	{ number: 1, text: 'Major blood vessel that branches off the aorta', length: 6 },
	{ number: 2, text: 'Blows angrily, as out of a room', length: 6 },
	{ number: 3, text: 'Monk who lives apart from the community', length: 6 },
	{ number: 4, text: 'White winter coat of a weasel family member', length: 6 },
	{ number: 5, text: 'Method or procedure; the “solar” one includes the planets', length: 6 },
	{ number: 6, text: 'What a campfire leaves behind; also a famous cricket trophy', length: 5 }
];

const ACROSS_BY_ROW = [1, 6, 7, 8, 9, 10];
const DOWN_BY_COL = [6, 1, 2, 3, 4, 5];

/** @type {Record<string, number>} */
const START_NUMBERS = {
	'0,1': 1,
	'0,2': 2,
	'0,3': 3,
	'0,4': 4,
	'0,5': 5,
	'1,0': 6,
	'2,0': 7,
	'3,0': 8,
	'4,0': 9,
	'5,0': 10
};

const acrossByNumber = new Map(ACROSS_CLUES.map((clue) => [clue.number, clue]));
const downByNumber = new Map(DOWN_CLUES.map((clue) => [clue.number, clue]));

export const CELLS = [];
export const TOTAL_LETTERS = SOLUTION.reduce(
	(count, row) => count + row.replaceAll('#', '').length,
	0
);

for (let row = 0; row < CROSSWORD_SIZE; row += 1) {
	for (let col = 0; col < CROSSWORD_SIZE; col += 1) {
		const solution = SOLUTION[row][col];
		const blocked = solution === '#';
		const acrossNumber = ACROSS_BY_ROW[row];
		const downNumber = DOWN_BY_COL[col];
		const across = acrossByNumber.get(acrossNumber);
		const down = downByNumber.get(downNumber);

		CELLS.push({
			index: row * CROSSWORD_SIZE + col,
			row,
			col,
			blocked,
			number: START_NUMBERS[`${row},${col}`] ?? null,
			solution,
			acrossClue: across,
			downClue: down,
			label: blocked
				? 'Blocked square'
				: `Row ${row + 1}, Column ${col + 1}, ${acrossNumber} Across and ${downNumber} Down`
		});
	}
}

/**
 * Rows of the finished puzzle for the reveal panel.
 */
export const SOLUTION_ROWS = SOLUTION.map((row, index) => ({
	rowNumber: index + 1,
	clueNumber: ACROSS_BY_ROW[index],
	letters: row.split('')
}));
