import React, { useState } from 'react';
import { FaTimes, FaPlus } from 'react-icons/fa';

interface ColorManagerProps {
  availableColors: any;
  setAvailableColors: any;
}

const ColorManager: React.FC<ColorManagerProps> = ({ availableColors, setAvailableColors }) => {
  const [newColor, setNewColor] = useState<string>('');

  const handleAddColor = () => {
    setAvailableColors((prev:any)=>{
        return [...prev,newColor]
    })
    setNewColor("")
  };

  const handleRemoveColor = (colorToRemove: string) => {
    setAvailableColors((prev:any)=>prev.filter((c:any)=>c!==colorToRemove))
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
      <h3 className="font-bold text-lg">Available Colors</h3>
      
      {/* Current Colors Display */}
      <div className="flex flex-wrap gap-2">
        {availableColors?.map((color:any,i:number) => (
          <div 
            key={i} 
            className="relative px-3 py-1 rounded-full flex items-center"
            style={{ backgroundColor: color }}
          >
            <span className="text-white mix-blend-difference capitalize">{color}</span>
            <button
              type="button"
              onClick={() => handleRemoveColor(color)}
              className="ml-2 text-white hover:text-red-300 transition"
              title="Remove color"
            >
              <FaTimes className="text-xs" />
            </button>
          </div>
        ))}
      </div>

      {/* Add New Color */}
      <div className="mt-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter available color names"
            onKeyDown={(e) => e.key === 'Enter' && handleAddColor()}
          />
          <button
            type="button"
            onClick={handleAddColor}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1 transition"
          >
            <FaPlus /> Add
          </button>
        </div>
      </div>

      {/* Help Text */}
      <p className="text-sm text-gray-500">
        Tip: Enter color names (e.g., "red")
      </p>
    </div>
  );
};

export default ColorManager;