import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DECK_DATA } from './data/deck_data';
import AltarView from './components/AltarView';
import ProphecyView from './components/ProphecyView';

function App() {
  const [gameState, setGameState] = useState('ALTAR'); // ALTAR | REVEAL | PROPHECY
  const [reading, setReading] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  // Initialize reading with 3 random cards
  const drawCards = () => {
    const shuffled = [...DECK_DATA].sort(() => 0.5 - Math.random());
    setReading(shuffled.slice(0, 3));
  };

  useEffect(() => {
    drawCards();
  }, []);

  const handleCardSelect = (card) => {
    setSelectedCard(card);
    setGameState('REVEAL');

    // Simulate reveal animation delay before showing prophecy
    setTimeout(() => {
      setGameState('PROPHECY');
    }, 800);
  };

  const handleReset = () => {
    setGameState('ALTAR');
    setSelectedCard(null);
    // Brief delay to allow exit animation before reshuffling
    setTimeout(() => {
      drawCards();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-void-black text-white relative">
      {/* Background Ambient Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-void-black to-void-black -z-10"></div>
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50"></div>
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-magenta to-transparent opacity-50"></div>

      <AnimatePresence mode="wait">
        {gameState === 'ALTAR' && (
          <motion.div
            key="altar"
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 overflow-y-auto overflow-x-hidden"
          >
            <AltarView reading={reading} onCardSelect={handleCardSelect} />
          </motion.div>
        )}

        {(gameState === 'REVEAL' || gameState === 'PROPHECY') && selectedCard && (
          <motion.div
            key="prophecy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 overflow-y-auto overflow-x-hidden"
          >
            <ProphecyView card={selectedCard} onReset={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
