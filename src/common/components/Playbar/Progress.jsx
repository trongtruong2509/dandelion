export const Progress = ({ value, onChange, onMouseUp, onTouchEnd }) => {
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
               onChange(e);
               e.stopPropagation();
            }}
            onMouseUp={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
            style={{
               background: `linear-gradient(90deg, var(--dandelion) ${Math.floor(
                  value
               )}%, var(--progressbar-bg) ${Math.floor(value)}%)`,
            }}
         />
      </div>
   );
};
