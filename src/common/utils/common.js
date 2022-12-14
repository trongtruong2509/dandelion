export const getBreakpoints = (size) => {
   switch (size) {
      case "sm":
         return playlistBreakpointsSmall;
      case "lg":
         return null; //TODO:
      case "md":
      default:
         return playlistBreakpoints;
   }
};

export const playlistBreakpointsSmall = {
   640: {
      slidesPerView: 4,
      spaceBetween: 20,
   },
   768: {
      slidesPerView: 4,
      spaceBetween: 30,
   },
   1024: {
      slidesPerView: 5,
      spaceBetween: 30,
   },
   1440: {
      slidesPerView: 6,
      spaceBetween: 30,
   },
   1600: {
      slidesPerView: 6,
      spaceBetween: 28,
   },
   1850: {
      slidesPerView: 7,
      spaceBetween: 24,
   },
};

export const playlistBreakpoints = {
   640: {
      slidesPerView: 2,
      spaceBetween: 20,
   },
   // 768: {
   //    slidesPerView: 2,
   //    spaceBetween: 20,
   // },
   768: {
      slidesPerView: 3,
      spaceBetween: 30,
   },
   1024: {
      slidesPerView: 4,
      spaceBetween: 30,
   },
   1440: {
      slidesPerView: 5,
      spaceBetween: 30,
   },
   1600: {
      slidesPerView: 4,
      spaceBetween: 28,
   },
   1850: {
      slidesPerView: 5,
      spaceBetween: 24,
   },
};

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

      if (idx !== -1) {
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

export const convertTimeToStr = (input, truncate = false) => {
   let hour = Math.floor(input / 3600);
   let minutes = Math.floor((input % 3600) / 60);
   let seconds = input % 60;

   if (minutes < 10) {
      minutes = `0${minutes}`;
   }

   if (seconds < 10) {
      seconds = `0${seconds}`;
   }

   let output = `${minutes}:${seconds}`;

   if (truncate) {
      if (hour) {
         output = `${hour}h ${Math.ceil((input % 3600) / 60)} mins`;
      } else {
         output = `${Math.ceil((input % 3600) / 60)} mins`;
      }
   }

   return output;
};

export const convertStrToTime = (time) => {
   const times = time.split(":");

   const seconds = parseInt(times[1]);
   const minutes = parseInt(times[0]) * 60;
   // let hour = 0;

   // if (times.length === 2) {
   //    hour = parseInt(times[1]) * 3600;
   // }

   return seconds + minutes;
};
