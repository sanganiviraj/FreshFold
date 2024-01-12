import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Alladddata, adddatatocart } from '../Redux/Action';
import { FlatList } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import ImageSlider from '../Componets/ImageSlider';
import Services from '../Componets/Services';
import Clothes from '../Componets/Clothes';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const [services, setservices] = useState();
  const servicedata = useSelector(state => state.laundrydata);
  const carts = useSelector(state => state.Cart);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    firestore()
      .collection('laundrydatas')
      .get()
      .then((querySnapshot) => {
        let tempdata = [];

        querySnapshot.forEach((documentSnapshot) => {
          tempdata.push({ id: documentSnapshot.id, data: documentSnapshot.data() });
        });

        setservices(tempdata);
        dispatch(Alladddata(tempdata));
      });
  };

  const handlePress = () => {
    navigation.push('orderscreen');
  };

  const addToCart = (item) => {
    dispatch(adddatatocart(item));
    calculateTotal();
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.screen}>
        <View>
          <View style={styles.location}>
            <Image source={{ uri: 'https://png.pngtree.com/png-vector/20230413/ourmid/pngtree-3d-location-icon-clipart-in-transparent-background-vector-png-image_6704161.png' }} style={styles.image} />
            <Text style={styles.text}>Home</Text>
            <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRMlcYYdpn9HleCLqzIcI8BswbjHc6oSjz6VbL8IMa5Br-IGDklWZSaY3J5N-HFgeZSms&usqp=CAU' }} style={styles.profile} />
          </View>

          <View style={styles.searchContainer}>
            <TextInput placeholder='Search for items or more' placeholderTextColor={'grey'} style={styles.searchInput} />
            <Image source={{ uri: 'https://www.freepnglogos.com/uploads/search-png/search-icon-mono-general-iconset-custom-icon-design-12.png' }} style={styles.searchIcon} />
          </View>

          <ImageSlider />

          <Services />
          {services &&
            <FlatList
              data={servicedata}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => addToCart(item)}>
                  <Clothes key={item.id} item={item} />
                </TouchableOpacity>
              )}
            />
          }
        </View>
      </ScrollView>

      {/* container */}
      <View style={styles.container}>
        <View style={{ height: windowHeight * 0.1, justifyContent: 'center' }}>
          <Text style={{ fontSize: windowWidth * 0.04, color: 'black', fontWeight: '700', marginBottom: 5 }}>Quantity: {carts.reduce((acc, item) => acc + item.quantity, 0)}</Text>
          <Text style={{ fontSize: windowWidth * 0.04, color: 'black', fontWeight: '700' }}> Price: ${carts.reduce((acc, item) => acc + item.price * item.quantity, 0)}</Text>
        </View>
        <TouchableOpacity onPress={handlePress}>
          <Text style={{ fontSize: windowWidth * 0.05, color: 'black' }}> View Buckets </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: windowWidth * 0.05,
    color: 'black',
    margin: 7,
    fontWeight: '800',
  },
  location: {
    flexDirection: 'row',
  },
  image: {
    width: windowWidth * 0.05,
    margin: 7,
    height: windowHeight * 0.05,
  },
  profile: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.07,
    borderRadius: windowWidth * 0.05,
    marginLeft: windowWidth - (windowWidth * 0.2),
    margin: 7,
  },
  searchContainer: {
    height: windowHeight * 0.06,
    padding: 1,
    marginHorizontal: windowWidth * 0.03,
    borderWidth: 0.8,
    borderColor: '#C0C0C0',
    marginTop: windowHeight * 0.01,
    borderRadius: windowWidth * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchInput: {
    fontSize: windowWidth * 0.04,
  },
  searchIcon: {
    width: windowWidth * 0.05,
    tintColor: '#fd5c63',
    height: windowHeight * 0.025,
    margin: windowWidth * 0.02,
  },
  container: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.1,
    borderRadius: windowWidth * 0.02,
    position: 'absolute',
    bottom: windowHeight * 0.03,
    backgroundColor: "#a2d2ff",
    alignSelf: 'center',
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: windowWidth * 0.02,
  }
});

export default Home;
