import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';
import { TabNavigatorParamList } from '../types';
import CustomTabBar from '../components/CustomTabBar';

const MainTabsNavigation = () => {
    const Tab = createBottomTabNavigator<TabNavigatorParamList>();

    return (
        <Tab.Navigator
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBar={((props) => <CustomTabBar
                onChange={() => { }}
                data={[
                    { label: "Home", name: 'House', route: 'Home' },
                    { label: "Cart", name: 'ShoppingCart', route: 'Cart' },
                    { label: "Profile", name: 'User', route: 'Profile' },
                ]}
                {...props} />)}
            screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    )
}

export default MainTabsNavigation