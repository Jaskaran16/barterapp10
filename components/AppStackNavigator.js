import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import ThingTradeScreen from '../screens/Exchange';

export const AppStackNavigator = createStackNavigator({
    ThingDonateList:{
        screen: ThingTradeScreen,
        navigationOptions:{
            headerShown: false
        }
    }
},
{
    initialRouteName: 'ThingDonateList'
}
)