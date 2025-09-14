import { useEffect, useRef } from 'react';

export const useWhiteboardDraw = (canvasRef, color, lineWidth, tool) => {
  const isDrawingRef = useRef(false);
  const contextRef = useRef(null);
  const lastPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      if (canvas.width > 0 && canvas.height > 0) {
        tempCtx.drawImage(canvas, 0, 0);
      }

      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;

      const ctx = canvas.getContext('2d');
      contextRef.current = ctx;

      if (contextRef.current) {
        contextRef.current.lineCap = 'round';
        contextRef.current.lineJoin = 'round';
        contextRef.current.drawImage(tempCanvas, 0, 0);
      }
    };

    contextRef.current = canvas.getContext('2d');
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [canvasRef]);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = tool === 'eraser' ? '#1a1a1a' : color;
      contextRef.current.lineWidth = lineWidth;
      contextRef.current.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over';
    }
  }, [color, lineWidth, tool]);

  const getEventPosition = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches && e.touches[0] ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e) => {
    isDrawingRef.current = true;
    const pos = getEventPosition(e);
    contextRef.current.beginPath();
    contextRef.current.moveTo(pos.x, pos.y);
    contextRef.current.lineTo(pos.x, pos.y);
    contextRef.current.stroke();
    lastPositionRef.current = pos;
  };

  const draw = (e) => {
    if (!isDrawingRef.current) return;
    e.preventDefault();
    const pos = getEventPosition(e);
    contextRef.current.beginPath();
    contextRef.current.moveTo(lastPositionRef.current.x, lastPositionRef.current.y);
    contextRef.current.lineTo(pos.x, pos.y);
    contextRef.current.stroke();
    lastPositionRef.current = pos;
  };

  const stopDrawing = () => {
    if (!isDrawingRef.current) return;
    contextRef.current.closePath();
    isDrawingRef.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas && contextRef.current) {
      contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  useEffect(() => {
    window.addEventListener('clear-canvas', clearCanvas);
    return () => {
      window.removeEventListener('clear-canvas', clearCanvas);
    };
  }, []);

  return {
    startDrawing,
    draw,
    stopDrawing,
  };
};
