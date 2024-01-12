import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {
  decrementequantitiy,
  increasecartquantity,
} from '../Redux/Action';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Cart = ({ route, navigation }) => {
  const { Userdata } = route.params;
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.Cart);

  console.log('cart=>', carts);

  const renderCartItem = ({ item, index }) => (
    <View style={styles.cartItemContainer}>
      <View style={styles.itemDetailsContainer}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.detailsColumn}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.priceText}>Price: ${item.price}</Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => _decrementQuantity(index, item)}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantitys}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => _incrementQuantity(index, item)}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const _incrementQuantity = (index, item) => {
    const updatedCarts = [...carts];
    updatedCarts[index].quantity += 1;
    dispatch(increasecartquantity(updatedCarts));
    console.log('increment');
  };

  const _decrementQuantity = (index, item) => {
    const updatedCarts = [...carts];
    if (updatedCarts[index].quantity > 0) {
      updatedCarts[index].quantity -= 1;
      dispatch(decrementequantitiy(updatedCarts));
      console.log('decrement');
    }
  };

  const calculateTotalPrice = () => {
    let total = 0;
    let totalQuantity = 0;

    carts.forEach((item) => {
      total += item.price * item.quantity;
      totalQuantity += item.quantity;
    });

    return { total, totalQuantity };
  };

  const { total, totalQuantity } = calculateTotalPrice();


  const Adddata = async () => {
    try {
      const orderID = Userdata.orderID; 
      console.log('id:',Userdata.orderID);
      if (orderID) { 
        await firestore()
          .collection('orders')
          .doc(orderID)
          .update({
            USER: {
              cart: carts.map(cartItem => ({
                Firebaseid: cartItem.data.Firebaseid,
                id: cartItem.id,
                name: cartItem.name,
                quantity: cartItem.quantity,
                price: cartItem.price,
              })),
              TotalPrice: total,
              TotalQuantity: totalQuantity,
              sDet: Userdata.sDet,
              sFF: Userdata.sFF,
              address: Userdata.address,
              Pickup: Userdata.sDT.toString(),
              Delivery: Userdata.sDTimes.toString(),
            },
          });
        console.log('Data updated in Firestore successfully');
      } else {
        
        const newOrderRef = await firestore()
          .collection('orders')
          .add({
            USER: {
              cart: carts.map(cartItem => ({
                Firebaseid: cartItem.data.Firebaseid,
                id: cartItem.id,
                name: cartItem.name,
                quantity: cartItem.quantity,
                price: cartItem.price,
              })),
              TotalPrice: total,
              TotalQuantity: totalQuantity,
              sDet: Userdata.sDet,
              sFF: Userdata.sFF,
              address: Userdata.address,
              Pickup: Userdata.sDT.toString(),
              Delivery: Userdata.sDTimes.toString(),
            },
          });
        console.log('New data added to Firestore with ID:', newOrderRef.id);
      }
    } catch (error) {
      console.error('Error updating/adding data to Firestore:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart Screen</Text>
      <View style={styles.shadowContainer}>
        {renderInfoItem('Detergent:', Userdata.sDet)}
        {renderInfoItem('Fabric:', Userdata.sFF)}
        {renderInfoItem('Address:', Userdata.address)}
        {renderInfoItem('PICKUP:', Userdata.sDT.toString())}
        {renderInfoItem('DELIVERY:', Userdata.sDTimes.toString())}
      </View>

      <TouchableOpacity onPress={() => navigation.push('homescreen')}>
        <Text style={{ fontSize: 20, color: '#a2d2ff', alignSelf: 'flex-end', marginBottom: 10 }}>
          Add Item
        </Text>
      </TouchableOpacity>

      <View style={styles.flatListContainer}>
        <FlatList
          data={carts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderCartItem}
        />
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.bottomRowContainer}>
          <View style={styles.bottomColumn}>
            <Text style={styles.bottomColumnText}>Quantity</Text>
            <Text style={styles.bottomColumnValue}>{totalQuantity}</Text>
          </View>
          <View style={styles.bottomColumn}>
            <Text style={styles.bottomColumnText}>Total Price</Text>
            <Text style={styles.bottomColumnValue}>${total}</Text>
          </View>
          <TouchableOpacity style={styles.orderNowButton} onPress={Adddata}>
            <Text style={styles.orderNowButtonText}>Order Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const renderInfoItem = (label, value) => (
  <View style={styles.itemContainer}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f5f2',
  },

  title: {
    fontSize: windowWidth * 0.06,
    fontWeight: 'bold',
    marginBottom: windowHeight * 0.02,
    color: '#a2d2ff',
  },
  shadowContainer: {
    backgroundColor: '#fff',
    height: windowHeight * 0.4,
    borderRadius: 10,
    justifyContent: 'center',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: windowHeight * 0.02 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    elevation: 5,
    paddingTo:20,
    padding: 10,
    marginBottom: windowHeight * 0.03,
  },
  itemContainer: {
    marginBottom: windowHeight * 0.015,
  },
  quantity: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bottomColumnValue: {
    fontSize: windowWidth * 0.05,
    fontWeight: 'bold',
    color: 'green',
  },
  bottomContainer: {
    width: windowWidth - 40,
    height: windowHeight * 0.1,
    borderRadius: 12,
    position: 'absolute',
    // alignSelf:'flex-end',
    bottom: windowHeight * 0.03,
    backgroundColor: '#a2d2ff',
    alignSelf: 'center',
    elevation: 3,
    justifyContent: 'center',
    paddingHorizontal: windowWidth * 0.03,
  },
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    marginBottom: windowHeight * 0.015,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: windowWidth * 0.02,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: windowHeight * 0.02 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  itemImage: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    borderRadius: 8,
  },
  itemDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsColumn: {
    marginLeft: windowWidth * 0.03,
  },
  itemName: {
    fontSize: windowWidth * 0.04,
    fontWeight: 'bold',
    color: '#a2d2ff',
  },
  priceText: {
    fontSize: windowWidth * 0.04,
    fontWeight: 'bold',
    color: 'black',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',  
    alignItems: 'center',
    marginTop: windowHeight * 0.02,  
    marginBottom: windowHeight * 0.02,  
  },
  quantityButton: {
    fontSize: windowWidth * 0.07,
    height: windowHeight * 0.04,
    fontWeight: 'bold',
    justifyContent:'space-around',
    margin:10,
    alignItems:'center',
    borderRadius: 10,
    backgroundColor: '#a2d2ff',
    color: '#fff',
    paddingHorizontal: windowWidth * 0.02,
  },
  quantitys: {
    fontSize: windowWidth * 0.05,
    fontWeight: '900',
    color: '#a2d2ff',
  },
  bottomRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomColumn: {
    flex: 1,
    alignItems: 'center',
  },
  bottomColumnText: {
    fontSize: windowWidth * 0.05,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: windowHeight * 0.012,
  },
  orderNowButton: {
    backgroundColor: 'green',
    borderRadius: 12,
    paddingVertical: windowHeight * 0.02,
    paddingHorizontal: windowWidth * 0.04,
    alignItems: 'center',
  },
  orderNowButtonText: {
    color: 'white',
    fontSize: windowWidth * 0.04,
    fontWeight: 'bold',
  },
  addItemsText: {
    fontSize: windowWidth * 0.05,
    color: '#a2d2ff',
    alignSelf: 'flex-end',
    marginBottom: windowHeight * 0.015,
  },
  label: {
    fontSize: windowWidth * 0.04,
    fontWeight: 'bold',
    color: '#a2d2ff',
  },
  value: {
    fontSize: windowWidth * 0.05,
    fontWeight: 'bold',
    color: 'black',
  },
  flatListContainer: {
    flex: 1,
    marginBottom: windowHeight * 0.03,
  },
});

export default Cart;
