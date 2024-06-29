import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MovieItem from '../components/movies/MovieItem';
import type { Movie } from '../types/app';

const Favorite = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const initialData = await AsyncStorage.getItem('@FavoriteList');
        if (initialData !== null) {
          setFavoriteMovies(JSON.parse(initialData));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchFavorites();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Movies</Text>
      {favoriteMovies.length > 0 ? (
        <FlatList
          data={favoriteMovies}
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

export default Favorite;
