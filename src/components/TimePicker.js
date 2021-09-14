import moment from 'moment';
import React from 'react';
import {
  Animated,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {COLORS, SIZES} from '../utils/theme';

const HOUR = [...Array(24).keys()];
const MINUTE = [...Array(59).keys()];

const PickerButton = ({title}) => {
  return (
    <TouchableHighlight
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        margin: 5,
        padding: 5,
      }}>
      <Text>{title}</Text>
    </TouchableHighlight>
  );
};

const TimePicker = ({visible}) => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Text style={{textAlign: 'center'}}>{moment().format('HH:mm')}</Text>
      <Modal visible={visible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.centeredContainer}>
            <View style={styles.timeContainer}>
              <View style={styles.flatListContainer}>
                <Animated.FlatList
                  data={HOUR}
                  keyExtractor={item => item.toString()}
                  showsVerticalScrollIndicator={false}
                  snapToInterval={15}
                  onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: scrollY}}}],
                    {useNativeDriver: true},
                  )}
                  renderItem={({item, index}) => {
                    const inputRange = [
                      (index - 1) * 15,
                      index * 15,
                      (index + 1) * 15,
                    ];

                    const opacity = scrollY.interpolate({
                      inputRange,
                      outputRange: [0.4, 1, 0.4],
                    });

                    const scale = scrollY.interpolate({
                      inputRange,
                      outputRange: [0.4, 1, 0.4],
                    });

                    return (
                      <View
                        style={{
                          padding: 10,
                        }}>
                        <Animated.Text style={{opacity, transform: [{scale}]}}>
                          {item}
                        </Animated.Text>
                      </View>
                    );
                  }}
                />
              </View>
              <View style={styles.flatListContainer}>
                <FlatList
                  data={MINUTE}
                  keyExtractor={item => item.toString()}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item, index}) => {
                    return (
                      <View
                        style={{
                          padding: 10,
                        }}>
                        <Text>{item}</Text>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                marginTop: 10,
              }}>
              <PickerButton title="Cancel" />
              <PickerButton title="OK" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TimePicker;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContainer: {
    height: 250,
    margin: 20,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  timeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  flatListContainer: {
    height: 150,
    margin: 5,
  },
});
