import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {color} from '../utils/theme';
import Header from '../components/header';
import {buttonData} from '../utils/constant';

interface ItemProps {
  id: number;
  name: string;
  label: string;
  screen:string
}
const Home = () => {
  const navigation = useNavigation();

  const onHandleButtonPress = (item: ItemProps) => {
    console.log("screen",item)
    navigation.navigate(item.screen,{params:item.screen});
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Income Expense'} isShowBackIcon={false} />

      {buttonData.map((item, index) => {
        return (
          <TouchableOpacity
            style={styles.btn}
            onPress={()=>onHandleButtonPress(item)}
            >
            <Text style={styles.text}>{item.label}</Text>
            <Image
              source={item.image}
              style={styles.nextArrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  text: {
    color: color.black,
    fontSize: 18,
  },
  btn: {
    borderWidth: 0.5,
    borderColor: color.black,
    padding: 20,
    marginHorizontal: 25,
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  nextArrow: {
    height: 20,
    width: 20,
    position: 'absolute',
    right: 20,
    alignSelf: 'center',
  },
});
