import React from 'react';
import {
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  View,
} from 'react-native';
import {CustomNextButton} from '../../components';
import {COLORS, FONTS, SIZES} from '../../utils/theme';

const TextInputCustom = ({placeholder}) => {
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
      />
    </View>
  );
};

const AddressDetail = ({navigation}) => {
  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.card}>
        <TextInputCustom placeholder="Shop Name" />
        <TextInputCustom placeholder="Address line one" />
        <TextInputCustom placeholder="Address line two" />
        <TextInputCustom placeholder="State" />
        <TextInputCustom placeholder="City" />
      </ScrollView>
      <View
        style={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CustomNextButton
          title="Next"
          onPress={() => navigation.push('EmployeeDetail')}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddressDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
    marginHorizontal: SIZES.padding3,
    flex: 0.7,
    // height: 250,
    paddingVertical: 20,
  },
});
