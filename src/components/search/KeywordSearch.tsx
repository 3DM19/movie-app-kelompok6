import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';

const KeywordSearch = (): JSX.Element => {
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  const handleSearch = async () => {
    try {
      const apiKey = 'YOUR_API_KEY'; // Ganti dengan API key Anda dari TMDb
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keyword}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      const data = await response.json();
      setSearchResults(data.results);
      console.log('Search results:', data.results);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity onPress={() => navigateToMovieDetail(item)}>
      <View style={styles.movieItem}>
        <Text>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const navigateToMovieDetail = (movie: Movie) => {
    // Implement navigation to MovieDetail screen here
    console.log('Navigating to MovieDetail:', movie);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Masukkan kata kunci"
        value={keyword}
        onChangeText={setKeyword}
        onSubmitEditing={handleSearch} // Handle search when Enter is pressed
      />
      <Button title="Cari" onPress={handleSearch} />
      
      <FlatList
        data={searchResults}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        style={{ marginTop: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  movieItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
});

export default KeywordSearch;
