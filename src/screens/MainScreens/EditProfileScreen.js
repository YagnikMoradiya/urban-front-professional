import React, { useLayoutEffect, useState } from 'react'
import { View, Text, StyleSheet, StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { COLORS, FONTS } from '../../utils/theme';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import { camera } from '../../assets';

const EditProfileScreen = ({ navigation }) => {

  const { shop } = useSelector(state => state.shopData)

  const [ image, setImage ] = useState({ uri: '' });
  const [ name, setName ] = useState('');
  const [ mobile, setMobile ] = useState('');
  const [ state, setState ] = useState('');
  const [ city, setCity ] = useState('');
  const [ zipCode, setzipCode ] = useState('');
  const [ street, setStreet ] = useState('');

  const input = (
    placeholder,
    onChangeText,
    secureTextEntry,
    value,
    keyboardType,
  ) => (
    <View style={styles.input_container}>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        value={value}
        keyboardType={keyboardType}
        style={styles.input}
        placeholderTextColor={COLORS.gray}
      />
    </View>
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Edit Profile',
      headerStyle: { backgroundColor: COLORS.gray2 },
      headerTitleStyle: {
        color: COLORS.black,
      },
      headerTintColor: COLORS.black,
    });
  }, [ navigation ]);

  const selectImage = () => {
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
        setImage(response.assets[ 0 ]);
      }
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <StatusBar backgroundColor={COLORS.gray2} barStyle="dark-content" />


          <View style={styles.avatar_container}>
            <Avatar
              avatarStyle={styles.avatar}
              size="xlarge"
              rounded
              source={image.uri ? { uri: image.uri } : shop?.avatar ? shop?.avatar : camera}
              onPress={selectImage}
            />
          </View>

          <View style={styles.options_container}>
            {input('Email', text => setName(text), false, name, 'default')}
            {input('Mobile Number', text => setMobile(text), false, mobile, 'numeric')}
            {input('Street/Apartment', text => setStreet(text), false, street, 'default')}
            {input('City', text => setCity(text), false, city, 'default')}
            {input('State', text => setState(text), false, state, 'default')}
            {input('Pin Code', text => setzipCode(text), false, zipCode, 'default')}

            <TouchableOpacity style={styles.save_container}>
              <Text style={styles.save_txt}>Save</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 500 }} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },

  avatar_container: {
    // flex: 0.3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatar: {},

  options_container: {
    flexGrow: 1,
    flexDirection: 'column',
    paddingHorizontal: 40,
  },

  input_container: {
    // backgroundColor: ,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 10,
    borderRadius: 15,
  },

  input: {
    flex: 1,
    ...FONTS.body3,
    fontFamily: 'Roboto-Light',
    color: COLORS.black,
    padding: 5,
  },

  save_container: {
    height: 40,
    width: '50%',
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    textAlign: 'center',
    marginTop: 15,
  },

  save_txt: {
    ...FONTS.body3,
    color: COLORS.white,
    fontWeight: '300',
  },
});
export default EditProfileScreen
