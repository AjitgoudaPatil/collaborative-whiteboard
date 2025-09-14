import React, { useState, useEffect, useRef } from 'react';
import Whiteboard from './components/Whiteboard';
import Toolbar from './components/Toolbar';
import UserCursor from './components/UserCursor';

const App = () => {
  const [tool, setTool] = useState('pen');
  const [color, setColor] = useState('#F8FAFC');
  const [lineWidth, setLineWidth] = useState(5);
  const [userCursors, setUserCursors] = useState({});
  const myId = useRef('user-' + Math.random().toString(36).substr(2, 9));
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket('ws://localhost:8080');

    socketRef.current.onopen = () => {
      console.log('WebSocket connected');
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'draw') {
        window.dispatchEvent(
          new CustomEvent('remote-draw', { detail: { from: data.from, to: data.to, color: data.color, lineWidth: data.lineWidth, tool: data.tool } })
        );
      } else if (data.type === 'cursor') {
        setUserCursors((prev) => ({
          ...prev,
          [data.id]: { position: data.position, color: data.color },
        }));
      } else if (data.type === 'clear') {
        window.dispatchEvent(new Event('clear-canvas'));
      }
    };

    socketRef.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    socketRef.current.onerror = (err) => {
      console.error('WebSocket error:', err);
    };

    return () => {
      socketRef.current.close();
    };
  }, []);

  const handleMouseMove = (e) => {
    let clientX = e.clientX;
    let clientY = e.clientY;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    if (clientX === undefined || clientY === undefined) return;

    const position = { x: clientX, y: clientY };
    setUserCursors((prev) => ({
      ...prev,
      [myId.current]: { position, color },
    }));

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          type: 'cursor',
          id: myId.current,
          position,
          color,
        })
      );
    }
  };

  const handleClear = () => {
    const event = new Event('clear-canvas');
    window.dispatchEvent(event);
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: 'clear' }));
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      className="app-container"
    >
      {Object.entries(userCursors).map(([id, data]) => (
        <UserCursor
          key={id}
          position={data.position}
          userName={id === myId.current ? 'You' : id}
          color={data.color || '#F97316'}
        />
      ))}
      <Toolbar
        color={color}
        setColor={setColor}
        lineWidth={lineWidth}
        setLineWidth={setLineWidth}
        tool={tool}
        setTool={setTool}
        handleClear={handleClear}
      />
      <Whiteboard color={color} lineWidth={lineWidth} tool={tool} socket={socketRef.current} />
    </div>
  );
};

export default App;