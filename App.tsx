import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import RootNavigator from './navigation/RootNavigator';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}

