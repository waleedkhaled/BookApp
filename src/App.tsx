/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Home from './screens/home';
import { ApolloProvider } from '@apollo/client';
import client from './apollo';


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
});


export default App;
