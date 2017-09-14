/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  WebView,
  Alert,
  TouchableHighlight,
  TextInput
} from 'react-native';

const {width, height} = Dimensions.get('window'); 

export default class startdemo extends Component {
  constructor(props){
    super(props)
    this.state = {
        msg: '',
        infos:[]
    };
  }
  // 接收值H5传过来的值
  onReceive(e){
    Alert.alert(e.nativeEvent.data)
  }

  txtchange(e){
    this.setState({
      msg: e.nativeEvent.text
    });
  }

  // 传递给H5值
  sendToh5(){
    if(this.refs.webview){
      this.refs.webview.postMessage('receivemsg("'+ this.state.msg +'");');
    }      
    else
      Alert.alert('error');
  }

  render() {
    let _url="http://192.168.43.86:7001?v="+(new Date())
    // let _url="https://m.taobao.com/?sprefer=sypc00#index"
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native for Cuity start Demo!
        </Text>
        <View>
          <TextInput ref="txtmsg" placeholder="请输入..." value={this.state.msg} onChange={(e)=>this.txtchange(e)} style={styles.txtinput} />
        </View>
        <TouchableHighlight style={styles.btn} underlayColor={'#ff0000'} onPress={this.sendToh5.bind(this)}>
          <Text>
            发送给H5
          </Text>
        </TouchableHighlight>
        <WebView 
          ref="webview" 
          style={{width:width,height:height-20,backgroundColor:'#FFFFFF'}}  
          source={{uri: _url,method: 'GET'}}  
          javaScriptEnabled={true}  
          domStorageEnabled={true}  
          scalesPageToFit={false}
          onMessage={ this.onReceive.bind(this) }  
          injectedJavaScript="document.addEventListener('message',function(e){ eval(e.data) })"
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  txtinput:{
    width:200
  }
});

AppRegistry.registerComponent('startdemo', () => startdemo);

