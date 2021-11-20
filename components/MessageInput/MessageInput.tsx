import React, {useState} from "react";
import { Text, View} from "../Themed";
import { StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform} from "react-native";
import { Fontisto, MaterialCommunityIcons, AntDesign, Ionicons, Feather } from '@expo/vector-icons'; 


const MessageInput = () => {

    const [message, setMessage] = useState('');

    const sendMessage = () => {
        console.warn("sending: ", message);
        setMessage('');
    }

    const onPlusClicked = () => {
        console.warn("On plus clicked");
    }

    const onPress = () => {
        if (message) {
            sendMessage();
        }else {
            onPlusClicked();
        }
    }

    return (
        <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={100}
        >
            <View style ={styles.inputContainer} >
                <Fontisto name="slightly-smile" size={24} color="#3777f0" style ={styles.icon} />  
                <TextInput style = {styles.input}
                    placeholder = 'Chatty'
                    value = {message}
                    onChangeText={setMessage}
                />
                <Ionicons name="mic-outline" size={24} color="#3777f0" />
                <MaterialCommunityIcons name="camera-plus-outline" size={24} color="#3777f0" style = {styles.icon} />
            </View>
            <Pressable onPress = {onPress} style ={styles.buttonContainer}>
                {message ? <Feather name="send" size={26} color="#3777f0" style = {styles.icon} /> : <AntDesign name="pluscircle" size={26} color="#3777f0" style = {styles.icon}/>}
            </Pressable >
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        padding: 10,
    },

    inputContainer: {
        backgroundColor: '#f2f2f2',
        flex: 1,
        marginRight: 10,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#dedede',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 5,
    },

    input: {
        flex: 1,
        marginHorizontal: 5,
    },

    icon: {
        marginHorizontal: 5,
    },

    buttonContainer: {
        width: 40,
        height: 40,
        // backgroundColor: '#3777f0',
        borderRadius: 25,
        justifyContent: 'center',
        alignContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 35,
    }
});

export default MessageInput;

