// A snippet (aka bookmarklet, aka paste to console) to add functionality to fontdrop.info
// whereby you shift+click characters and the apropriate glyphhanger command
// to subset a font to only the selected characters is generated.
// Shift+click the same character removes it from the list, an undo so to speak

(() => {
  const GLYPHS = new Set();
  document.getElementById('glyph-list-end').addEventListener('click', (e) => {
    if (e.shiftKey) {
      e.stopPropagation();
      const uni = e.target.parentElement.textContent
        .split('Unicode:')[1]
        .trim();
      if (!parseInt(uni, 16)) {
        return;
      }
      if (GLYPHS.has(uni)) {
        GLYPHS.delete(uni);
      } else {
        GLYPHS.add(uni);
      }
      const sorted = Array.from(GLYPHS).sort();
      console.log(sorted);
      if (sorted.length) {
        const file = document.getElementById('message').innerText;
        console.log(
          `glyphhanger --format=woff2 --subset="${file}" --whitelist="U+${sorted.join(
            ',U+',
          )}"`,
        );
      }
    }
  });
})();  
