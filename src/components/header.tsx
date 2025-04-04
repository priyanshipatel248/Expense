import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {images} from '../utils/images';


interface HeaderProps {
  title: string;
  isShowBackIcon: boolean;
  onPress?:(params:any)=>void
}
const Header = (props: HeaderProps) => {
  const navigation=useNavigation()
  const {title, isShowBackIcon} = props;
  return (
    <View style={styles.headerContainer}>
      {isShowBackIcon && (
         <TouchableOpacity onPress={()=>{navigation.goBack()}}  style={styles.backArrow}>
        <Image
          source={images.backArrow}
          style={styles.backArrow}
          resizeMode="contain"
        />
         </TouchableOpacity>
      )}

      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    height: 44,
justifyContent:'center',
    flexDirection:'row'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign:'center',
   
  },
  backArrow: {
    height: 20,
    width: 20,
    position:'absolute',
    left:25,
    alignSelf:'center'
  
  },
});
