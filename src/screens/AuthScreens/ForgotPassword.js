import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import {bg, eye} from '../../assets';
import {CustomButton, CustomInput} from '../../components';
import {validateEmail, validatePassword} from '../../utils/error';
import {ApiPostNoAuth} from '../../utils/helper';
import {COLORS, FONTS, SIZES} from '../../utils/theme';

const ForgotPassword = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [otp, setOtp] = useState('');

  const [emailErr, setEmailErr] = useState('');
  const [passErr, setPassErr] = useState('');
  const [ConfirmPassErr, setConfirmPassErr] = useState('');

  // useEffect(() => {
  //   if (pass !== confirmPass){
  //     setDisabled(true)
  //   }
  // }, [pass,confirmPass])

  const sendOTP = async () => {
    try {
      const sendOTP = await ApiPostNoAuth('/user/send-otp', {
        email: email,
      }).then(res => {
        setVisible(true);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const changePass = async () => {
    try {
      const changePassword = await ApiPostNoAuth('/user/forgot-password', {
        email: email,
        password: pass,
        otp: otp,
      }).then(res => {
        setVisible(false);
        navigation.navigate('SignIn');
      });
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

          <View style={styles.mainView}>
            <View style={styles.title_container}>
              <Text style={styles.welcome}>Forgot</Text>
              <Text style={styles.welcome}>Password</Text>
            </View>

            <View style={styles.inptu_container}>
              <CustomInput
                type="email-address"
                placeholder="Email"
                value={email}
                setValue={t => {
                  validateEmail(t, setEmailErr);
                  setEmail(t);
                }}
                error={emailErr}
                contentContainerStyle={{marginVertical: 10}}
              />

              <CustomInput
                type="default"
                placeholder="Password"
                secure={true}
                icon={eye}
                value={pass}
                setValue={t => {
                  validatePassword(t, setPassErr);
                  setPass(t);
                }}
                contentContainerStyle={{marginVertical: 10}}
                error={passErr}
              />

              <CustomInput
                type="default"
                placeholder="Confirm Password"
                secure={true}
                icon={eye}
                value={confirmPass}
                setValue={t => {
                  validatePassword(t, setConfirmPassErr);
                  setConfirmPass(t);
                }}
                contentContainerStyle={{marginVertical: 10}}
                error={ConfirmPassErr}
              />
            </View>

            <View style={styles.btn_container}>
              {/* <CustomButton title="Save" disabled={disabled} onPress={() => sendOTP()}/> */}
              <CustomButton
                disabled={disabled}
                onPress={() => sendOTP()}
                title="Save"
              />
            </View>
          </View>

          <Overlay isVisible={visible} overlayStyle={styles.modal}>
            <View style={styles.modal_body}>
              <CustomInput
                type="numeric"
                placeholder="Enter OTP"
                value={otp}
                setValue={t => {
                  setOtp(t);
                }}
                error={emailErr}
                contentContainerStyle={{
                  margin: 10,
                  width: '100%',
                }}
              />

              <CustomButton onPress={() => changePass()} title="Save" />
            </View>
          </Overlay>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },

  mainView: {
    padding: 34,
    flex: 1,
    justifyContent: 'center',
  },

  title_container: {
    // marginTop: '40%',
  },

  welcome: {
    ...FONTS.h1,
    color: COLORS.black,
  },

  welcome_sub: {
    ...FONTS.body3,
    fontWeight: '200',
    fontFamily: 'Roboto-Light',
    color: COLORS.black,
    marginTop: SIZES.base,
  },

  inptu_container: {
    marginTop: 54,
  },

  input_fields: {
    marginTop: 42,
  },

  btn_container: {
    alignItems: 'center',
    marginTop: 4 * SIZES.padding,
  },

  modal: {
    flex: 0.3,
    paddingHorizontal: 20,
    width: '60%',
    backgroundColor: COLORS.white,
  },

  modal_body: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  otp_input: {
    marginBottom: 20,
  },
});
