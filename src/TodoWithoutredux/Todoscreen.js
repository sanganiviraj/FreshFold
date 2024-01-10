import { StyleSheet, Text, View , TextInput,FlatList,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
// import { TextInput } from 'react-native-gesture-handler';
import { windowwidth } from '../Componets/Constant';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { FlatList } from 'react-native-gesture-handler';

const Todoscreen = () => {
    const [todo,settodo] = useState('');
    const [todolist , settodolist] = useState([]);

    if (__DEV__) {
        import("../ReactotronConfig").then(() => console.log("Reactotron Configured"));
    }


    const Data = [
        {
            name:'gym'
        },
        {
            name:'gym'
        },
        {
            name:'gym'
        }
    ]

    const _onaddlist = ( ) => {
        settodolist([...todolist , {titile : todo , id: Date.now().toString()}])
    }

    const _ondeleteitem = (item) => {
        const data = todolist.filter((i) => i.id !==)
    }

    console.log("todolist => " , todolist);

    return (
        <View style={styles.screen}>
            <TextInput
                style={styles.box}
                placeholder='Enter todolist'
                value={todo}
                onChangeText={(item) => {settodo(item)}}
            />

            <TouchableOpacity style={styles.square} onPress={() => {_onaddlist()}}>
                <Text style={{color:"black",fontSize:28}}> + </Text>
            </TouchableOpacity>

            <View style={{width:windowwidth,height:2,backgroundColor:"black",marginTop:20}}>
            </View>

            <FlatList 
                data={todolist}
                renderItem={({item}) => {
                    return(
                        <View style={styles.container}>
                            
                            <Text style={{color:'black',fontSize:24}}> {item.titile} 
                            </Text>

                            <TouchableOpacity  onPress={() => {_ondeleteitem(item)}}
                            style={{height:40,width:40,backgroundColor:'blue'}}/>
                        </View>    
                    )
                }}
            />

        </View>
    )
}

export default Todoscreen

const styles = StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor:'white'
    },
    box:{
        width:(windowwidth*90)/100,
        height:60,
        borderRadius:12,
        borderWidth:1,
        borderColor:"black",
        alignSelf:'center',
        marginTop:50,
        color:'black'
    },
    container:{
        width:(windowwidth*90)/100,
        height:60,
        borderRadius:12,
        justifyContent:"space-between",
        paddingHorizontal:10,
        flexDirection:'row',
        alignItems:"center",
        backgroundColor:"#a2d2ff",
        marginVertical:10,
        alignSelf:'center'
    },
    square:{
        height:50,
        width:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:"#a2d2ff",
        marginTop:10,
        marginLeft:20
    }
})