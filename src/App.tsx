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
   View,
 } from 'react-native';
 import { GestureHandlerRootView } from 'react-native-gesture-handler';
 import {
   Colors,
 } from 'react-native/Libraries/NewAppScreen';
 import Home from './screens/home';
 
 
 function App(): JSX.Element {
   const isDarkMode = useColorScheme() === 'dark';
 
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };
 
   return (
     <GestureHandlerRootView style={{ flex: 1 }}>
     <Home />
   </GestureHandlerRootView>
   );
 }
 
 const styles = StyleSheet.create({
 });
 
 
 export default App;
 