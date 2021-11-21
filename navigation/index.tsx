/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, Image, useWindowDimensions } from 'react-native';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import Homecreen from '../screens/HomeScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons'; 
import LinkingConfiguration from './LinkingConfiguration';
import HomeScreen from '../screens/HomeScreen';
import Auth from '@aws-amplify/auth';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} /> */}
      <Stack.Screen name="Home" component={HomeScreen} 
        options={{ headerTitle: HomeHeader}} 
      />
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen} options={{ headerTitle: ChatRoomHeader }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const HomeHeader = (props) => {
  
  const {width} = useWindowDimensions();
  const signOut = () => {
    Auth.signOut();
  };

  return (
    <View style={{
      flexDirection: 'row', 
      width, 
      justifyContent: 'space-between',
      padding: 7,
      alignItems: 'center',
      }}>
      <Pressable onPress={signOut}>
      <Image 
        source={{ uri: 'https://i.pinimg.com/564x/3a/4b/ae/3a4bae641951d783d4a6cb253c4f8233.jpg' }} 
        style={{width: 30, height: 30, borderRadius: 30,}}
      />
      </Pressable>
      <Text style={{flex: 1, textAlign: 'center', marginLeft: 50, fontWeight: 'bold', }}>Chatty</Text>
      <Feather name="camera" size={24} color="#3777f0" style= {{marginHorizontal: 10}}/>
      <MaterialCommunityIcons name="dots-vertical" size={24} color="#3777f0" style= {{marginHorizontal: 10}}/>
    </View>
  )
}

const ChatRoomHeader = (props) => {
  
  const {width} = useWindowDimensions();

  return (
    <View style={{
      flexDirection: 'row', 
      justifyContent: 'space-between',
      padding: 7,
      alignItems: 'center',
      width: width - 50,
      }}>
      <Image 
        source={{ uri: 'https://i.pinimg.com/564x/3a/4b/ae/3a4bae641951d783d4a6cb253c4f8233.jpg' }} 
        style={{width: 30, height: 30, borderRadius: 30,}}
      />
      <Text style={{flex: 1, marginLeft: 5, fontWeight: 'bold', }}>{props.children}</Text>
      <Feather name="camera" size={24} color="#3777f0" style= {{marginHorizontal: 10}}/>
      <MaterialCommunityIcons name="dots-vertical" size={24} color="#3777f0" style= {{marginHorizontal: 10}}/>
    </View>
  )
}


/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
