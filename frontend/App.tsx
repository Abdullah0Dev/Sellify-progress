
import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { StyleSheet, } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigator from './src/navigation/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
const App = () => {
  return (
    <GestureHandlerRootView style={styles.safeAreaContainer}>
      <NavigationContainer>
        <Provider store={store} >
          <PersistGate persistor={persistor}>
            <RootNavigator />
          </PersistGate>
        </Provider>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}

export default App

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  }
})