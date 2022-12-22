export const Progress = ({ value, onChange, onMouseUp, onTouchEnd, readyState }) => {
   return (
      <div className="grid w-full h-full place-items-center progress-wrapper" onClick={(e) => e.stopPropagation()}>
         <input
            type="range"
            min="1"
            max="100"
            step="1"
            value={value}
            className="w-full rounded-md appearance-none cursor-pointer progress"
            id="myRange"
            onChange={(e) => {
               e.stopPropagation();
               if (readyState) {
                  onChange(e);
               }
            }}
            onMouseUp={(e) => {
               e.stopPropagation();
               if (readyState && onMouseUp) {
                  onMouseUp();
               }
            }}
            onTouchEnd={(e) => {
               e.stopPropagation();
               if (readyState && onTouchEnd) {
                  onTouchEnd();
               }
            }}
            style={{
               background: `linear-gradient(90deg, var(--dandelion) ${Math.floor(
                  value
               )}%, var(--progressbar-bg) ${Math.floor(value)}%)`,
            }}
         />
      </div>
   );
};
