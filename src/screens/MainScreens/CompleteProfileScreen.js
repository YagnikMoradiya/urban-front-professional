import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Fontisto';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar, Button, Divider} from 'react-native-elements';
import {ApiGet, ApiGetNoAuth, ApiPost} from '../../utils/helper';
import {COLORS, FONTS, SIZES} from '../../utils/theme';
import {camera} from '../../assets';
import {launchImageLibrary} from 'react-native-image-picker';

const TextInputCustom = ({placeholder, value, setValue, type}) => {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray,
        margin: 15,
      }}>
      <TextInput
        placeholderTextColor={COLORS.gray}
        style={{paddingBottom: 0, ...FONTS.body4, fontSize: 16}}
        placeholder={placeholder}
        value={value}
        onChangeText={t => setValue(t)}
      />
    </View>
  );
};

const SectionHeader = ({title}) => {
  return (
    <View
      style={{
        width: '100%',
      }}>
      <Text
        style={{
          ...FONTS.h4,
          textAlign: 'center',
          color: COLORS.black,
          paddingVertical: 10,
        }}>
        {title}
      </Text>
      <Divider orientation="horizontal" />
    </View>
  );
};

const CustomNextButton = ({onPress, title}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        // height: 40,
        width: 100,
        justifyContent: 'center',
        backgroundColor: COLORS.black,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        margin: 5,
        padding: SIZES.padding,
        paddingHorizontal: SIZES.padding4,
      }}>
      <Text style={{color: COLORS.white, textAlign: 'center', ...FONTS.h4}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const CompleteProfileScreen = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [openingShow, setOpeningShow] = useState(false);
  const [closingShow, setClosingShow] = useState(false);
  const [openingTime, setOpeningTime] = useState(new Date());
  const [closingTime, setClosingTime] = useState(new Date());
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [shopName, setShopName] = useState('');
  const [addressOne, setAddressOne] = useState('');
  const [addressTwo, setAddressTwo] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [phone, setPhone] = useState('');
  const [experience, setExperience] = useState('');
  const [image, setImage] = useState('');
  const [profileTrake, setProfileTrake] = useState({
    generalDetail: false,
    addressDetail: false,
    employeeDetail: false,
    serviceDetail: false,
  });

  const onChangeOpening = (event, selectedDate) => {
    const currentDate = selectedDate || openingTime;
    setOpeningShow(Platform.OS === 'ios');
    setOpeningTime(currentDate);
  };

  const onChangeClosing = (event, selectedDate) => {
    const currentDate = selectedDate || closingTime;
    setClosingShow(Platform.OS === 'ios');
    setClosingTime(currentDate);
  };

  const getCategory = async () => {
    try {
      const category = await ApiGetNoAuth('/general/category');
      setCategories(category.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getState = async () => {
    try {
      const states = await ApiGetNoAuth('/general/state');
      setStates(states.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCity = async city => {
    try {
      const cities = await ApiGetNoAuth(`/general/city/${city}`);
      setCities(cities.data);
    } catch (error) {
      console.error(error);
    }
  };

  const chooseImage = () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        return;
      } else if (response.errorMessage) {
        console.log('Error Message: ', response.errorMessage);
      } else {
        setImage(response.assets[0]);
        console.log(response);
      }
    });
  };

  const getTrakeOfDetail = async () => {
    try {
      const detail = await ApiGet('/shop/shopdata-track');
      setProfileTrake(detail.data);

      if (
        detail.data.generalDetail === true &&
        detail.data.addressDetail === true &&
        detail.data.employeeDetail === true
      ) {
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addEmployee = async () => {
    if (employeeName === '' || phone === '' || experience === '') return;

    try {
      const formdata = new FormData();

      formdata.append('name', employeeName);
      formdata.append('phone', '+91 ' + phone);
      formdata.append('experience', experience);
      formdata.append('avatar', {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      });

      const employee = await ApiPost('/shop/add-employee', formdata);

      getTrakeOfDetail();
    } catch (error) {
      console.error(error);
    }
  };

  const addAddress = async () => {
    if (
      shopName === '' ||
      addressOne === '' ||
      zipCode === '' ||
      selectedState === '' ||
      selectedCity === ''
    )
      return;

    try {
      let addressData = {
        name: shopName,
        streetAddress: addressOne + ' ' + addressTwo,
        zipCode,
        state: selectedState,
        city: selectedCity,
      };

      const address = await ApiPost('/shop/add-address', addressData);

      getTrakeOfDetail();
    } catch (error) {
      console.error(error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Complete Profile',
      headerStyle: {backgroundColor: COLORS.gray2},
      headerTitleStyle: {
        color: COLORS.black,
      },
      headerTintColor: COLORS.black,
    });
  }, [navigation]);

  useEffect(() => {
    getCategory();
    getState();
    getTrakeOfDetail();
  }, []);

  useEffect(() => {
    if (selectedState !== '') {
      getCity(selectedState);
    }
  }, [selectedState]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar backgroundColor={COLORS.gray2} barStyle="dark-content" />
      {/* GeneralDetail */}
      {!profileTrake.generalDetail && (
        <View style={styles.card}>
          <SectionHeader title="General Section" />
          <TextInputCustom
            value={name}
            setValue={setName}
            placeholder="Owner's name"
          />
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: COLORS.gray,
              margin: 15,
            }}>
            <Picker
              mode="dialog"
              itemStyle={{
                color: COLORS.black,
                width: '100%',
                fontFamily: 'Roboto-Light',
                fontSize: 50,
                fontWeight: '100',
              }}
              selectedValue={selectedCategory}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCategory(itemValue)
              }>
              {categories.map(c => (
                <Picker.Item
                  fontFamily="Roboto-light"
                  label={c.name}
                  value={c.name}
                  key={c._id}
                />
              ))}
            </Picker>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              margin: 15,
            }}>
            <View>
              {openingShow && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={openingTime}
                  mode={'time'}
                  is24Hour={false}
                  display="clock"
                  onChange={onChangeOpening}
                />
              )}
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity onPress={() => setOpeningShow(true)}>
                  <Text style={{color: COLORS.black, ...FONTS.body4}}>
                    {moment(openingTime).format('HH:mm')}
                  </Text>
                </TouchableOpacity>
                <Text style={{color: COLORS.gray, ...FONTS.body4}}>
                  Opening Time
                </Text>
              </View>
            </View>
            <Icon name="arrow-swap" color={COLORS.gray} size={SIZES.h4} />
            <View>
              {closingShow && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={closingTime}
                  mode={'time'}
                  is24Hour={false}
                  display="spinner"
                  onChange={onChangeClosing}
                />
              )}
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity onPress={() => setClosingShow(true)}>
                  <Text style={{color: COLORS.black, ...FONTS.body4}}>
                    {moment(closingTime).format('HH:mm')}
                  </Text>
                </TouchableOpacity>
                <Text style={{color: COLORS.gray, ...FONTS.body4}}>
                  Closing Time
                </Text>
              </View>
            </View>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <CustomNextButton title="Add" />
          </View>
        </View>
      )}

      {/* AddressDetail */}
      {!profileTrake.addressDetail && (
        <View style={styles.card}>
          <SectionHeader title="Address Section" />
          <TextInputCustom
            value={shopName}
            setValue={setShopName}
            placeholder="Shop Name"
          />
          <TextInputCustom
            value={addressOne}
            setValue={setAddressOne}
            placeholder="Address line one"
          />
          <TextInputCustom
            value={addressTwo}
            setValue={setAddressTwo}
            placeholder="Address line two"
          />
          <TextInputCustom
            value={zipCode}
            setValue={setZipCode}
            placeholder="Zipcode"
          />
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: COLORS.gray,
              margin: 15,
            }}>
            <Picker
              mode="dialog"
              selectedValue={selectedState}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedState(itemValue)
              }>
              {states.map(c => (
                <Picker.Item
                  fontFamily="Roboto-light"
                  label={c.name}
                  value={c.name}
                  key={c._id}
                />
              ))}
            </Picker>
          </View>
          {cities.length > 0 && (
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: COLORS.gray,
                margin: 15,
              }}>
              <Picker
                mode="dialog"
                selectedValue={selectedCity}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedCity(itemValue)
                }>
                {cities.map(c => (
                  <Picker.Item
                    fontFamily="Roboto-light"
                    label={c.name}
                    value={c.name}
                    key={c._id}
                  />
                ))}
              </Picker>
            </View>
          )}
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <CustomNextButton title="Add" onPress={addAddress} />
          </View>
        </View>
      )}

      {/* EmployeeDetail */}
      {!profileTrake.employeeDetail && (
        <View style={styles.card}>
          <SectionHeader title="Employee Section" />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 5,
            }}>
            <Avatar
              rounded
              source={image.uri ? {uri: image.uri} : camera}
              size="large"
              onPress={chooseImage}
            />
          </View>
          <TextInputCustom
            value={employeeName}
            setValue={setEmployeeName}
            placeholder="Employee Name"
            type="default"
          />
          <TextInputCustom
            value={phone}
            setValue={setPhone}
            placeholder="Phone"
            type="decimal-pad"
          />
          <TextInputCustom
            value={experience}
            setValue={setExperience}
            placeholder="Experience"
            type="decimal-pad"
          />
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <CustomNextButton title="Add" onPress={addEmployee} />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default CompleteProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: SIZES.padding2,
    backgroundColor: COLORS.gray2,
  },
  card: {
    padding: SIZES.padding3,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
