import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import Header from '../components/header';
import {color} from '../utils/theme';
import Input from '../components/input';
import { useNavigation } from '@react-navigation/native';

const Income = () => {
    const navigation = useNavigation();
  const [name, setName] = useState<string>('');
  const [cost, setCost] = useState<number>();
  const [description, setDescription] = useState<string>('');
  const onPressAdd = async () => {
    const newExpense = {
      id: uuid.v4(),
      name,
      cost: Number(cost),
      description,
    };
    try {
      const storeData = await AsyncStorage.getItem('expense');
      const existingExpense = storeData ? JSON.parse(storeData) : [];

      const updateExpense = [...existingExpense, newExpense];
      await AsyncStorage.setItem('expense', JSON.stringify(updateExpense));
      Alert.alert('Expense added successFully!!')
      navigation.navigate('Transaction')
    } catch (error) {
      Alert.alert('Error',error)
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Income Expense'} isShowBackIcon={true} />
      <Input
        value={name}
        onChangeText={(text: string) => setName(text)}
        placeholder={'Enter Name'}
      />
      <Input
        value={cost}
        onChangeText={(text: number) => setCost(text)}
        placeholder={'Enter Cost'}
      />
      <Input
        value={description}
        onChangeText={(text: string) => setDescription(text)}
        placeholder={'Enter Description'}
      />

      <TouchableOpacity onPress={onPressAdd} style={styles.button}>
        <Text>Add</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Income;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  button: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'skyblue',
    position: 'absolute',
    bottom: 40,
    backgroundColor: 'skyblue',
    paddingVertical: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
});
