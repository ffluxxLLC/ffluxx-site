/* Lets data files carry a little emphasis without writing JSX:
   "Websites from **$1,400**" → Websites from <b>$1,400</b>.
   `bold` picks the tag ('b' or 'strong') — the CSS styles them differently. */
export function Rich({ text, bold = 'b' }) {
  const Tag = bold;
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 ? <Tag key={i}>{part}</Tag> : part);
}
