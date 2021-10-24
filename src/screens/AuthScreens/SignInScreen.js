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
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {bg, eye, fb, google, logo} from '../../assets';
import {CustomButton, CustomInput} from '../../components';
import {setShopData} from '../../redux/action/shopAction';
import {validateEmail, validatePassword} from '../../utils/error';
import {ApiPostNoAuth} from '../../utils/helper';
import {setDataObj} from '../../utils/storage.helper';
import {COLORS, FONTS, SIZES} from '../../utils/theme';

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const dispatch = useDispatch();

  const login = async () => {
    if (emailError || passwordError) return;
    setEmail('');
    setPassword('');
    try {
      const data = {email, password};

      const shop = await ApiPostNoAuth('/shop/login', data);

      await setDataObj(shop.data.token, 'token');
      dispatch(setShopData(shop.data));
    } catch (error) {
      if (error === 'Wrong Email') {
        setEmailError(error);
      } else if (error === 'Wrong Password') {
        setPasswordError(error);
      }
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
          {/* <Image source={logo} style={styles.logo} /> */}

          <View style={styles.content_container}>
            <View style={styles.welcome_container}>
              <Text style={styles.welcome_text}>Welcome</Text>
              <Text style={styles.welcome_text}>Back</Text>
              <Text style={styles.welcome_sub_text}>Login to your account</Text>
            </View>

            <View style={styles.input_container}>
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
                type="default"
                placeholder="Password"
                secure={true}
                icon={eye}
                value={password}
                setValue={t => {
                  validatePassword(t, setPasswordError);
                  setPassword(t);
                }}
                contentContainerStyle={{marginTop: 15}}
                error={passwordError}
              />
              <TouchableOpacity style={styles.forgot_container} onPress={() => navigation.navigate('ForgotPass')}>
                <Text style={styles.forgot_text}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.button_container}>
              <CustomButton onPress={login} title="Login" />
              <View style={styles.button_container_subText}>
                <Text style={styles.forgot_text}>Don't have an account? </Text>
                <TouchableOpacity
                  style={{padding: 5}}
                  onPress={() => navigation.navigate('SignUp')}>
                  <Text style={styles.button_container_signup_text}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    flex: 1,
                    height: 2,
                    backgroundColor: COLORS.gray,
                  }}
                />
                <Text style={{paddingHorizontal: 8}}>or Login with</Text>
                <View
                  style={{flex: 1, height: 2, backgroundColor: COLORS.gray}}
                />
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity style={{padding: 3}}>
                  <Image source={fb} />
                </TouchableOpacity>
                <TouchableOpacity style={{padding: 3}}>
                  <Image source={google} />
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
    // height: SIZES.height,
    // width: SIZES.width,
  },
  logo: {
    position: 'absolute',
    right: 40,
    top: 50,
  },
  content_container: {
    flex: 1,
    justifyContent: 'center',
    padding: SIZES.padding3,
  },
  welcome_container: {
    textAlign: 'left',
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
    marginTop: SIZES.radius,
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

export default SignInScreen;
