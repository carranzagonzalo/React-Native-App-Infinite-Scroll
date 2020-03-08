import React, { Component } from 'react';

import { View, Text, FlatList, StyleSheet, ActivityIndicator} from 'react-native';


export default class App extends Component {
  state = {
    data: [],
    loading: false,
  };


  componentDidMount() {
    this.loadQuestions();
  }

  loadQuestions = async () => {
    if (this.state.loading) return;

    const { page } = this.state;

    this.setState({ loading: true });


    const response = await fetch('http://5e16456b22b5c600140cf9bf.mockapi.io/api/v1/questions?page=1&limit=10');
    const questions = await response.json();

    this.setState({
      data: [ ...this.state.data, ...questions ],
      loading: false,
    });
  }

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  };

  renderItem = ({ item }) => (


    <View style={styles.listItem}>

      <Text style={styles.text}>{item.numero}</Text>
      
      <Text style={styles.text}>{item.pregunta}</Text>

      <Text style={styles.text}>{item.respuesta}</Text>

    </View>
  );

  render() {
    return (

      
      <FlatList
        style={{ marginTop: 30 }}
        contentContainerStyle={styles.list}
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={item => item.numero}
        onEndReached={this.loadQuestions}
        onEndReachedThreshold={0.1}
        ListFooterComponent={this.renderFooter}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 10,
 
  },

  text: {
  color: '#aac1c8',
  },

  listItem: {
    backgroundColor: '#6c275f',
    marginTop: 20,
    padding: 30,
  },

  loading: {
    alignSelf: 'center',
    marginVertical: 20,
  },
});


