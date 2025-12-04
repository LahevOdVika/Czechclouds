import React, { useState, useEffect } from "react";

const paths = [
  { d: "M-100,100 C300,50 700,150 1100,100", opacity: 0.2 },
  { d: "M-100,200 C400,250 600,150 1100,200", opacity: 0.2 },
  { d: "M-100,300 C350,350 650,250 1100,300", opacity: 0.3 },
  { d: "M-100,400 C250,350 750,450 1100,400", opacity: 0.25 },
  { d: "M-100,500 C400,550 600,450 1100,500", opacity: 0.2 },
  { d: "M-100,550 C300,500 700,600 1100,550", opacity: 0.15 },
];

const NUM_PACKETS = 10;

interface Packet {
  pathIndex: number;
  duration: number;
  begin: number;
  radius: number;
}

const NetworkBackground: React.FC = () => {
  const [packets, setPackets] = useState<Packet[]>([]);

  useEffect(() => {
    const newPackets = Array.from({ length: NUM_PACKETS }).map((_) => {
      const pathIndex = Math.floor(Math.random() * paths.length);
      const duration = 20 + Math.random() * 20; // 20 s to 40 s
      const begin = -(Math.random() * duration); // Start at a random point in the animation
      const radius = Math.random() * 1.5 + 1;

      return {
        pathIndex,
        duration,
        begin,
        radius,
      };
    });

    setPackets(newPackets);
  }, []);

  return (
    <svg
      className="fixed inset-0 w-full h-full opacity-70 z-[-1]"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1000 600"
    >
      <g fill="none" stroke="#22c55e" strokeWidth="1">
        {paths.map((path, i) => (
          <path key={i} d={path.d} opacity={path.opacity} />
        ))}
      </g>
      <g fill="#86efac">
        {packets.map((packet, i) => (
          <circle key={i} r={packet.radius}>
            <animateMotion
              begin={`${packet.begin}s`}
              dur={`${packet.duration}s`}
              path={paths[packet.pathIndex].d}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>
    </svg>
  );
};

export default NetworkBackground;
