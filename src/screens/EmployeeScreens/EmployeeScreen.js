import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { COLORS, FONTS } from '../../utils/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ApiDelete, ApiGet, ApiPost, ApiPut } from '../../utils/helper';
import { CustomButton, CustomInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';

const EmployeeScreen = ({ navigation }) => {
  const [ employees, setEmployees ] = useState([]);
  const [ open, setOpen ] = useState(false);
  const [ openNew, setOpenNew ] = useState(false);
  // const [name, setName] = useState('');
  // const [experience, setExperience] = useState(0);
  // const [phone, setPhone] = useState('+91');
  const isFocused = useIsFocused();

  const getEmployees = async () => {
    try {
      const employeesData = await ApiGet('/worker');
      setEmployees(employeesData.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEmployee = async id => {
    try {
      await ApiDelete(`/worker/${id}`);
      getEmployees();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, [ isFocused ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Employees',
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
            Employees
          </Text>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{ padding: 5, marginRight: 15 }}
          onPress={() => setOpenNew(true)}>
          <AntDesign name="plus" size={25} color={COLORS.black} />
        </TouchableOpacity>
      ),
    });
  }, [ navigation ]);

  const EmployeeCard = ({ data }) => {
    return (
      <>
        <View style={styles.card_container}>
          <View style={styles.card_container_left}>
            <Avatar
              size="large"
              rounded
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyVSEPJut2FtINpbexjlW-PxQjDqV_jspoSw&usqp=CAU',
              }}
            />
          </View>

          <View style={styles.card_container_right}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[ styles.card_text, { flex: 1, flexWrap: 'wrap' } ]}>
                Name: {data.name}
              </Text>
            </View>
            <Text style={styles.card_text}>Experience: {data.experience}</Text>
            <Text style={styles.card_text}>Phone: {data.phone} </Text>
          </View>

          <View style={styles.delete_button_view}>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => deleteEmployee(data._id)}>
              <AntDesign name="delete" size={25} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={() => setOpen(true)}>
              <AntDesign name="edit" size={25} />
            </TouchableOpacity>
          </View>
        </View>
        <DetailCard data={data} />
      </>
    );
  };

  const DetailCard = ({ data }) => {
    const [ name, setName ] = useState(data.name);
    const [ experience, setExperience ] = useState(data.experience.toString());
    const [ phone, setPhone ] = useState(data.phone);

    const editEmployee = async id => {
      try {
        const formdata = new FormData();

        if (phone && phone.length > 0) var p = phone.split(' ');

        formdata.append('name', name);
        formdata.append('phone', '+91 ' + p[ p.length - 1 ]);
        formdata.append('experience', experience);
        // formdata.append('avatar', {
        //   uri: image.uri,
        //   type: image.type,
        //   name: image.fileName,
        // });

        await ApiPut(`/worker/update-worker/${id}`, formdata);
        setOpen(false);
        getEmployees();
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <Modal visible={open} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
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
                <View style={{ marginVertical: 5 }}>
                  <CustomInput
                    placeholder="Name"
                    value={name}
                    setValue={setName}
                  />
                </View>
                <View style={{ marginVertical: 5 }}>
                  <CustomInput
                    placeholder="Experience"
                    value={experience}
                    setValue={setExperience}
                    type="decimal-pad"
                  />
                </View>
                <View style={{ marginVertical: 5 }}>
                  <CustomInput
                    placeholder="phone"
                    value={phone}
                    setValue={setPhone}
                    type="decimal-pad"
                  />
                </View>
              </View>
              <View style={{ alignItems: 'center', padding: 10, margin: 10 }}>
                <CustomButton
                  title="OK"
                  onPress={() => editEmployee(data._id)}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  const NewEmployeeCard = () => {
    const [ name, setName ] = useState('');
    const [ experience, setExperience ] = useState('');
    const [ phone, setPhone ] = useState('');

    const addEmployee = async () => {
      try {
        const formdata = new FormData();

        if (phone && phone.length > 0) var p = phone.split(' ');

        formdata.append('name', name);
        formdata.append('phone', '+91 ' + p[ p.length - 1 ]);
        formdata.append('experience', experience);

        await ApiPost('/shop/add-employee', formdata);
        setOpenNew(false);
        getEmployees();
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <Modal visible={openNew} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setOpenNew(false)}>
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
                Add Employee
              </Text>
              <View style={{ marginTop: 30, marginBottom: 10 }}>
                <View style={{ marginVertical: 5 }}>
                  <CustomInput
                    placeholder="Name"
                    value={name}
                    setValue={setName}
                  />
                </View>
                <View style={{ marginVertical: 5 }}>
                  <CustomInput
                    placeholder="Experience"
                    value={experience}
                    setValue={setExperience}
                    type="decimal-pad"
                  />
                </View>
                <View style={{ marginVertical: 5 }}>
                  <CustomInput
                    placeholder="phone"
                    value={phone}
                    setValue={setPhone}
                    type="decimal-pad"
                  />
                </View>
              </View>
              <View style={{ alignItems: 'center', padding: 10, margin: 10 }}>
                <CustomButton title="OK" onPress={addEmployee} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor={COLORS.gray2} barStyle="dark-content" />
      {employees.length > 0 ? (
        <>
          {employees.map(employee => (
            <EmployeeCard key={employee._id} data={employee} />
          ))}
        </>
      ) : (
        <View style={styles.no_content_view}>
          <Text style={styles.no_content_text}>No Employee 👲👲</Text>
        </View>
      )}
      <NewEmployeeCard />
    </ScrollView>
  );
};

export default EmployeeScreen;

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
  card_container_left: {
    justifyContent: 'center',
  },
  card_container_right: {
    flex: 1,
    marginLeft: 10,
    textAlign: 'left',
    justifyContent: 'center',
  },
  card_text: {
    fontWeight: '700',
  },
  delete_button_view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginVertical: 5,
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
