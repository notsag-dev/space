/**
 * Get the concatenation of the arrays of all letters
 * included in the text passed as parameter.
 *
 */
export function getTextPattern(text) {
    let pattern = [];
    text = text.toLowerCase();
    for (let i = 0; i < text.length; i++) {
        if (text[i] == ' ') {
            pattern = pattern.concat(letters.space);
        } else {
            pattern = pattern.concat(letters[text[i]]);
        }
        pattern = pattern.concat(letters.space);
    }
    return pattern;
}

/**
 * Get the pattern for one line by its correlative number.
 *
 * @param Number[] pattern - The complete pattern (with the six
 *      lines information)
 * @param Number lineNum - The line number to get. The line of
 *      the top is the number 0.
 *
 */
export function getLinePattern(pattern, lineNum) {
    let linePattern = [];
    for (let i = lineNum * 5; i < pattern.length; i += 30) {
        for (let j = i; j <= i + 4; j++) {
            linePattern.push(pattern[j]);
        }
    }
    return linePattern;
}

let letters = {};

letters.space = [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
];

letters.a = [
    1, 1, 1, 1, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 1, 1, 1, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1
];

letters.d = [
    1, 1, 1, 1, 0,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 1, 1, 1, 0,
];

letters.e = [
    1, 1, 1, 1, 1,
    1, 0, 0, 0, 0,
    1, 1, 1, 1, 0,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
    1, 1, 1, 1, 1
];

letters.f = [
    1, 1, 1, 1, 1,
    1, 0, 0, 0, 0,
    1, 1, 1, 1, 0,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0
];

letters.h = [
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 1, 1, 1, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1
];

letters.i = [
    1, 1, 1, 1, 1,
    0, 0, 1, 0, 0,
    0, 0, 1, 0, 0,
    0, 0, 1, 0, 0,
    0, 0, 1, 0, 0,
    1, 1, 1, 1, 1
]

letters.k = [
    1, 0, 0, 0, 1,
    1, 0, 0, 1, 0,
    1, 1, 1, 0, 0,
    1, 0, 0, 1, 0,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1
];

letters.l = [
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
    1, 1, 1, 1, 1
];

letters.m = [
    0, 1, 0, 1, 0,
    1, 0, 1, 0, 1,
    1, 0, 1, 0, 1,
    1, 0, 1, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1
]

letters.n = [
    1, 1, 1, 0, 1,
    1, 0, 1, 0, 1,
    1, 0, 1, 0, 1,
    1, 0, 1, 0, 1,
    1, 0, 1, 0, 1,
    1, 0, 1, 1, 1
];

letters.o = [
    1, 1, 1, 1, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 1, 1, 1, 1
];

letters.p = [
    1, 1, 1, 1, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 1, 1, 1, 1,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
];

letters.r = [
    1, 1, 1, 1, 1,
    1, 0, 0, 0, 1,
    1, 1, 1, 1, 1,
    1, 0, 0, 1, 0,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1
];

letters.s = [
    1, 1, 1, 1, 1,
    1, 0, 0, 0, 0,
    1, 1, 1, 1, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    1, 1, 1, 1, 1
];

letters.t = [
    1, 1, 1, 1, 1,
    0, 0, 1, 0, 0,
    0, 0, 1, 0, 0,
    0, 0, 1, 0, 0,
    0, 0, 1, 0, 0,
    0, 0, 1, 0, 0
];

letters.y = [
    1, 0, 0, 0, 1,
    0, 1, 0, 1, 0,
    0, 0, 1, 0, 0,
    0, 0, 1, 0, 0,
    0, 0, 1, 0, 0,
    0, 0, 1, 0, 0,
];

