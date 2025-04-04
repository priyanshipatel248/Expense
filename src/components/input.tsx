import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {color} from '../utils/theme';

interface InputProps {
  value: string;
  onChangeText: (params: any) => void;
  placeholder: string;
  inputStyle?:any
}
const Input = (props: InputProps) => {
  const {value, placeholder, onChangeText,inputStyle} = props;
  return (
    <TextInput
      style={[styles.input,inputStyle]}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    padding: 20,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: color.black,
    marginVertical: 7,
    marginHorizontal: 25,
  },
});
