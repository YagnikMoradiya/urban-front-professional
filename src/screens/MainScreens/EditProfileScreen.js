import React, { useLayoutEffect, useEffect, useState } from 'react'
import { View, Text, StyleSheet, StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { COLORS, FONTS } from '../../utils/theme';
import { launchImageLibrary } from 'react-native-image-picker';
import { camera } from '../../assets';
import { ApiGet, ApiPost, ApiPut } from '../../utils/helper';


const EditProfileScreen = ({ navigation, route }) => {
  const [ image, setImage ] = useState({ uri: '' });
  const [ avatar, setAvatar ] = useState(route.params.avatar)
  const [ name, setName ] = useState(route.params.name);
  const [ mobile, setMobile ] = useState(route.params.phone);
  const [ state, setState ] = useState(route.params.state);
  const [ city, setCity ] = useState(route.params.city);

  const update = async () => {
    try {
      const formdata = new FormData();

      formdata.append('name', name);
      formdata.append('phone', mobile);
      formdata.append('state', state);
      formdata.append('city', city);

      if (image.uri != '') {
        formdata.append('avatar', {
          uri: image.uri,
          type: image.type,
          name: image.fileName,
        });
      }

      const shop = await ApiPut('/shop/edit', formdata);

      navigation.navigate('Profile')
    } catch (error) {
      console.error(error);
    }
  }

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
        <View style={styles.container}>
          <StatusBar backgroundColor={COLORS.gray2} barStyle="dark-content" />

          <View style={styles.avatar_container}>
            <Avatar
              size="xlarge"
              rounded
              source={image.uri ? { uri: image.uri } : avatar ? { uri: avatar } : camera}
              onPress={selectImage}
            />
          </View>

          <View style={styles.options_container}>
            {input('Name', text => setName(text), false, name, 'default')}
            {input('Mobile Number', text => setMobile(text), false, mobile, 'numeric')}
            {input('City', text => setCity(text), false, city, 'default')}
            {input('State', text => setState(text), false, state, 'default')}

            <TouchableOpacity style={styles.save_container} onPress={update} >
              <Text style={styles.save_txt}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    paddingVertical: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  options_container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 40,
  },

  input_container: {
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
    width: '100%',
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
