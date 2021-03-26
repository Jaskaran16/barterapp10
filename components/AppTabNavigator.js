import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AppStackNavigator } from './AppStackNavigator'
import ExchangeScreen from '../screens/Exchange';

export const AppTabNavigator= createBottomTabNavigator({
    TradeThings:{
        screen: AppStackNavigator,
        naviagationOptions:{
            tabBarIcon:<Image source = {require("../assets/request-list.png")} style={{width:20, heigth:20}}/>,
            tabBarLabel: "Trade Things",
        },
       ThingRequest:{
            screen: ExchangeScreen,
            naviagationOptions:{
                tabBarIcon: <Image source = {require("../assets/request-book.png")} style= {{width:20, heigth:20}}/>,
                tabBarLabel: "Request Things"
            }
        }
    }
});