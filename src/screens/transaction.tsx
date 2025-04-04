import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import {SetStateAction, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/header';
import {color} from '../utils/theme';
import {images} from '../utils/images';
import Input from '../components/input';

const Transaction = () => {
  const route =useRoute()
  const params=route.params;
  // console.log("params",params)
  const [data, setData] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [name, setName] = useState<string>('');
  const [cost, setCost] = useState<number>();
  const [description, setDescription] = useState<string>('');
  const [selectedId, setSelectedId] = useState();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const storeData = await AsyncStorage.getItem('expense');
      const parsedData = storeData ? JSON.parse(storeData) : [];

      console.log('parseData', parsedData);
      setData(parsedData);
    } catch (error) {
      Alert.alert('Fetching Data');
    }
  };
  const renderItem = ({item}) => (
    <View style={styles.itemView}>
      <View>
        <Text>{item.name}</Text>
        <Text>{item.cost}</Text>
        <Text>{item.description}</Text>
      </View>

      <View style={styles.iconView}>
        <TouchableOpacity
          onPress={() => {
            onEdit(item);
          }}>
          <Image
            source={images.edit}
            style={styles.edit}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onDelete(item);
          }}>
          <Image
            source={images.delete}
            style={styles.delete}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const onEdit = (selectedItem: { name: SetStateAction<string>; cost: SetStateAction<number | undefined>; description: SetStateAction<string>; id: SetStateAction<undefined>; }) => {
    setName(selectedItem.name);
    setCost(selectedItem.cost);
    setDescription(selectedItem.description);
    setIsShowModal(true);
    setSelectedId(selectedItem.id);
  };
  const onDelete = async (selectedItem: { id: any; }) => {
    const filteredData = data.filter(item => item.id != selectedItem.id);
    // console.log('filtredDAta', filteredData);
    await AsyncStorage.setItem('expense', JSON.stringify(filteredData));
    setData(filteredData);
    Alert.alert('Data deleted!!');
  };
  const onPressSaveEdit = async () => {
  
    const updateData = data.map(item =>
      item.id == selectedId
        ? {...item, name: name, cost: cost, description: description}
        : item,
    );
    console.log('updatedData', updateData);
    await AsyncStorage.setItem('expense', JSON.stringify(updateData));
    setData(updateData);
    setIsShowModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Transactions'} isShowBackIcon={true} />
      <FlatList data={data} renderItem={renderItem} />

      <Modal
        visible={isShowModal}
        transparent={true}
        onRequestClose={() => {
          setIsShowModal(!isShowModal);
        }}>
        <View style={styles.modal}>
          <View style={styles.modalSubView}>
            <Text style={styles.editText}>Edit Details</Text>
            <Input
              inputStyle={styles.input}
              value={name}
              onChangeText={(text: string) => setName(text)}
              placeholder={'Enter Name'}
            />
            <Input
              inputStyle={styles.input}
              value={cost}
              onChangeText={(text: number) => setCost(text)}
              placeholder={'Enter Cost'}
            />
            <Input
              inputStyle={styles.input}
              value={description}
              onChangeText={(text: string) => setDescription(text)}
              placeholder={'Enter Description'}
            />
            <TouchableOpacity onPress={onPressSaveEdit} style={styles.button}>
              <Text>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  edit: {
    height: 20,
    width: 20,
  },
  delete: {
    height: 20,
    width: 20,
  },
  itemView: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: color.primary,
    marginHorizontal: 25,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconView: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'skyblue',
    marginVertical: 20,

    backgroundColor: 'skyblue',
    paddingVertical: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  modalSubView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,

    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  editText: {
    marginVertical: 20,
    fontSize: 20,
  },
  input: {
    width: '80%',
  },
});
