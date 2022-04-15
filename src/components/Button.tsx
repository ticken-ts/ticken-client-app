import React from 'react';
import {ButtonProps, Text, View, Button as DefaultButton} from 'react-native';
import {colors} from '../styles/colors';

const Button = (props: ButtonProps) => {
  return (
    <DefaultButton color={colors.primary} {...props}/>
  );
};

export default Button;
