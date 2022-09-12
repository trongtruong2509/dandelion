export const shuffleArray = (array) => {
   var m = array.length,
      t,
      i;

   // While there remain elements to shuffle…
   while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
   }
};

export const group = (items, n) =>
   items.reduce((acc, x, i) => {
      const idx = Math.floor(i / n);
      acc[idx] = [...(acc[idx] || []), x];
      return acc;
   }, []);
