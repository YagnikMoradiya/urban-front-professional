import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {COLORS, FONTS, SIZES} from '../../utils/theme';
import {useState} from 'react';
import moment from 'moment';
import {CustomNextButton} from '../../components';

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

const GeneralDetail = ({navigation}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [openingShow, setOpeningShow] = useState(false);
  const [closingShow, setClosingShow] = useState(false);
  const [openingTime, setOpeningTime] = useState(new Date());
  const [closingTime, setClosingTime] = useState(new Date());
  const [name, setName] = useState('');

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

  return (
    <View style={styles.container}>
      <ScrollView style={styles.card}>
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
            itemStyle={{...FONTS.body4, color: COLORS.gray1}}
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
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
                display="spinner"
                onChange={onChangeOpening}
              />
            )}
            <View style={{alignItems: 'center'}}>
              <TouchableHighlight onPress={() => setOpeningShow(true)}>
                <Text style={{color: COLORS.black, ...FONTS.body4}}>
                  {moment(openingTime).format('HH:mm')}
                </Text>
              </TouchableHighlight>
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
              <TouchableHighlight onPress={() => setClosingShow(true)}>
                <Text style={{color: COLORS.black, ...FONTS.body4}}>
                  {moment(closingTime).format('HH:mm')}
                </Text>
              </TouchableHighlight>
              <Text style={{color: COLORS.gray, ...FONTS.body4}}>
                Closing Time
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CustomNextButton
          title="Next"
          onPress={() => navigation.push('AddressDetail')}
        />
      </View>
    </View>
  );
};

export default GeneralDetail;

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
    flexBasis: 1,
  },
});
