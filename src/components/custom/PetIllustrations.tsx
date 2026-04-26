import { motion } from "framer-motion";

export const DogSvg = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <ellipse cx="100" cy="135" rx="55" ry="42" fill="var(--secondary)" />
    {/* Belly */}
    <ellipse cx="100" cy="148" rx="38" ry="28" fill="hsl(0 100% 95%)" />
    {/* Head */}
    <circle cx="100" cy="80" r="48" fill="var(--secondary)" />
    {/* Ears */}
    <ellipse cx="62" cy="55" rx="14" ry="28" fill="var(--secondary-deep)" transform="rotate(-25 62 55)" />
    <ellipse cx="138" cy="55" rx="14" ry="28" fill="var(--secondary-deep)" transform="rotate(25 138 55)" />
    {/* Snout */}
    <ellipse cx="100" cy="95" rx="22" ry="18" fill="hsl(0 100% 95%)" />
    {/* Nose */}
    <ellipse cx="100" cy="85" rx="7" ry="5" fill="hsl(220 35% 18%)" />
    {/* Eyes */}
    <circle cx="82" cy="72" r="5" fill="hsl(220 35% 18%)" />
    <circle cx="118" cy="72" r="5" fill="hsl(220 35% 18%)" />
    <circle cx="83" cy="70" r="2" fill="white" />
    <circle cx="119" cy="70" r="2" fill="white" />
    {/* Mouth */}
    <path d="M 100 92 Q 95 102 88 100" stroke="hsl(220 35% 18%)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M 100 92 Q 105 102 112 100" stroke="hsl(220 35% 18%)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    {/* Cheeks */}
    <circle cx="70" cy="88" r="6" fill="hsl(0 100% 88%)" opacity="0.7" />
    <circle cx="130" cy="88" r="6" fill="hsl(0 100% 88%)" opacity="0.7" />
  </svg>
);

export const CatSvg = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <ellipse cx="100" cy="140" rx="50" ry="38" fill="var(--primary)" />
    {/* Belly */}
    <ellipse cx="100" cy="150" rx="32" ry="22" fill="hsl(199 95% 88%)" />
    {/* Head */}
    <circle cx="100" cy="82" r="45" fill="var(--primary)" />
    {/* Ears */}
    <polygon points="62,55 70,25 88,52" fill="var(--primary)" />
    <polygon points="138,55 130,25 112,52" fill="var(--primary)" />
    <polygon points="68,50 73,32 82,50" fill="hsl(0 100% 88%)" />
    <polygon points="132,50 127,32 118,50" fill="hsl(0 100% 88%)" />
    {/* Eyes */}
    <ellipse cx="82" cy="78" rx="6" ry="9" fill="hsl(220 35% 18%)" />
    <ellipse cx="118" cy="78" rx="6" ry="9" fill="hsl(220 35% 18%)" />
    <circle cx="83" cy="75" r="2" fill="white" />
    <circle cx="119" cy="75" r="2" fill="white" />
    {/* Nose */}
    <path d="M 95 92 L 105 92 L 100 98 Z" fill="hsl(0 80% 75%)" />
    {/* Mouth */}
    <path d="M 100 98 L 100 102" stroke="hsl(220 35% 18%)" strokeWidth="2" strokeLinecap="round" />
    <path d="M 100 102 Q 94 107 88 104" stroke="hsl(220 35% 18%)" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M 100 102 Q 106 107 112 104" stroke="hsl(220 35% 18%)" strokeWidth="2" fill="none" strokeLinecap="round" />
    {/* Whiskers */}
    <line x1="65" y1="92" x2="48" y2="88" stroke="hsl(220 35% 18%)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="65" y1="96" x2="48" y2="98" stroke="hsl(220 35% 18%)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="135" y1="92" x2="152" y2="88" stroke="hsl(220 35% 18%)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="135" y1="96" x2="152" y2="98" stroke="hsl(220 35% 18%)" strokeWidth="1.5" strokeLinecap="round" />
    {/* Cheeks */}
    <circle cx="72" cy="92" r="5" fill="hsl(0 100% 85%)" opacity="0.7" />
    <circle cx="128" cy="92" r="5" fill="hsl(0 100% 85%)" opacity="0.7" />
  </svg>
);

export const PawPrint = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <ellipse cx="50" cy="65" rx="22" ry="18" />
    <ellipse cx="22" cy="42" rx="10" ry="13" />
    <ellipse cx="78" cy="42" rx="10" ry="13" />
    <ellipse cx="35" cy="22" rx="8" ry="11" />
    <ellipse cx="65" cy="22" rx="8" ry="11" />
  </svg>
);

export const HeartPaw = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M50 85 C 20 60, 10 35, 30 25 C 40 20, 50 30, 50 40 C 50 30, 60 20, 70 25 C 90 35, 80 60, 50 85 Z" fill="hsl(var(--destructive))" />
    <ellipse cx="50" cy="55" rx="8" ry="6" fill="white" />
    <ellipse cx="38" cy="45" rx="4" ry="5" fill="white" />
    <ellipse cx="62" cy="45" rx="4" ry="5" fill="white" />
  </svg>
);

export const FloatingPaws = () => {
  const paws = [
    { x: "5%", y: "15%", size: 30, delay: 0, rot: -20 },
    { x: "85%", y: "20%", size: 40, delay: 0.5, rot: 15 },
    { x: "10%", y: "70%", size: 35, delay: 1, rot: 30 },
    { x: "90%", y: "75%", size: 28, delay: 1.5, rot: -25 },
    { x: "50%", y: "10%", size: 22, delay: 2, rot: 10 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {paws.map((p, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/15"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size, transform: `rotate(${p.rot}deg)` }}
          animate={{ y: [0, -15, 0], rotate: [p.rot, p.rot + 10, p.rot] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        >
          <PawPrint className="w-full h-full" />
        </motion.div>
      ))}
    </div>
  );
};