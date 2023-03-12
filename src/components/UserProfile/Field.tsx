import React, {useState} from 'react';
import {StyleProp, Text, View, ViewStyle} from 'react-native';
import Typography, {H1} from '@app/components/Typography';
import Icon from '@expo/vector-icons/FontAwesome';

type Props = {
  style?: StyleProp<ViewStyle>;
  content?: string;
  label: string;
};

const Field = ({style, content, label}: Props) => {
  return (
    <View style={style}>
      <H1>{content}</H1>
      <Typography>{label}</Typography>
    </View>
  );
};

const HiddenField = ({style, content, label}: Props) => {
  const hiddenText = content?.replace(/./g, '*');
  const [hidden, setHidden] = useState(true);

  const toggle = () => {
    setHidden(!hidden);
  };

  return (
    <View style={style}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <H1 style={{flex: 1}} numberOfLines={1} adjustsFontSizeToFit>{hidden ? hiddenText : content}</H1>
        <Icon name={hidden ? "eye" : "eye-slash"} size={20} onPress={toggle} />
      </View>
      <Typography>
        {label}
      </Typography>
    </View>
  );
}

export default {
  Field: Field,
  HiddenField: HiddenField,
};
