import { createContext, useRef, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Audio} from "expo-av"
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
  toggleMusic: () => {},
  toggleSfx: () => {},
  playSound: () => {},
 });

export function AudioProvider({ children}: {children: React.ReactNode}) {

  const [musicEnabled, setMusicEnabled] = useState(false);
  const [sfxEnabled, setSfxEnabled] = useState(false);

  const bgMusic = useRef<Audio.Sound | null>(null);


  //laod previous sound effect state 
  useEffect(() => {
    AsyncStorage.getItem("musicEnabled").then((val) => {
      if (val !== null) setMusicEnabled(val === "true");
    });
    AsyncStorage.getItem('sfxEnabled').then((val) => {
      if (val !== null) setSfxEnabled(val === "true");
    });
  }, []);
}

