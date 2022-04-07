import React from 'react';
import {Image as DefaultImage, ImageProps, View, StyleSheet} from 'react-native';

const Image = (props: ImageProps) => {
  return (
    <View style={[props.style]}>
      <DefaultImage {...props} style={styles.image}/>
    </View>
  );
};

export default Image;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  }
})
