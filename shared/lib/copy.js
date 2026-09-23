/* Small helpers so counts in labels ("3 apps · one live") follow the data. */
const WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
export const word = (n) => WORDS[n] ?? String(n);
export const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;
