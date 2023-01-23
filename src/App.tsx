import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import FlashMessage from 'react-native-flash-message';
import {Loading} from './components';
import {useAppSelector} from './redux/hooks';
import Router from './router';
import {Provider} from 'react-redux';
import {store} from './redux/store';

const MainApp = () => {
  const loadingState = useAppSelector(state => state.loading.isLoading);
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {loadingState && <Loading />}
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
