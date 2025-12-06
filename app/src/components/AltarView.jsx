import { motion } from 'framer-motion';
import Card from './Card';

export default function AltarView({ reading, onCardSelect }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl text-gold-accent mb-12 text-center drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]"
            >
                Cosmic Oracle
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-neon-cyan mb-16 text-lg tracking-widest uppercase"
            >
                Pick your destiny
            </motion.p>

            <div className="flex flex-row gap-3 md:gap-12 items-center justify-center">
                {reading.map((card, index) => (
                    <motion.div
                        key={card.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 + 0.5 }}
                        whileHover={{
                            scale: 1.05,
                            y: -10,
                            filter: "drop-shadow(0 0 20px rgba(0, 243, 255, 0.6))"
                        }}
                        className="relative group"
                    >
                        <Card
                            card={card}
                            isFlipped={false}
                            className="w-20 h-32 md:w-64 md:h-96"
                            onClick={() => onCardSelect(card)}
                        />

                        {/* Hover Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan to-neon-magenta rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500 group-hover:duration-200 pointer-events-none"></div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
