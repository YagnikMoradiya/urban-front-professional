import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../utils/theme';

const CustomInput = ({
  contentContainerStyle,
  icon,
  type,
  placeholder,
  secure,
  value,
  setValue,
  error,
}) => {
  const [color, setColor] = useState(COLORS.gray);
  const [securePassword, setSecurePassword] = useState(secure);

  return (
    <View style={[styles.mainContainer, {...contentContainerStyle}]}>
      <View
        style={[
          styles.container,
          {borderBottomColor: color, borderBottomWidth: 2},
        ]}>
        <TextInput
          keyboardType={type}
          secureTextEntry={securePassword}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder={placeholder}
          placeholderTextColor={COLORS.lightGray}
          style={styles.inputfield}
          onFocus={() => setColor(COLORS.black)}
          onBlur={() => setColor(COLORS.gray)}
          value={value}
          onChangeText={t => {
            setValue(t);
          }}
        />
        {icon && (
          <TouchableOpacity onPress={() => setSecurePassword(!securePassword)}>
            <Image style={styles.icon} source={icon} />
          </TouchableOpacity>
        )}
      </View>

      {error && error.length > 0 ? (
        <View style={styles.error_container}>
          <Text style={styles.error_text}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  mainContainer: {},
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  inputfield: {
    flex: 1,
    ...FONTS.body3,
    fontFamily: 'Roboto-Light',
    color: COLORS.black,
    padding: 5,
  },
  icon: {
    margin: SIZES.padding,
  },
  error_container: {
    padding: 3,
  },
  error_text: {
    color: COLORS.red,
  },
});
