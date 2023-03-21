import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator } from 'react-native';

export default function App() {

  const api = "https://api.github.com";
  const query = "react-native";
  const results = 15;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadApi();
  }, [])

  async function loadApi() {

    if ((loading)) { return; }

    setLoading(true);

    fetch(`${api}/search/repositories?q=${query}&per_page=${results}&page=${page}`)
      .then(response => response.json())
      .then((response) => {
        setData([...data, ...response.items]);
        setPage(page + 1);
        setLoading(false);
      })

  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{ flexGrow: 1 }}
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <ListItem data={item} />}
        onEndReached={loadApi}
        onEndReachedThreshold={0.2}
        ListFooterComponent={<FooterList load={loading} />}
      />
    </View>
  );
}

function ListItem({ data }) {
  return (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{data.name}</Text>
      <Text style={styles.itemDescription}>{data.description}</Text>
    </View>
  )
}

function FooterList({ load }) {

  if(!load){ return; }

  return (
    <View style={styles.loading}>
      <ActivityIndicator size={25} color="#000" />
    </View>
  )

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#e8e8e8',
    paddingTop: 50
  },

  item: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 25
  },

  itemTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: 700
  },

  itemDescription: {
    marginTop: 10,
    color: '#262626',
    fontSize: 16,
    fontWeight: 500
  },

  loading: {
    padding: 15
  }

});
