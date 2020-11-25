import React, { Component } from 'react';
import {   SafeAreaView,Dimensions,StyleSheet,ScrollView } from 'react-native';
import MapView, { Circle } from 'react-native-maps';
import { View,Button, Icon,Container,Content,Text, Body } from 'native-base';
import Geolocation from 'react-native-geolocation-service';
import { Marker,MarkerAnimated,MapViewAnimated } from 'react-native-maps';
import { getDistance } from 'geolib';
var {height, width} = Dimensions.get('window');
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
var mapstyle=[
  {
    "featureType": "landscape.natural",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "elementType": "labels.icon",
    
  },
  {
    "featureType": "poi.place_of_worship",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
]
class Mps extends Component {
    
  constructor(props) {
    
    super(props);
    this.state = {
        uposlat:0,
        uposlan:0,
        buspos:[{latitude:16.67928,longitude:74.27129,busnumber:'1234',discription:"bus 1",
      station:[{k:'1',name:'station1'},{k:'2',name:'station2'},{k:'3',name:'station3'}]},
          {latitude:16.65378,longitude:74.26929,busnumber:'5678',discription:"bus 2",
          station:[{k:'a',name:'stationA'},{k:'b',name:'stationB'},{k:'c',name:'stationC'}]},
          {latitude:16.65728,longitude:74.26729,busnumber:'9101',discription:"bus 3",
          station:[{k:'1',name:'station1'},{k:'2',name:'station2'},{k:'3',name:'station3'}]},
          {latitude:16.66278,longitude:74.26729,busnumber:'1213',discription:"bus 4",
          station:[{k:'1',name:'station1'},{k:'2',name:'station2'},{k:'3',name:'station3'}]},
          {latitude:16.65670,longitude:74.26710,busnumber:'1415',discription:"bus 5",
          station:[{k:'a',name:'stationA'},{k:'b',name:'stationB'},{k:'c',name:'stationC'}]},]
    };
  }
  
  changeSToUser(){
    Geolocation.getCurrentPosition(
        (position) => {
          var lat=position['coords']['latitude'];
          var lon=position['coords']['longitude'];
          this.setState({uposlat:lat});
          this.setState({uposlan:lon});
          this.map.animateCamera({center:{latitude:lat,longitude:lon},zoom:16});
         
         
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true }
    );
    
      
  }

  updatemaptouser(cords){
    this.setState({uposlat:cords.latitude});
    this.setState({uposlan:cords.longitude});
    this.map.animateCamera({center:{latitude:cords.latitude,longitude:cords.longitude},zoom:16});
    this.forceUpdate();
  }

  buspressed(busno){
    console.log(busno);
  }

  circlechange(){
    var objnear={}
    objnear
    return <Circle  fillColor='rgba(25, 60, 25, 0.2)' center={{latitude:this.state.uposlat,longitude:this.state.uposlan}} radius={200} />
  }

  render() {
    return (
      <Container>
      <Content>
        <MapView
        
        onMapReady={()=>this.changeSToUser()}
        
            showsUserLocation={true}
            onUserLocationChange={e=>this.updatemaptouser(e.nativeEvent.coordinate)}
            customMapStyle={mapstyle}
            style={stylex.map}
            ref={ref => {
            this.map = ref;
          }}
        >{this.circlechange()}
        
        {this.state.buspos.map(marker => {
          if(getDistance({latitude:marker.latitude,longitude:marker.longitude},{latitude:this.state.uposlat,longitude:this.state.uposlan})<=150){

    return <Marker
      coordinate={{latitude:marker.latitude,longitude:marker.longitude}}
      title={marker.busnumber}
      onPress={e=>console.log(marker.busnumber)}
      key={marker.busnumber}
    ><Icon name='bus'  style={{color:'purple',fontSize:18}}/><Text style={{color:'red',fontSize:18}}>{marker.discription}</Text></Marker>}
          
        })}
        
        </MapView>
        </Content>
        <Content style={{marginTop:20}} padder={true}>
        <Text style={{alignSelf:'center'}}> Busses near you</Text>
        <Body>
         {this.state.buspos.map(marker => {
          if(getDistance({latitude:marker.latitude,longitude:marker.longitude},{latitude:this.state.uposlat,longitude:this.state.uposlan})<=150){
            return <Button block onPress={()=>this.props.navigation.navigate('Profile',{bnum:marker.busnumber,station:marker.station,bname:marker.discription})} style={{marginTop:3,marginBottom:3}} key={marker.busnumber} ><Icon name='bus'/><Text>{marker.discription}</Text></Button>
}})}
</Body>
          </Content>
        
      
          </Container>
    );
  }
}

const stylex = StyleSheet.create({
    map: {
        width: width, height: height/2
   },
  });

export default Mps;
