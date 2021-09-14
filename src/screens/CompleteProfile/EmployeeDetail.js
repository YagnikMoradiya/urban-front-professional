import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {CustomAvatar, CustomNextButton} from '../../components';
import {COLORS, FONTS, SIZES} from '../../utils/theme';
import {Avatar} from 'react-native-elements';
import {camera} from '../../assets';
import {useState} from 'react';

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
        keyboardType={type}
      />
    </View>
  );
};

const EmployeeDetail = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [experience, setExperience] = useState('');

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <View style={styles.card}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <CustomAvatar
            source={camera}
            onPress={() => console.log('Its works!!')}
          />
        </View>
        <TextInputCustom
          value={name}
          setValue={setName}
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
      </View>
      <View
        style={{
          flexGrow: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CustomNextButton
          title="Add"
          onPress={() => console.log('Employee Added')}
        />
        <CustomNextButton title="Done" onPress={() => console.log('Done!!')} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default EmployeeDetail;

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
  },
});
