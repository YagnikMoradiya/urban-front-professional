import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { COLORS, FONTS } from '../../utils/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ApiDelete, ApiGet, ApiPost, ApiPut } from '../../utils/helper';
import { Avatar } from 'react-native-elements';
import { camera, star } from '../../assets';
import { CustomButton, CustomInput } from '../../components';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

const ServiceScreen = ({ navigation }) => {
  const [ services, setServices ] = useState([]);
  const [ editOpen, setEditOpen ] = useState(false);
  const [ newOpen, setNewOpen ] = useState(false);

  const isFocused = useIsFocused();

  const { shop } = useSelector(state => state.shopData);

  const getServices = async () => {
    try {
      const serData = await ApiGet(`/service/${shop.id}`);
      setServices(serData.data);
    } catch (error) {
      console.error(error);
    }
  };

  const ServiceCard = ({ data }) => {
    const deleteService = async id => {
      try {
        await ApiDelete(`/service/delete-service/${id}`);
        getServices();
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <>
        <View style={styles.card_container}>
          <View style={styles.card_image_container}>
            <Avatar
              containerStyle={{ width: 100, height: 100 }}
              source={
                data.avatar
                  ? { uri: data.avatar }
                  : {
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Arh-avatar.jpg',
                  }
              }
            />
            <View style={styles.buttons_view}>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => setEditOpen(true)}>
                <AntDesign name="edit" size={25} color={COLORS.primary} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => deleteService(data._id)}>
                <AntDesign name="delete" size={25} color={COLORS.red} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.card_detail_container}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  ...FONTS.h3,
                  fontWeight: '400',
                }}>
                {data.name}
              </Text>
              <Text style={{ ...FONTS.body4 }}>{data.price} ₨</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    ...FONTS.body4,
                    paddingRight: 3,
                  }}>
                  {data.star}
                </Text>
                <Image
                  source={star}
                  style={{ width: 15, resizeMode: 'contain' }}
                />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="alarm-outline" size={15} />
                <Text style={{ ...FONTS.body4 }}>{data.time} min</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ flex: 1, flexWrap: 'wrap' }}>
                {data.description}
              </Text>
            </View>
          </View>
        </View>
        <EditServiceCard data={data} />
      </>
    );
  };

  const EditServiceCard = ({ data }) => {
    const [ name, setName ] = useState(data.name);
    const [ price, setPrice ] = useState(data.price.toString());
    const [ time, setTime ] = useState(data.time.toString());
    const [ description, setDescription ] = useState(data.description);
    const [ image, setImage ] = useState({ uri: '' });

    const chooseImage = () => {
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

    const editService = async id => {
      try {
        const formdata = new FormData();

        formdata.append('name', name);
        formdata.append('price', price);
        formdata.append('time', time);
        formdata.append('description', description);

        if (image.uri != '') {
          formdata.append('avatar', {
            uri: image.uri,
            type: image.type,
            name: image.fileName,
          });
        }
        await ApiPut(`/service/update-service/${id}`, formdata);
        setEditOpen(false);
        getServices();
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <Modal visible={editOpen} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setEditOpen(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
            <View
              style={{
                backgroundColor: COLORS.white,
                width: '90%',
                padding: 10,
                borderRadius: 30,
              }}>
              <Text style={{ textAlign: 'center', ...FONTS.h3 }}>
                Edit Employee
              </Text>
              <View style={{ marginTop: 30, marginBottom: 10 }}>
                <View style={{ alignItems: 'center' }}>
                  <Avatar
                    rounded
                    source={
                      data.avatar
                        ? { uri: data.avatar }
                        : image.uri
                          ? { uri: image.uri }
                          : camera
                    }
                    size="large"
                    onPress={chooseImage}
                  />
                </View>
                <View style={{ marginVertical: 5 }}>
                  <CustomInput
                    placeholder="service name"
                    value={name}
                    setValue={setName}
                  />
                </View>
                <View style={{ marginVertical: 5 }}>
                  <CustomInput
                    placeholder="price"
                    value={price}
                    setValue={setPrice}
                    type="decimal-pad"
                  />
                </View>
                <View style={{ marginVertical: 5 }}>
                  <CustomInput
                    placeholder="time"
                    value={time}
                    setValue={setTime}
                    type="decimal-pad"
                  />
                </View>
                <View style={{ marginVertical: 5 }}>
                  <CustomInput
                    placeholder="description"
                    value={description}
                    setValue={setDescription}
                  />
                </View>
              </View>
              <View style={{ alignItems: 'center', padding: 10, margin: 10 }}>
                <CustomButton
                  title="OK"
                  onPress={() => editService(data._id)}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  const NewServiceCard = () => {
    const [ name, setName ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ time, setTime ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ image, setImage ] = useState({ uri: '' });

    const chooseImage = () => {
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

    const createService = async () => {
      try {
        const formdata = new FormData();

        formdata.append('name', name);
        formdata.append('price', price);
        formdata.append('time', time);
        formdata.append('description', description);

        if (image.uri != '') {
          formdata.append('avatar', {
            uri: image.uri,
            type: image.type,
            name: image.fileName,
          });
        }
        await ApiPost('/service/add-service', formdata);
        setNewOpen(false);
        getServices();
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <Modal visible={newOpen} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setNewOpen(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
            <View
              style={{
                backgroundColor: COLORS.white,
                width: '90%',
                padding: 10,
                borderRadius: 30,
              }}>
              <Text style={{ textAlign: 'center', ...FONTS.h3 }}>
                New Service
              </Text>
              <View style={{ marginTop: 30, marginBottom: 10 }}>
                <View style={{ alignItems: 'center' }}>
                  <Avatar
                    rounded
                    source={image.uri ? { uri: image.uri } : camera}
                    size="large"
                    onPress={chooseImage}
                  />
                </View>
                <View style={{ marginVertical: 5 }}>
                  <CustomInput
                    placeholder="service name"
                    value={name}
                    setValue={setName}
                  />
                </View>
                <View style={{ marginVertical: 5 }}>
                  <CustomInput
                    placeholder="price (in rupee)"
                    value={price}
                    setValue={setPrice}
                    type="decimal-pad"
                  />
                </View>
                <View style={{ marginVertical: 5 }}>
                  <CustomInput
                    placeholder="time (in minute)"
                    value={time}
                    setValue={setTime}
                    type="decimal-pad"
                  />
                </View>
                <View style={{ marginVertical: 5 }}>
                  <CustomInput
                    placeholder="description"
                    value={description}
                    setValue={setDescription}
                  />
                </View>
              </View>
              <View style={{ alignItems: 'center', padding: 10, margin: 10 }}>
                <CustomButton title="OK" onPress={createService} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  useEffect(() => {
    getServices();
  }, [ isFocused ]);

  // useEffect(() => {
  //   console.log('services', services);
  // }, [services]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Services',
      headerStyle: { backgroundColor: COLORS.gray2 },
      headerTitleAlign: 'center',
      headerTintColor: COLORS.black,
      headerTitle: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.black,
              marginLeft: 10,
            }}>
            Services
          </Text>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{ padding: 5, marginRight: 15 }}
          onPress={() => setNewOpen(true)}>
          <AntDesign name="plus" size={25} color={COLORS.black} />
        </TouchableOpacity>
      ),
    });
  }, [ navigation ]);

  return (
    <View style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor={COLORS.gray2} barStyle="dark-content" />
      {services.length > 0 ? (
        <FlatList
          data={services}
          keyExtractor={(item, index) => `${item._id}`}
          renderItem={({ item, index }) => <ServiceCard data={item} />}
        />
      ) : (
        <View style={styles.no_content_view}>
          <Text style={styles.no_content_text}>No Services 😔😔</Text>
        </View>
      )}
      <NewServiceCard />
    </View>
  );
};

export default ServiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray2,
  },
  card_container: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 10,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  card_image_container: {
    paddingHorizontal: 5,
  },
  card_detail_container: {
    flex: 1,
    marginLeft: 5,
  },
  buttons_view: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
  },

  no_content_view: {
    flex: 1,
    marginTop: 50,
  },
  no_content_text: {
    textAlign: 'center',
    ...FONTS.h3,
  },
});
