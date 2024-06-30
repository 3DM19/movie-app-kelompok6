import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import MovieItem from '../../components/movies/MovieItem';
import type { Movie } from '../../types/app';
import { API_ACCESS_TOKEN, API_URL } from '@env';

const CategoryList = ({route} : {route: any}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { genreName, genreId } = route.params;

  useEffect(() => {
    const fetchMoviesByGenre = async () : Promise<void> => {
      try {
        const response = await axios.get(`${API_URL}/discover/movie`, {
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${API_ACCESS_TOKEN}`
          },
          params: {
            with_genres: genreId,
          }
        });
        const data = await response.data;
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    console.log("category list")
    fetchMoviesByGenre();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Result of {genreName} Genre</Text>
      {movies.length > 0 ? (
        <FlatList
          data={movies}
          numColumns={3}
          renderItem={({ item }) => (
            <View
              style={styles.movieItem}
            >
              <MovieItem key={item.id} movie={item} size={{ width: 100, height: 160 }} coverType='poster' />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.grid}
        />
      ) : (
        <Text style={styles.noFavorites}>No favorite movies yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff', // tambahkan background color jika diperlukan
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  noFavorites: {
    marginTop: 16,
    fontSize: 16,
  },
  grid: {
    justifyContent: 'center',
  },
  movieItem: {
    margin: 8,
  }
});

export default CategoryList;
