import axios from 'axios';
import {getDataObj, getToken} from './storage.helper';

const BaseURL = 'http://localhost:5000/api/v1';

const defaultHeaders = {
  isAuth: true,
  AdditionalParams: {},
  isJsonRequest: true,
};

export const getHttpOptions = async (options = defaultHeaders) => {
  let headers = {
    Authorization: '',
    'Content-Type': 'application/json',
  };

  if (options.hasOwnProperty('isAuth') && options.isAuth) {
    headers['Authorization'] = (await getDataObj()) ?? '';
  }

  if (options.hasOwnProperty('isJsonRequest') && options.isJsonRequest) {
    headers['Content-Type'] = 'application/json';
  }

  if (options.hasOwnProperty('AdditionalParams') && options.AdditionalParams) {
    headers = {...headers, ...options.AdditionalParams};
  }

  return {headers};
};

export const ApiGet = type => {
  return new Promise(async (resolve, reject) => {
    axios
      .get(BaseURL + type, await getHttpOptions())
      .then(responseJson => {
        resolve(responseJson.data);
      })
      .catch(error => {
        if (
          error &&
          error.hasOwnProperty('response') &&
          error.response &&
          error.response.hasOwnProperty('data') &&
          error.response.data &&
          error.response.data.hasOwnProperty('error') &&
          error.response.data.error
        ) {
          reject(error.response.data.error);
        } else {
          reject(error);
        }
      });
  });
};

export const ApiGetNoAuth = type => {
  return new Promise((resolve, reject) => {
    axios
      .get(BaseURL + type, getHttpOptions({...defaultHeaders, isAuth: false}))
      .then(responseJson => {
        resolve(responseJson.data);
      })
      .catch(error => {
        if (
          error &&
          error.hasOwnProperty('response') &&
          error.response &&
          error.response.hasOwnProperty('data') &&
          error.response.data &&
          error.response.data.hasOwnProperty('error') &&
          error.response.data.error
        ) {
          reject(error.response.data.error);
        } else {
          reject(error);
        }
      });
  });
};

export const ApiPost = (type, userData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(BaseURL + type, userData, getHttpOptions())
      .then(responseJson => {
        resolve(responseJson.data);
      })
      .catch(error => {
        if (
          error &&
          error.hasOwnProperty('response') &&
          error.response &&
          error.response.hasOwnProperty('data') &&
          error.response.data &&
          error.response.data.hasOwnProperty('error') &&
          error.response.data.error
        ) {
          reject(error.response.data.error);
        } else {
          reject(error);
        }
      });
  });
};

export const ApiPostNoAuth = (type, userData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        BaseURL + type,
        userData,
        getHttpOptions({...defaultHeaders, isAuth: false}),
      )
      .then(responseJson => {
        resolve(responseJson.data);
      })
      .catch(error => {
        if (
          error &&
          error.hasOwnProperty('response') &&
          error.response &&
          error.response.hasOwnProperty('data') &&
          error.response.data &&
          error.response.data.hasOwnProperty('message') &&
          error.response.data.message
        ) {
          reject(error.response.data.message);
        } else {
          reject(error);
        }
      });
  });
};

export const ApiPatch = (type, userData) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(BaseURL + type, userData, getHttpOptions())
      .then(responseJson => {
        resolve(responseJson);
      })
      .catch(error => {
        if (
          error &&
          error.hasOwnProperty('response') &&
          error.response &&
          error.response.hasOwnProperty('data') &&
          error.response.data &&
          error.response.data.hasOwnProperty('error') &&
          error.response.data.error
        ) {
          reject(error.response.data.error);
        } else {
          reject(error);
        }
      });
  });
};

export const ApiDelete = (type, userData) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(BaseURL + type, getHttpOptions())
      .then(responseJson => {
        resolve(responseJson);
      })
      .catch(error => {
        if (
          error &&
          error.hasOwnProperty('response') &&
          error.response &&
          error.response.hasOwnProperty('data') &&
          error.response.data &&
          error.response.data.hasOwnProperty('error') &&
          error.response.data.error
        ) {
          reject(error.response.data.error);
        } else {
          reject(error);
        }
      });
  });
};

export const ApiPut = (type, userData) => {
  return new Promise((resolve, reject) => {
    axios
      .put(BaseURL + type, userData, getHttpOptions())
      .then(responseJson => {
        resolve(responseJson);
      })
      .catch(error => {
        if (
          error &&
          error.hasOwnProperty('response') &&
          error.response &&
          error.response.hasOwnProperty('data') &&
          error.response.data &&
          error.response.data.hasOwnProperty('error') &&
          error.response.data.error
        ) {
          reject(error.response.data.error);
        } else {
          reject(error);
        }
      });
  });
};
