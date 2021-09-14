import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {bg, eye, logo} from '../assets';
import {CustomButton, CustomInput} from '../components';
import {setShopData} from '../redux/action/shopAction';
import {validateEmail, validatePassword} from '../utils/error';
import {ApiPostNoAuth} from '../utils/helper';
import {setDataObj} from '../utils/storage.helper';
import {COLORS, FONTS, SIZES} from '../utils/theme';

const SignUpScreen = ({navigation}) => {
  const [shopName, setShopName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const dispatch = useDispatch();

  const register = async () => {
    if (emailError || passwordError || confirmPasswordError) return;

    setShopName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setConfirmPassword('');

    try {
      const data = {
        name: shopName,
        email,
        phone,
        password,
      };

      const shop = await ApiPostNoAuth('/shop/register', data);

      dispatch(setShopData(shop.data));
      await setDataObj(shop.data.token, 'token');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          source={bg}
          resizeMode="cover"
          style={styles.container}>
          <StatusBar backgroundColor={COLORS.gray2} barStyle="dark-content" />

          <View style={styles.content_container}>
            <View style={styles.welcome_container}>
              <Text style={styles.welcome_text}>Register</Text>
            </View>

            <View style={styles.input_container}>
              <CustomInput
                type="default"
                placeholder="Shop Name"
                value={shopName}
                setValue={setShopName}
                contentContainerStyle={{marginTop: 15}}
              />
              <CustomInput
                type="email-address"
                placeholder="Email"
                value={email}
                setValue={t => {
                  validateEmail(t, setEmailError);
                  setEmail(t);
                }}
                contentContainerStyle={{marginTop: 15}}
                error={emailError}
              />
              <CustomInput
                type="decimal-pad"
                placeholder="Mobile No"
                value={phone}
                setValue={setPhone}
                contentContainerStyle={{marginTop: 15}}
              />
              <CustomInput
                type="default"
                placeholder="Password"
                secure
                icon={eye}
                value={password}
                setValue={t => {
                  validatePassword(t, setPasswordError);
                  setPassword(t);
                }}
                error={passwordError}
                contentContainerStyle={{marginTop: 15}}
              />
              <CustomInput
                type="default"
                placeholder="Confirm Password"
                secure={true}
                icon={eye}
                value={confirmPassword}
                setValue={t => {
                  if (t !== password)
                    setConfirmPasswordError("Password doesn't match.");
                  else setConfirmPasswordError('');
                  setConfirmPassword(t);
                }}
                error={confirmPasswordError}
                contentContainerStyle={{marginTop: 15}}
              />
            </View>

            <View style={styles.button_container}>
              <CustomButton onPress={register} title="Sign Up" />
              <View style={styles.button_container_subText}>
                <Text style={styles.forgot_text}>
                  Already have an account?{' '}
                </Text>
                <TouchableOpacity
                  style={{padding: 5}}
                  onPress={() => navigation.navigate('SignIn')}>
                  <Text style={styles.button_container_signup_text}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    position: 'absolute',
    right: 40,
    top: 50,
  },
  content_container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 80,
    padding: SIZES.padding3,
  },
  welcome_container: {
    textAlign: 'left',
    marginBottom: 30,
  },
  welcome_text: {
    ...FONTS.h1,
    fontWeight: 'bold',
  },
  welcome_sub_text: {
    ...FONTS.body3,
    fontWeight: '200',
    paddingTop: SIZES.base,
  },
  input_container: {
    marginTop: SIZES.base,
  },
  forgot_container: {
    padding: 3,
  },
  forgot_text: {
    ...FONTS.body4,
    textAlign: 'right',
  },
  button_container: {
    alignItems: 'center',
    marginTop: SIZES.radius,
  },
  button_container_subText: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding,
  },
  button_container_signup_text: {
    ...FONTS.body4,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
