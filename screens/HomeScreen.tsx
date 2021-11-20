import * as React from 'react';
import {Text ,View,Image, StyleSheet,FlatList} from 'react-native';
import ChatRoomItem from '../components/ChatRoomItem';
import chatRoomsData from '../assets/dummy-data/ChatRooms';

const chatRoom1 = chatRoomsData[0];
const chatRoom2 = chatRoomsData[1];

export default function HomeScreen(){
   return(
      <View style={styles.page}>
      <FlatList 
      data={chatRoomsData}
      renderItem={({item}) => <ChatRoomItem chatRoom={item}/>}
      showsVerticalScrollIndicator={false}
      />
      </View> 
      );
   } 
   
   const styles = StyleSheet.create({
      page:{
         backgroundColor: 'white',
         flex: 1
      }
   }
   );
