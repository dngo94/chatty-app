import * as React from 'react';
import {Text ,View, StyleSheet} from 'react-native';

export default function TabOneScreen()
   return(
      <View style= {styles.container}>
      <Image source={{uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png'}} style={styles.image} />
      <View>
       <View style={styles.row}>
         <Text  style={styles.name}> Elon Musk</Text>
         <Text  style={styles.text}> 11:11 AM </Text> 
      </View>
       <Text style={styles.text}>Hola Hola  coca cola </Text> 
      </View>
      </View>
      );
   } 


   const styles = StyleSheet.create({
    container: {
      flexDirection: 'row' ,
      padding: 10, 
    },
    image: {
     height: 60,
     width: 60,
     borderRadius: 30,
     marginRight: 10,
     },
     
    text: {
 
    fontSize: 30,
    color: 'blue'
    }
  });
