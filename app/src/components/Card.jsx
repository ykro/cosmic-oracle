import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Card({ card, isFlipped, onClick, className = "" }) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div
            className={`relative cursor-pointer perspective-1000 ${className || "w-64 h-96"}`}
            onClick={onClick}
        >
            <motion.div
                className="w-full h-full relative preserve-3d transition-transform duration-700"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front (Back of card design) */}
                <div
                    className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden shadow-[0_0_15px_rgba(0,243,255,0.3)] border border-neon-cyan/30 p-1.5 bg-void-black"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <img
                        src="/assets/cards/back.png"
                        alt="Card Back"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>

                {/* Back (Front of card design - Revealed) */}
                <div
                    className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.4)] border border-gold-accent/50 p-1.5 bg-void-black"
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                    }}
                >
                    {!isLoaded && (
                        <div className="absolute inset-0 bg-void-black animate-pulse flex items-center justify-center rounded-lg">
                            <div className="w-12 h-12 border-2 border-neon-cyan rounded-full animate-spin border-t-transparent"></div>
                        </div>
                    )}
                    <img
                        src={card.image}
                        alt={card.title}
                        className={`w-full h-full object-contain rounded-lg transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => setIsLoaded(true)}
                    />
                </div>
            </motion.div>
        </div>
    );
}
