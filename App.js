import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import Auth from './src/navigation/Auth';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Auth />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
