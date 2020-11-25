/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import MapView from 'react-native-maps';
import {requestMultiple,checkMultiple, PERMISSIONS} from 'react-native-permissions';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  
  StatusBar,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';
import Mps from "./comp/mps";
import Buspay from "./comp/buspay";

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App: () => React$Node = () => {
 
  

  requestMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]).then(
    (statuses) => {
      console.log('FINE LOCATION', statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]);
      console.log('COARSE LOCATION', statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]);
      
    },
  ); 



checkMultiple([PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]).then(
  (statuses) => {
    if(statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]=='denied' && statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]=='denied'){
      requestMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]).then(
        (statuses) => {
          console.log('FINE LOCATION', statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]);
          console.log('COARSE LOCATION', statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]);
          
        },
      );
    }
  },
);

function HomeScreen({ navigation }){
  return <Tabs tabBarPosition='bottom'>
  <Tab heading={ <TabHeading><Icon name="bus" /></TabHeading>}>
    <Mps navigation={navigation} />
     </Tab>
  
  
  <Tab heading={ <TabHeading><Icon name="person" /></TabHeading>}>
    
  </Tab>
</Tabs>
}

function Paymentsc({route, navigation}){
  const {bname}=route.params;
  const {bnum}=route.params;
  const {station}=route.params;
  return <Buspay bname={bname} station={station} bnum={bnum} navigation={navigation} />
}


  return (
    <>
       <NavigationContainer>
       <Stack.Navigator>
        <Stack.Screen
          name="main"
          component={HomeScreen}
          options={{headerShown:false}}
          
        />
        <Stack.Screen name="Profile" component={Paymentsc} />
      </Stack.Navigator>
        
      </NavigationContainer> 
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
