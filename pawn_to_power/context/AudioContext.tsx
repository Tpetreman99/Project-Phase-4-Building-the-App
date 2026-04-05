import { createContext, useRef, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av"

type AudioContextType = {
  musicEnabled: boolean;
  sfxEnabled: boolean;
  toggleMusic: () => void;
  toggleSfx: () => void;
  playSound: (sound: 'move' | 'capture' | 'check') => void;
};

const AudioContext = createContext<AudioContextType>({
  musicEnabled: false,
  sfxEnabled: false,
  toggleMusic: () => { },
  toggleSfx: () => { },
  playSound: () => { },
});

const BG_MUSIC_FILE = require('../assets/sounds/minecraft_bg.mp3')
const SFX_FILE = require('../assets/sounds/chess_move.mp3')

export function AudioProvider({ children }: { children: React.ReactNode }) {

  const [musicEnabled, setMusicEnabled] = useState(false);
  const [sfxEnabled, setSfxEnabled] = useState(false);

  const bgMusic = useRef<Audio.Sound | null>(null);


  //laod previous music and sound effect state 
  useEffect(() => {
    AsyncStorage.getItem("musicEnabled").then((val) => {
      if (val !== null) setMusicEnabled(val === "true");
    });
    AsyncStorage.getItem('sfxEnabled').then((val) => {
      if (val !== null) setSfxEnabled(val === "true");
    });
  }, []);

  // when musicEnablled changes, this will play or stop the music
  useEffect(() => {
    if (musicEnabled === true) {
      loadAndPlayMusic();
    } else {
      stopAndUnloadMusic();
    }
  }, [musicEnabled]);

  // loads bg music in a loop
  async function loadAndPlayMusic() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/minecraft_bg.mp3'),
      { shouldPlay: true, isLooping: true, volume: 1.0 }
    );
    bgMusic.current = sound;
  };

  // stops the music
  async function stopAndUnloadMusic() {
    await bgMusic.current?.stopAsync();
    await bgMusic.current?.unloadAsync();
    // clear ref
    bgMusic.current = null;
  };


  function toggleMusic() {
    setMusicEnabled((prev) => {
      const next = !prev;
      AsyncStorage.setItem("musicEnabled", String(next));
      return next;
    });
  }

  function toggleSfx() {
    setSfxEnabled((prev) => {
      const next = !prev;
      AsyncStorage.setItem("sfxEnabled", String(next));
      return next;
    })
  }

  async function playSound(sound: 'move' | 'capture' | 'check') {
    if (!sfxEnabled) return;
    const { sound: sfx } = await Audio.Sound.createAsync(
      SFX_FILE,
      { shouldPlay: true, volume: 0.8 }
    );
    sfx.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        sfx.unloadAsync();

      }
    });
  }
  return (
    <AudioContext.Provider value={{ musicEnabled, sfxEnabled, toggleMusic, toggleSfx, playSound }}>
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  return useContext(AudioContext);
}
