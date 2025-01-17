import React from 'react';
import { motion } from 'framer-motion';

const GlassBackground: React.FC = () => {
    const lines = Array.from({ length: 10 }, (_, i) => i);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {lines.map((_, index) => (
                <motion.div
                    key={index}
                    className="absolute w-[100%] h-[2px] bg-gradient-to-b from-transparent via-gray-950 to-transparent opacity-20"
                    style={{
                        left: `0%`,
                        top: `${index * 10}%`,
                    }}
                    initial={{ y: '100%' }}
                    animate={{ y: '100%' }}
                    transition={{
                        duration: 15 + index * 2,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            ))}
        </div>
    );
};

export default GlassBackground;

