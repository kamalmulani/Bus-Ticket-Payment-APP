import React, { Component } from 'react';
import {Button,Icon,Text,Picker,Container,Content, Form,Item, Root, Toast} from 'native-base';
import { StackActions } from '@react-navigation/native';

class Buspay extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedfrom: this.props.station[0].name,
        selectedto: this.props.station[1].name
    };
  }

  onValueChangefrom(value: string) {
    this.setState({
      selectedfrom: value
    });
  }

  onValueChangeto(value: string) {
    this.setState({
      selectedto: value
    });
  }

  tostclosed(){
    
  }

  render() {
    return (
      <Root>
          <Content padder>
          
              <Text>BUS NAME : {this.props.bname}</Text>
              <Text>BUS NO : {this.props.bnum}</Text>
              <Text style={{fontSize:24,alignSelf:'center',textDecorationLine:'underline',
              textTransform:'capitalize',marginTop:15,marginBottom:15}}>Purchase Ticket</Text>
             
              <Form>
              <Text style={{width:'20%', fontSize:16,marginLeft:8}}>From :</Text>
            <Item picker>
              <Picker
                mode='dropdown'
                style={{ width: '70%' }}
                placeholder="FROM"
                placeholderStyle={{ color: "#bfc6ea" }}
                
                selectedValue={this.state.selectedfrom}
                onValueChange={this.onValueChangefrom.bind(this)}
              >
                {this.props.station.map(e=>{ console.log(this.state.selectedfrom); return <Picker.Item  label={e.name} value={e.name} key={e.k} />})}
              </Picker>
              
            </Item>

            <Text style={{width:'20%', fontSize:16,marginLeft:8,marginTop:20}}>To :</Text>
            <Item picker>
              <Picker
                mode='dropdown'
                style={{ width: '70%' }}
                placeholder="To"
                placeholderStyle={{ color: "#bfc6ea" }}
                
                selectedValue={this.state.selectedto}
                onValueChange={this.onValueChangeto.bind(this)}
              >
                {this.props.station.map(e=>{ 
                  
                  return <Picker.Item label={e.name} value={e.name} key={e.k} />})}
              </Picker>
              </Item>
          </Form>
              <Button style={{marginTop:20}} onPress={()=>{Toast.show({text:'PayTm Integration pending',duration:5000,buttonText:"ok", position:'bottom',onClose:this.props.navigation.goBack})}}><Text>Pay</Text></Button>
          </Content>
      </Root>
    );
  }
}

export default Buspay;
