import { motion } from 'framer-motion';
import { Share2, RotateCcw } from 'lucide-react';
import Card from './Card';

export default function ProphecyView({ card, onReset }) {
    const handleShare = async () => {
        const shareData = {
            title: `Cosmic Oracle: ${card.title}`,
            text: `${card.title}\n\n${card.prophecy}\n\nRead your destiny at Cosmic Oracle.`,
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(shareData.text);
                alert('Prophecy copied to clipboard!');
            }
        } catch (err) {
            console.error('Error sharing:', err);
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-start md:justify-center min-h-screen p-4 pt-20 pb-10 md:p-8 gap-8 md:gap-12 max-w-7xl mx-auto">

            {/* Left: The Card */}
            <motion.div
                layoutId={`card-${card.id}`}
                className="relative z-10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <Card
                    card={card}
                    isFlipped={true}
                    className="w-64 h-96 md:w-96 md:h-[36rem]"
                />
                <div className="absolute -inset-4 bg-gold-accent/10 blur-3xl -z-10 rounded-full"></div>
            </motion.div>

            {/* Right: The Prophecy */}
            <div className="flex flex-col max-w-xl space-y-8 text-center md:text-left">
                <motion.h2
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-4xl md:text-5xl text-gold-accent drop-shadow-[0_0_15px_rgba(255,215,0,0.4)]"
                >
                    {card.title}
                </motion.h2>

                <div className="space-y-4 text-lg md:text-xl leading-relaxed text-gray-200 font-light">
                    {card.prophecy.split('\n').map((line, i) => (
                        <motion.p
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 + (i * 0.3), duration: 0.8 }}
                        >
                            {line}
                        </motion.p>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3 }}
                    className="flex gap-4 justify-center md:justify-start pt-8"
                >
                    <button
                        onClick={handleShare}
                        className="flex items-center gap-2 px-6 py-3 rounded-full border border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 transition-colors duration-300 uppercase tracking-wider text-sm"
                    >
                        <Share2 size={18} />
                        Share
                    </button>
                    <button
                        onClick={onReset}
                        className="flex items-center gap-2 px-6 py-3 rounded-full border border-neon-magenta text-neon-magenta hover:bg-neon-magenta/10 transition-colors duration-300 uppercase tracking-wider text-sm"
                    >
                        <RotateCcw size={18} />
                        Reset
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
