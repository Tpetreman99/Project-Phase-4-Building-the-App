import {StyleSheet} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import { PropsWithChildren } from 'react';

export default function GradientBackground({ children}: PropsWithChildren) {
  return (
    <LinearGradient
      colors={[
        // colour gradient changing
        'rgba(44, 194, 149, 0.5)',
        'rgba(3, 82, 76, 0.75)',
        'rgba(5, 24, 36, 0.5)']}
        
        // colour gradient position
        locations={[0, 0.3, 0.84]}
        start={{ x: 0, y: 0}}
        end={{x: 1, y:2.5}}
        style={s.container}>
          {children}
    </LinearGradient>
  );
}

const s = StyleSheet.create({

  container: {
    flex: 1,
  }
})