import React from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {bg, eye, logo} from '../assets';
import {CustomButton, CustomInput} from '../components';
import {COLORS, FONTS, SIZES} from '../utils/theme';

const SignUpScreen = ({navigation}) => {
  return (
    <ImageBackground source={bg} resizeMode="cover" style={styles.container}>
      <StatusBar backgroundColor={COLORS.transparent} barStyle="dark-content" />
      <Image source={logo} style={styles.logo} />

      <View style={styles.content_container}>
        <View style={styles.welcome_container}>
          <Text style={styles.welcome_text}>Register</Text>
        </View>

        <View style={styles.input_container}>
          <CustomInput
            type="default"
            placeholder="Shop Name"
            contentContainerStyle={{marginTop: 15}}
          />
          <CustomInput
            type="email-address"
            placeholder="Email"
            contentContainerStyle={{marginTop: 15}}
          />
          <CustomInput
            type="decimal-pad"
            placeholder="Mobile No"
            contentContainerStyle={{marginTop: 15}}
          />
          <CustomInput
            type="default"
            placeholder="Password"
            secure
            icon={eye}
            contentContainerStyle={{marginTop: 15}}
          />
          <CustomInput
            type="default"
            placeholder="Confirm Password"
            secure
            icon={eye}
            contentContainerStyle={{marginTop: 15}}
          />
        </View>

        <View style={styles.button_container}>
          <CustomButton
            onPress={() => navigation.navigate('SignUp')}
            title="Sign Up"
          />
          <View style={styles.button_container_subText}>
            <Text style={styles.forgot_text}>Already have an account? </Text>
            <TouchableOpacity
              style={{padding: 5}}
              onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.button_container_signup_text}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SIZES.height,
    width: SIZES.width,
  },
  logo: {
    position: 'absolute',
    right: 40,
    top: 50,
  },
  content_container: {
    padding: SIZES.padding3,
  },
  welcome_container: {
    textAlign: 'left',
    marginTop: '45%',
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
