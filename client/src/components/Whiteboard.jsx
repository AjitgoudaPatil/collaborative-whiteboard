import React, { useRef, useEffect, useState } from 'react';

const Whiteboard = ({ color, lineWidth, tool, socket }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      ctx.fillStyle = '#1E293B';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Listen for remote drawing events
    const handleRemoteDraw = (event) => {
      const { from, to, color: drawColor, lineWidth: drawWidth, tool: drawTool } = event.detail;
      drawLine(from, to, drawColor, drawWidth, drawTool);
    };

    const handleClearCanvas = () => {
      ctx.fillStyle = '#1E293B';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('remote-draw', handleRemoteDraw);
    window.addEventListener('clear-canvas', handleClearCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('remote-draw', handleRemoteDraw);
      window.removeEventListener('clear-canvas', handleClearCanvas);
    };
  }, []);

  const drawLine = (from, to, drawColor, drawWidth, drawTool) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    ctx.globalCompositeOperation = drawTool === 'eraser' ? 'destination-out' : 'source-over';
    ctx.strokeStyle = drawTool === 'eraser' ? '#000000' : drawColor;
    ctx.lineWidth = drawWidth;
    
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  };

  const getMousePos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const getTouchPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    const pos = e.touches ? getTouchPos(e) : getMousePos(e);
    setLastPos(pos);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const currentPos = e.touches ? getTouchPos(e) : getMousePos(e);
    
    // Draw locally
    drawLine(lastPos, currentPos, color, lineWidth, tool);
    
    // Send to other users
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        type: 'draw',
        from: lastPos,
        to: currentPos,
        color,
        lineWidth,
        tool
      }));
    }
    
    setLastPos(currentPos);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      className="whiteboard-canvas"
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
      style={{
        width: '100%',
        height: '100vh',
        display: 'block',
        cursor: tool === 'eraser' ? 'crosshair' : 'crosshair'
      }}
    />
  );
};

export default Whiteboard;