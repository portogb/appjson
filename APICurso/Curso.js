import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, FlatList, StyleSheet, Image, View} from "react-native";

export default function Curso() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const resp = await fetch("http://academico3.rj.senac.br:8080/api/Curso");
    const data = await resp.json();
    setData(data);
  };

  
  useEffect(() => {
    fetchData();
  }, []);
  
  const renderItem = 
    ({ item }) => (
    <View style={styles.listItem}>
      <View style={{flex:1}}>
        <Text style={{textAlign:"center", fontWeight:"bold", fontSize:20, paddingBottom: 10}}>{item.nome}</Text>
        <Text style={{alignItems:"left"}}>Carga Horária: {item.horas}</Text>
        <Text style={{alignItems:"left"}}>Tipo: {item.cursoTipo.descricao}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
        <Image
        style={styles.tinyLogo}
        source={require('./assets/senac.png')}/>
          <FlatList
            data={data}
            renderItem={renderItem}
          />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        marginTop:60
      },
      listItem:{
        margin:10,
        padding:10,
        backgroundColor:"#FFF",
        width:"80%",
        flex:1,
        alignSelf:"center",
        flexDirection:"row",
        borderRadius:5
      },
      tinyLogo: {
        flex:1,
        alignSelf:"center",
        resizeMode: "contain"
      },
  });