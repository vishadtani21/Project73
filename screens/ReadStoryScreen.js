import * as React from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity} from 'react-native';

import { SearchBar } from 'react-native-elements';
import db from '../config';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      allStories: [],
      dataSource: [],
      search: '',
    };
  }

  componentDidMount() {
    this.retrieveStories();
  }

  updateSearch = (search) => {
    this.setState({ search });
  };

  retrieveStories = () => {
    try {
      var allStories = [];
      var stories = db
        .collection('User Stories')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            allStories.push(doc.data());
            console.log('User Stories', allStories);
          });
          this.setState({ allStories });
        });
    } catch (error) {
      console.log(error);
    }
  };

   SearchFilterFunction(text) {
    const newData = this.state.allStories.filter((item) => {
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <View styles={{ height: 20, width: '100%', }}>
          <SearchBar style = {styles.searchBar}
            placeholder="Write title of your story here."
            onChangeText={(text) => this.SearchFilterFunction(text)}
            onClear={(text) => this.SearchFilterFunction('')}
            value={this.state.search}
          />
        </View>

        <ScrollView>
          <View>
            {this.state.search === ''
              ? this.state.allStories.map((item) => (
                  <View
                    style={{
                      borderColor: 'black',
                      borderWidth: 2,
                      padding: 10,
                      alignItems: 'center',
                      margin: 10,
                      backgroundColor:'#FFA987'
                    }}>
                    <TouchableOpacity>
                    <Text style = {styles.story}>Title : {item.title}</Text>
                    <Text style = {styles.story}>Author : {item.author}</Text>
                    </TouchableOpacity>
                  </View>
                ))
              : this.state.dataSource.map((item) => (
                  <View
                    style={{
                      borderColor: 'black',
                      borderWidth: 3,
                      padding: 10,
                      alignItems: 'center',
                      margin: 30,
                      backgroundColor:'#FFA987'
                    }}>
                    <TouchableOpacity>
                    <Text style = {styles.story}>Title : {item.title}</Text>
                    <Text style = {styles.story}>Author : {item.author}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
          </View>
        </ScrollView>
      </View>
        
     
    );
  }
}
const styles = StyleSheet.create({
searchBar:{
  fontFamily:'britannic',
  color:'white',
  padding:10,
},
});
