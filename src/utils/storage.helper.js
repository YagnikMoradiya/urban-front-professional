import AsyncStorage from '@react-native-async-storage/async-storage';

export const setDataObj = async (data, key) => {
  return new Promise(async (resolve, reject) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const getDataObj = (key = 'token') => {
  return new Promise(async (resolve, reject) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue != null) {
        resolve(JSON.parse(jsonValue));
      }
      resolve(null);
    } catch (error) {
      reject(error);
    }
  });
};

export const removeDataObj = key => {
  return new Promise(async (resolve, reject) => {
    try {
      await AsyncStorage.removeItem(key);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
