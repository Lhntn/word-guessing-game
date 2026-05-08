import { createContext, useContext, useState, useCallback, useRef } from 'react';

const SoundContext = createContext();

export function useSound() {
  return useContext(SoundContext);
}

export function SoundProvider({ children }) {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('soundEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });
  
  const correctAudio = useRef(new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'));
  const wrongAudio = useRef(new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'));

  const playCorrect = useCallback(() => {
    if (soundEnabled) {
      correctAudio.current.currentTime = 0;
      correctAudio.current.play().catch(e => console.log('Audio play failed:', e));
    }
  }, [soundEnabled]);

  const playWrong = useCallback(() => {
    if (soundEnabled) {
      wrongAudio.current.currentTime = 0;
      wrongAudio.current.play().catch(e => console.log('Audio play failed:', e));
    }
  }, [soundEnabled]);

  const toggleSound = () => {
    setSoundEnabled(prev => {
      localStorage.setItem('soundEnabled', JSON.stringify(!prev));
      return !prev;
    });
  };

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound, playCorrect, playWrong }}>
      {children}
    </SoundContext.Provider>
  );
}