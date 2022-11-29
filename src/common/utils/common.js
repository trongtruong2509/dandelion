export const shuffleArray = (array, chosen = null) => {
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

   if (chosen) {
      const idx = array.findIndex((s) => s.id === chosen.id);

      if (idx != -1) {
         array.splice(idx, 1);
         array.unshift(chosen);
      }
   }
};

export const group = (items, n) =>
   items?.reduce((acc, x, i) => {
      const idx = Math.floor(i / n);
      acc[idx] = [...(acc[idx] || []), x];
      return acc;
   }, []);

export function removeAccents(str) {
   return str
      ?.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
}

export const convertTimeToStr = (input) => {
   let minutes = Math.floor(input / 60);
   let seconds = input % 60;

   if (minutes < 10) {
      minutes = `0${minutes}`;
   }

   if (seconds < 10) {
      seconds = `0${seconds}`;
   }

   return `${minutes}:${seconds}`;
};
