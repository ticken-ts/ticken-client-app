import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window')

export function squares(n: number) {
  return n * (width/45)
}
