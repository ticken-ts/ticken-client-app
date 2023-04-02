import React, {useState} from 'react';
import {StyleProp, Text, View, ViewStyle} from 'react-native';
import Typography, {H1} from '@app/components/Typography';
import Icon from '@expo/vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { setStringAsync } from 'expo-clipboard';
import Toast from 'react-native-root-toast';
import { t } from '@app/locale/useLocalization';

type Props = {
  style?: StyleProp<ViewStyle>;
  content?: string;
  label: string;
  copiable?: boolean;
};

const Field = ({style, content, label, copiable}: Props) => {

  const copyContent = () => {
    if (content && copiable) {
      setStringAsync(content).then(() => {
        Toast.show(t("clipboard"), {
          duration: Toast.durations.SHORT,
        });
      });
    }
  };

  return (
    <TouchableOpacity 
      disabled={!copiable}
      activeOpacity={copiable ? 0.7 : 1}
      style={style} 
      onPress={copyContent}>
      <H1>{content}</H1>
      <Typography>{label}</Typography>
    </TouchableOpacity>
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
