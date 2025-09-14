import React from 'react';

const Toolbar = ({ color, setColor, lineWidth, setLineWidth, tool, setTool, handleClear }) => {
  const colors = [
    '#F8FAFC', '#EF4444', '#F97316', '#F59E0B', 
    '#EAB308', '#84CC16', '#22C55E', '#10B981',
    '#06B6D4', '#3B82F6', '#6366F1', '#8B5CF6',
    '#A855F7', '#D946EF', '#EC4899', '#F43F5E'
  ];

  return (
    <div className="toolbar">
      <div className="toolbar-section">
        <h3>Tools</h3>
        <div className="tool-buttons">
          <button
            className={`tool-btn ${tool === 'pen' ? 'active' : ''}`}
            onClick={() => setTool('pen')}
            title="Pen Tool"
          >
            ✏️ Pen
          </button>
          <button
            className={`tool-btn ${tool === 'eraser' ? 'active' : ''}`}
            onClick={() => setTool('eraser')}
            title="Eraser Tool"
          >
            🧽 Eraser
          </button>
        </div>
      </div>

      <div className="toolbar-section">
        <h3>Colors</h3>
        <div className="color-picker">
          {colors.map((colorOption) => (
            <button
              key={colorOption}
              className={`color-btn ${color === colorOption ? 'selected' : ''}`}
              style={{ backgroundColor: colorOption }}
              onClick={() => setColor(colorOption)}
              title={`Color: ${colorOption}`}
            />
          ))}
        </div>
        <div className="custom-color">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="color-input"
            title="Custom Color"
          />
        </div>
      </div>

      <div className="toolbar-section">
        <h3>Brush Size</h3>
        <div className="size-control">
          <input
            type="range"
            min="1"
            max="50"
            value={lineWidth}
            onChange={(e) => setLineWidth(parseInt(e.target.value))}
            className="size-slider"
            title="Brush Size"
          />
          <span className="size-display">{lineWidth}px</span>
        </div>
        <div className="size-preview">
          <div
            className="size-circle"
            style={{
              width: lineWidth,
              height: lineWidth,
              backgroundColor: color,
              borderRadius: '50%'
            }}
          />
        </div>
      </div>

      <div className="toolbar-section">
        <h3>Actions</h3>
        <button
          className="clear-btn"
          onClick={handleClear}
          title="Clear Canvas"
        >
          🗑️ Clear All
        </button>
      </div>
    </div>
  );
};

export default Toolbar;