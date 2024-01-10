import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const Order = ({ navigation }) => {
  const [sDet, setSDet] = useState('None');
  const [sFF, setSFF] = useState('None');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [sDT, setSDT] = useState(null);
  const [address, setAddress] = useState('');
  const [dates, setDates] = useState(new Date());
  const [opens, setOpens] = useState(false);
  const [sDTimes, setSDTimes] = useState(null);
  const [isErrVisible, setIsErrVisible] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const detergentButtons = [
    { id: 0, name: 'None' },
    { id: 1, name: 'Sulf-Exel' },
    { id: 2, name: 'Ghadi' },
    { id: 3, name: 'Tide' },
    { id: 4, name: 'Wheel' },
    { id: 5, name: 'Rin' },
    { id: 6, name: 'Vanish' },
  ];
  const detergentButtons2 = [
    { id: 0, name: 'None' },
    { id: 1, name: 'Comfort' },
    { id: 2, name: 'Vanish' },
    { id: 3, name: 'Genteel' },
    { id: 4, name: 'Ariel' },
    { id: 5, name: 'Hyde-xl ' },
    { id: 6, name: 'Safewash' },
  ];

  const handleDetPress = (detergent) => {
    setSDet(detergent);
  };

  const handleFFPress = (fabricFresh) => {
    setSFF(fabricFresh);
  };

  const showError = (message) => {
    setErrMsg(message);
    setIsErrVisible(true);
  };

  const handleOrderPress = () => {
    if (!address.trim()) {
      showError('Please enter your address');
      return;
    }

    if (!sDT) {
      showError('Please select a pickup date and time');
      return;
    }

    if (!sDTimes) {
      showError('Please select a delivery date and time');
      return;
    }

    navigation.push('Cartscreen', {
      Userdata: {
        sDet,
        sFF,
        address,
        sDT,
        sDTimes,
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.orderNowText}>ORDER NOW</Text>
      <View style={styles.comp}>
        <Text style={styles.head}>Detergent</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.buttonRow}>
            {detergentButtons.map((button) => (
              <TouchableOpacity
                key={button.id}
                style={[
                  styles.button,
                  { backgroundColor: sDet === button.name ? '#a2d2ff' : '#f2f5f2' },
                ]}
                onPress={() => handleDetPress(button.name)}
              >
                <Text style={styles.buttonText}>{button.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.comp}>
        <Text style={styles.head}>Fabric Freshener</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.buttonRow}>
            {detergentButtons2.map((button) => (
              <TouchableOpacity
                key={button.id}
                style={[
                  styles.button,
                  { backgroundColor: sFF === button.name ? '#a2d2ff' : '#f2f5f2' },
                ]}
                onPress={() => handleFFPress(button.name)}
              >
                <Text style={styles.buttonText}>{button.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.comp}>
        <Text style={styles.head}>Address</Text>

        <TextInput
          style={styles.addressInput}
          multiline={true}
          placeholderTextColor={'#fff'}
          numberOfLines={4}
          value={address}
          onChangeText={(text) => setAddress(text)}
          placeholder="Enter your address here"
        />
      </View>

      <View style={styles.comp}>
        <Text style={styles.head}>PICKUP</Text>
        {isErrVisible && errMsg.pickupDateTime && (
          <Text style={styles.errorText}>{errMsg.pickupDateTime}</Text>
        )}
        <View style={styles.dateTimeRow}>
          <Text style={styles.dateTimeLabel}>Select Date and Time</Text>
          <TouchableOpacity onPress={() => setOpen(true)} style={styles.calBtn}>
            <Image
              source={{
                uri: 'https://static.vecteezy.com/system/resources/previews/010/851/447/original/calendar-flat-icon-png.png',
              }}
              style={styles.calIcon}
            ></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.dateTimeContainer}>
          {sDT !== null && (
            <Text style={styles.dateTimeText}>
              CONFIRM: {sDT.toString()}
            </Text>
          )}
        </View>
        <DatePicker
          modal
          open={open}
          title={'SELECT PICKUP'}
          date={date}
          androidVariant='iosClone'
          theme='dark'
          is24hourSource={'locale'}
          mode='datetime'
          textColor='#a2d2ff'
          dividerHeight={10}
          fadeToColor={'#000'}
          confirmText={'Select'}
          minuteInterval={true}
          timeZoneOffsetInMinutes={1}
          onConfirm={(selectedDate) => {
            setOpen(false);
            setDate(selectedDate);
            setSDT(selectedDate);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>

      <View style={styles.comp}>
        <Text style={styles.head}>Delivery</Text>
        {isErrVisible && errMsg.deliveryDateTime && (
          <Text style={styles.errorText}>{errMsg.deliveryDateTime}</Text>
        )}
        <View style={styles.dateTimeRow}>
          <Text style={styles.dateTimeLabel}>Select Date and Time</Text>
          <TouchableOpacity onPress={() => setOpens(true)} style={styles.calBtn}>
            <Image
              source={{
                uri: 'https://static.vecteezy.com/system/resources/previews/010/851/447/original/calendar-flat-icon-png.png',
              }}
              style={styles.calIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.dateTimeContainer}>
          {sDTimes !== null && (
            <Text style={styles.dateTimeText}>
              CONFIRM: {sDTimes.toString()}
            </Text>
          )}
        </View>
        <DatePicker
          modal
          open={opens}
          title={'SELECT DELIVERY'}
          date={dates}
          androidVariant='iosClone'
          theme='dark'
          is24hourSource={'device'}
          mode='datetime'
          textColor='#a2d2ff'
          dividerHeight={10}
          fadeToColor={'#000'}
          confirmText={'Select'}
          timeZoneOffsetInMinutes={2}
          onConfirm={(selectedDate) => {
            setOpens(false);
            setDates(selectedDate);
            setSDTimes(selectedDate);
          }}
          onCancel={() => {
            setOpens(false);
          }}
        />
      </View>
      {isErrVisible && errMsg && (
        <Text style={styles.errorText}>{errMsg}</Text>
      )}
      <View style={styles.btnCont}>
        <TouchableOpacity style={styles.orderBtn} onPress={handleOrderPress}>
          <Text style={styles.orderBtnText}>Place the order</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: w * 0.02,
  },
  orderNowText: {
    color: '#a2d2ff',
    fontSize: w * 0.05,
    fontWeight: '900',
    marginBottom: w * 0.03,
  },
  comp: {
    flex: 1,
    margin: w * 0.02,
    width: w - w * 0.04,
    alignSelf: 'center',
    marginVertical: w * 0.01,
    borderRadius: w * 0.02,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  head: {
    fontSize: w * 0.05,
    color: '#a2d2ff',
    fontWeight:'600',
    marginLeft: w * 0.02,
    marginTop: w * 0.02,
    marginBottom: 0,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: w * 0.02,
    marginBottom: 0,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: w * 0.02,
    borderRadius: w * 0.02,
    marginRight: w * 0.02,
    width: w * 0.25,
    height: w * 0.1,
    borderWidth: 1,
    borderColor: '#a2d2ff',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: w * 0.04,
  },
  addressInput: {
    height: h * 0.1,
    backgroundColor: '#a2d2ff',
    width: w - w * 0.08,
    color: '#000',
    marginLeft: w * 0.02,
    fontSize: w * 0.04,
    borderColor: 'grey',
    borderRadius: w * 0.02,
    borderWidth: 1,
    marginTop: w * 0.01,
    padding: w * 0.02,
  },
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  dateTimeLabel: {
    fontSize: w * 0.05,
    color: '#000',
    marginTop: w * 0.02,
    fontWeight: '500',
    marginLeft: w * 0.02,
  },
  dateTimeText: {
    fontSize: w * 0.05,
    color: '#000',
    marginTop: w * 0.02,
    fontWeight: '500',
    marginLeft: w * 0.02,
  },
  calBtn: {
    width: w * 0.1,
    backgroundColor: '#a2d2ff',
    borderRadius: w * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    height: w * 0.1,
  },
  calIcon: {
    width: w * 0.08,
    height: w * 0.08,
  },
  errorText: {
    fontSize: w * 0.04,
    color: 'red',
    marginTop: 0,
    marginLeft: w * 0.02,
  },
  dateTimeContainer: {
    backgroundColor: '#a2d2ff',
    width: w - w * 0.05,
    alignSelf: 'center',
    height: w * 0.1,
    borderRadius: w * 0.02,
    padding: w * 0.02,
    margin: w * 0.02,
  },
  dateTimeText: {
    fontSize: w * 0.05,
    fontWeight: '700',
    color: '#fff',
  },
  btnCont: {
    width: '100%',
    marginVertical: w * 0.04,
    alignItems: 'center',
  },
  orderBtn: {
    backgroundColor: '#a2d2ff',
    paddingVertical: w * 0.02,
    paddingHorizontal: w * 0.02,
    borderRadius: w * 0.02,
  },
  orderBtnText: {
    color: '#000',
    fontWeight:'800',
    fontSize: w * 0.05,
  }
});

export default Order;
