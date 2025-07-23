import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabsNavigation from './MainTabsNavigation';
import { RootStackParamList } from '../types';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';


const RootNavigator = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={MainTabsNavigation} />
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        </Stack.Navigator>
    );
}

export default RootNavigator