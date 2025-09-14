import React from 'react';

const ColorPicker = ({ color, setColor }) => {
  const colors = ['#EF4444', '#F97316', '#F59E0B', '#84CC16', '#22C55E', '#14B8A6', '#06B6D4', '#3B82F6', '#8B5CF6', '#EC4899', '#F8FAFC', '#1A1A1A'];

  return (
    <div className="color-picker">
      {colors.map((c) => (
        <button
          key={c}
          onClick={() => setColor(c)}
          className={`color-button ${color === c ? 'active' : ''}`}
          style={{ backgroundColor: c }}
          title={c}
        />
      ))}
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="custom-color"
        title="Custom Color"
      />
    </div>
  );
};

export default ColorPicker;