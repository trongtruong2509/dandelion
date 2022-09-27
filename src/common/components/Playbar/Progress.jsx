export const Progress = ({ value, onChange, onMouseUp, onTouchEnd }) => {
   return (
      <div className="grid w-full h-full place-items-center progress-wrapper">
         <input
            type="range"
            min="1"
            max="100"
            step="1"
            value={value}
            className="w-full rounded-md appearance-none cursor-pointer from-teal-500 to-gray-600 progress"
            id="myRange"
            onChange={onChange}
            onMouseUp={onMouseUp}
            onTouchEnd={onTouchEnd}
            style={{
               background: `linear-gradient(90deg, var(--tw-gradient-from) ${Math.floor(
                  value
               )}%, var(--tw-gradient-to) ${Math.floor(value)}%)`,
            }}
         />
      </div>
   );
};
