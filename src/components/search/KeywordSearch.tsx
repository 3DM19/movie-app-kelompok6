import { API_URL, API_ACCESS_TOKEN } from '@env';
import axios from 'axios';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import MovieItem from '../movies/MovieItem';
import { Movie } from '../../types/app';

const KeywordSearch = (): JSX.Element => {
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  const handleSearch = async () => {
    try {
      const response = (await axios.get(
        `${API_URL}/search/movie?query=${keyword}`, {
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${API_ACCESS_TOKEN}`
          }
        }
      )).data.results;
      setSearchResults(response);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity onPress={() => navigateToMovieDetail(item)}>
      <View style={styles.movieItem}>
        <MovieItem key={item.id} movie={item} size={{ width: 100, height: 160 }} coverType='poster' />
      </View>
    </TouchableOpacity>
  );

  const navigateToMovieDetail = (movie: Movie) => {
    // Implement navigation to MovieDetail screen here
    console.log('Navigating to MovieDetail:', movie);
  };

  return (
    <View style={styles.container}>
      <View style={{}}>
        <TextInput
          style={styles.input}
          placeholder="Masukkan kata kunci"
          value={keyword}
          onChangeText={setKeyword}
          onSubmitEditing={handleSearch} // Handle search when Enter is pressed
        />
          <Button title="Cari" onPress={handleSearch} />
      </View>
      <FlatList
        data={searchResults}
        numColumns={3}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.grid}
        style={{width: '100%'}}
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
    margin: 8,
  },
  grid: {
    justifyContent: 'center',
    width: '100%'
  }
});

export default KeywordSearch;
