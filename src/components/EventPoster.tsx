import React from 'react';
import {Text, View, StyleSheet, ImageProps} from 'react-native';
import Image from '@app/components/Image';

interface Props {
}

const EventPoster: React.FC<Props & ImageProps> = (props) => {
    return (
        <Image
          {...props}
        />
    );
};

export default EventPoster;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
