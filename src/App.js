import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #fce4ec;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  overflow: hidden;
  position: relative;
`;

const MessageBubble = styled(motion.div)`
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  width: 90%;
  margin: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 18px;
  line-height: 1.6;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  z-index: 2;
`;

const Heart = styled(motion.div)`
  width: 20px;
  height: 20px;
  background-color: #ff4081;
  transform: rotate(45deg);
  position: absolute;
  opacity: 0.5;
  z-index: 1;
  
  &::before, &::after {
    content: '';
    width: 20px;
    height: 20px;
    background-color: #ff4081;
    border-radius: 50%;
    position: absolute;
  }
  &::before {
    left: -10px;
  }
  &::after {
    top: -10px;
  }
`;

const ProgressBar = styled.div`
  width: 90%;
  height: 10px;
  background-color: #f8bbd0;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 20px;
  z-index: 2;
`;

const Progress = styled.div`
  height: 100%;
  background-color: #ff4081;
  transition: width 0.5s ease-in-out;
`;

const SwipeInstruction = styled(motion.div)`
  position: absolute;
  bottom: 40px;
  font-size: 16px;
  color: #ff4081;
  z-index: 2;
`;

const EmojiButton = styled(motion.button)`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  margin-top: 10px;
`;

const FinalCard = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ff4081;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 24px;
  text-align: center;
  z-index: 10;
`;

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const heartRefs = useRef([]);

  const messages = [
    "Kuttymaaaaaaaaaaaaaaa, This is something I've been longing to tell you!",
    "Every moment with you feels like magic, like a dream I never want to wake up from.",
    "You bring a joy to my life that I didn't even know I was missing. For Real!",
    "My once ordinary days have transformed into thoughts of you, filling every corner of my mind.",
    "Your smile lights up my world, and your laughter is the sweetest melody I've ever heard.",
    "You inspire me to grow, to dream bigger, and to see the beauty in the little things.",
    "I want to be there for you - in your happiest moments and your challenging ones too.",
    "You make every single moment worthwhile! Your kindness and beautiful soul touch me deeply.",
    "I want to be your safe haven in this crazy world.",
    "Thank you for being the amazing person you are and brightening my world.",
    "And now, for the grand finale..."
  ];

  const emojis = ['💖', '😍', '🥰', '💕', '💓', '💗', '💘', '💝'];

  const nextSection = () => {
    if (currentSection < messages.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      setShowFinal(true);
    }
  };

  const resetMessages = () => {
    setCurrentSection(0);
    setShowFinal(false);
  };

  const handleDragStart = (event) => {
    setDragStart(event.touches[0].clientX);
  };

  const handleDragEnd = (event) => {
    if (dragStart - event.changedTouches[0].clientX > 50) {
      nextSection();
    }
    setDragStart(null);
  };

  const popHeart = (index) => {
    if (heartRefs.current[index]) {
      heartRefs.current[index].style.transform = 'scale(1.5) rotate(45deg)';
      setTimeout(() => {
        if (heartRefs.current[index]) {
          heartRefs.current[index].style.transform = 'scale(1) rotate(45deg)';
        }
      }, 300);
    }
  };

  return (
    <AppContainer>
      {!showFinal ? (
        <>
          <AnimatePresence mode="wait">
            <MessageBubble
              key={currentSection}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onTouchStart={handleDragStart}
              onTouchEnd={handleDragEnd}
            >
              {messages[currentSection]}
              <EmojiButton
                whileTap={{ scale: 1.2 }}
                onClick={() => popHeart(currentSection % 5)}
              >
                {emojis[currentSection % emojis.length]}
              </EmojiButton>
            </MessageBubble>
          </AnimatePresence>
          <ProgressBar>
            <Progress style={{ width: `${((currentSection + 1) / messages.length) * 100}%` }} />
          </ProgressBar>
          <SwipeInstruction
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Swipe left to continue
          </SwipeInstruction>
        </>
      ) : (
        <FinalCard
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: [0, 360] }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            💖 I lou u sooooooo much Shivuuuuuuuuuuuuuuuuuuuuuuu 💖
          </motion.div>
          <EmojiButton
            whileTap={{ scale: 1.2 }}
            onClick={resetMessages}
            style={{ marginTop: 20 }}
          >
            🔄 Start Over
          </EmojiButton>
        </FinalCard>
      )}
      {[...Array(5)].map((_, i) => (
        <Heart
          key={i}
          ref={el => heartRefs.current[i] = el}
          style={{
            top: `${20 + i * 15}%`,
            left: `${10 + i * 20}%`,
          }}
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.1, 1],
            rotate: [45, 60, 45],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </AppContainer>
  );
}

export default App;