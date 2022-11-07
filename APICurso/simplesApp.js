import React, { useState } from 'react';
import { Alert, View, ScrollView, Text, Button, StyleSheet, } from 'react-native';

export default function App() {
  const [ cursoEscolhido, setCursoEscolhido ] = useState(null);

  const getCurso = () => {
    const endpoint = `http://academico3.rj.senac.br:8080/api/Curso`;

    fetch(endpoint)
      .then(resposta => resposta.json())
        .then( json => {
          const curso = {
            nome: json.nome,
            horas: json.horas,
          };
          setCursoEscolhido(curso);
        })
        .catch(() => {
          Alert.alert('Erro', 'Não foi possível carregar os dados do Curso');
        });
  }
  return (
    <View style={styles.container}>
      <Button style={styles.cardTitle}  title="ESCOLHA SEU CURSO" onPress={()=>getCurso()}/>
      <ScrollView>
        {cursoEscolhido != null && (
          <View style={styles.cursoBox}>
            <Text style={styles.cursoNome}>{cursoEscolhido.nome}</Text>
            <Text style={styles.cursoCargaHoraria}>Carga Horária: {cursoEscolhido.horas}</Text>
          </View>
        )}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 40, backgroundColor: '#fff' },

  topo: { height: 80, padding: 20, paddingTop: 100, marginBottom: 100, backgroundColor: '#e73e33' },
  topoTitulo: { fontSize: 22, marginBottom: 10, color: '#fff', textAlign: 'center'},

  cardContainer: { borderWidth: 1, borderColor: '#d5d5d5', borderRadius: 4, marginBottom: 10, marginHorizontal: 20, padding: 10 },
  cardTitle: { fontSize: 22, marginBottom: 20, textAlign: 'center', color: '#656565' },

  cursoBox: { alignItems: 'left' },
  cursoNome: { fontSize: 22 },
  cursoCargaHoraria: { fontSize: 18 },
});
