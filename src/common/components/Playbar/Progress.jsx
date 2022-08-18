export const Progress = ({ value, onChange, onMouseUp, onTouchEnd }) => {
   return (
      <div className="grid place-items-center w-full">
         <input
            type="range"
            min="1"
            max="100"
            step="0.1"
            value={value}
            className="h-[3px] hover:h-[5px] rounded-md from-teal-500 accent-white to-gray-600 w-full appearance-none cursor-pointer"
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
