import React from 'react';

const UserCursor = ({ position, userName, color }) => {
  if (!position) return null;

  // Generate a unique ID for this cursor for animations
  const cursorId = `cursor-${userName.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <>
      {/* Add CSS styles dynamically */}
      <style jsx>{`
        .sexy-user-cursor {
          position: absolute;
          pointer-events: none;
          z-index: 1000;
          transform: translate(-50%, -50%);
          transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4));
        }

        .cursor-main {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .cursor-dot {
          position: relative;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: ${color};
          border: 3px solid rgba(255, 255, 255, 0.9);
          box-shadow: 
            0 0 0 2px rgba(0, 0, 0, 0.1),
            0 4px 12px rgba(0, 0, 0, 0.3),
            0 0 20px ${color}40;
          animation: cursorPulse 2s ease-in-out infinite;
          backdrop-filter: blur(1px);
        }

        .cursor-dot::before {
          content: '';
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            ${color}30 0%,
            ${color}20 30%,
            transparent 70%
          );
          animation: ripple 2s ease-out infinite;
        }

        .cursor-dot::after {
          content: '';
          position: absolute;
          inset: 2px;
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.4) 0%,
            transparent 50%,
            rgba(0, 0, 0, 0.1) 100%
          );
          animation: shine 3s ease-in-out infinite;
        }

        .cursor-trail {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            ${color}60,
            transparent 90deg,
            ${color}40 180deg,
            transparent 270deg,
            ${color}60 360deg
          );
          animation: rotate 4s linear infinite;
          opacity: 0.6;
        }

        .cursor-label {
          position: relative;
          margin-top: 12px;
          padding: 8px 14px;
          background: linear-gradient(
            135deg,
            ${color}f0,
            ${color}e0
          );
          color: white;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          white-space: nowrap;
          text-align: center;
          letter-spacing: 0.3px;
          box-shadow: 
            0 4px 14px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          animation: labelFloat 3s ease-in-out infinite;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }

        .cursor-label::before {
          content: '';
          position: absolute;
          top: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-bottom: 6px solid ${color}f0;
          filter: drop-shadow(0 -2px 4px rgba(0, 0, 0, 0.1));
        }

        .cursor-label::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 12px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          opacity: 0;
          animation: shimmer 2s ease-in-out infinite;
        }

        .cursor-glow {
          position: absolute;
          inset: -20px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            ${color}20 0%,
            ${color}10 40%,
            transparent 70%
          );
          animation: breathe 4s ease-in-out infinite;
        }

        .cursor-particles {
          position: absolute;
          inset: -30px;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: ${color};
          border-radius: 50%;
          opacity: 0;
        }

        .particle:nth-child(1) {
          top: 20%;
          left: 80%;
          animation: particle1 3s ease-in-out infinite;
        }

        .particle:nth-child(2) {
          top: 60%;
          left: 20%;
          animation: particle2 3.5s ease-in-out infinite;
        }

        .particle:nth-child(3) {
          top: 80%;
          left: 60%;
          animation: particle3 2.5s ease-in-out infinite;
        }

        @keyframes cursorPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 
              0 0 0 2px rgba(0, 0, 0, 0.1),
              0 4px 12px rgba(0, 0, 0, 0.3),
              0 0 20px ${color}40;
          }
          50% {
            transform: scale(1.1);
            box-shadow: 
              0 0 0 2px rgba(0, 0, 0, 0.1),
              0 6px 16px rgba(0, 0, 0, 0.4),
              0 0 30px ${color}60;
          }
        }

        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 0.8;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }

        @keyframes shine {
          0%, 100% {
            opacity: 0.3;
            transform: rotate(0deg);
          }
          50% {
            opacity: 0.6;
            transform: rotate(180deg);
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes labelFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        @keyframes shimmer {
          0% {
            opacity: 0;
            transform: translateX(-100%);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateX(100%);
          }
        }

        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.2;
          }
        }

        @keyframes particle1 {
          0%, 100% {
            opacity: 0;
            transform: translateY(0px) scale(0);
          }
          33% {
            opacity: 0.8;
            transform: translateY(-10px) scale(1);
          }
          66% {
            opacity: 0.4;
            transform: translateY(-5px) scale(0.5);
          }
        }

        @keyframes particle2 {
          0%, 100% {
            opacity: 0;
            transform: translateX(0px) scale(0);
          }
          40% {
            opacity: 0.6;
            transform: translateX(8px) scale(1);
          }
          80% {
            opacity: 0.2;
            transform: translateX(4px) scale(0.3);
          }
        }

        @keyframes particle3 {
          0%, 100% {
            opacity: 0;
            transform: translate(0px, 0px) scale(0);
          }
          50% {
            opacity: 0.7;
            transform: translate(-6px, -8px) scale(1);
          }
        }

        /* Hover effect when cursor is active */
        .sexy-user-cursor:hover .cursor-dot {
          animation: cursorPulse 1s ease-in-out infinite;
        }

        /* Different cursor styles for different users */
        .cursor-style-diamond .cursor-dot {
          border-radius: 4px;
          transform: rotate(45deg);
        }

        .cursor-style-star .cursor-dot {
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
          border-radius: 0;
        }

        .cursor-style-heart .cursor-dot {
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          transform: rotate(-45deg);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .cursor-dot {
            width: 20px;
            height: 20px;
          }
          
          .cursor-label {
            font-size: 14px;
            padding: 10px 16px;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .cursor-dot,
          .cursor-dot::before,
          .cursor-dot::after,
          .cursor-trail,
          .cursor-label,
          .cursor-glow,
          .particle {
            animation: none !important;
          }
        }
      `}</style>

      <div
        className={`sexy-user-cursor ${getCursorStyle(userName)}`}
        style={{
          left: position.x,
          top: position.y,
        }}
      >
        <div className="cursor-main">
          <div className="cursor-glow" />
          <div className="cursor-trail" />
          
          <div className="cursor-dot" />
          
          <div className="cursor-particles">
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
          </div>
          
          <div className="cursor-label">
            {formatUserName(userName)}
          </div>
        </div>
      </div>
    </>
  );
};

// Helper function to get different cursor styles for different users
const getCursorStyle = (userName) => {
  const hash = userName.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const styles = ['', 'cursor-style-diamond', 'cursor-style-star', 'cursor-style-heart'];
  return styles[Math.abs(hash) % styles.length];
};

// Helper function to format user names nicely
const formatUserName = (userName) => {
  if (userName === 'You') return '✨ You';
  if (userName.startsWith('user-')) return `👤 ${userName.slice(5, 8).toUpperCase()}`;
  return userName.length > 12 ? `${userName.slice(0, 12)}...` : userName;
};

export default UserCursor;