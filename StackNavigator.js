import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "./screen/HomeScreen";
import {Entypo} from "@expo/vector-icons";
import {Ionicons} from '@expo/vector-icons';
import {AntDesign} from "@expo/vector-icons";
import SearchScreen from "./screen/SearchScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import LoginScreen from "./screen/LoginScreen";
import {LinearGradient} from "expo-linear-gradient";
import ConcertScreen from "./screen/ConcertScreen";
import {Foundation} from '@expo/vector-icons';
import ArtistDetailsScreen from "./screen/ArtistDetailsScreen";

const Tab = createBottomTabNavigator();

function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    shadowOpacity: 5,
                    shadowRadius: 5,
                    elevation: 4,
                    shadowOffset: {
                        width: 0,
                        height: -4
                    },
                    borderTopWidth: 0,
                },
                tabBarBackground: () => (
                    <LinearGradient
                        colors={["transparent", "rgba(0,0,0,0.5)"]}
                        style={{flex: 1}}
                    />
                )
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: "Home",
                    headerShown: false,
                    tabBarLabelStyle: {color: "white"},
                    tabBarIcon: ({focused}) =>
                        focused ? (
                            <Entypo name="home" size={24} color="white"/>
                        ) : (
                            <AntDesign name="home" size={24} color="white"/>
                        ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarLabel: "Search",
                    headerShown: false,
                    tabBarLabelStyle: {color: "white"},
                    tabBarIcon: ({focused}) =>
                        focused ? (
                            <Ionicons name="search" size={24} color="white"/>
                        ) : (
                            <Ionicons name="search" size={24} color="white"/>
                        ),
                }}
            />
            <Tab.Screen
                name="Concert"
                component={ConcertScreen}
                options={{
                    tabBarLabel: "Concerts",
                    headerShown: false,
                    tabBarLabelStyle: {color: "white"},
                    tabBarIcon: ({focused}) =>
                        focused ? (
                            <Entypo name="ticket" size={24} color="white"/>
                        ) : (
                            <Foundation name="ticket" size={24} color="white"/>
                        ),
                }}
            />
        </Tab.Navigator>
    );
}


const Stack = createNativeStackNavigator();

function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Main" component={BottomTabs} options={{headerShown: false}}/>
                <Stack.Screen name="ArtistDetailsScreen" component={ArtistDetailsScreen}
                              options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation