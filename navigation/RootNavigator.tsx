import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import SearchScreen from "../screens/SearchScreen";
import { CurrencyInfo } from "../types/dataTypes";


export type RootStackParamList = {
    Home: undefined;
    Details: { coinInfo: CurrencyInfo };
    Search: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
            <Stack.Screen name="Search" component={SearchScreen} options={{headerShown: false}} />
            <Stack.Screen name="Details" component={DetailsScreen} options={{headerShown: false}} />
        </Stack.Navigator>
    );
};

export default RootNavigator;