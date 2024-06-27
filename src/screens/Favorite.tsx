import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MovieItem from './MovieItem'

const Favorite = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([])

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const initialData = await AsyncStorage.getItem('@FavoriteList')
        if (initialData !== null) {
          setFavoriteMovies(JSON.parse(initialData))
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchFavorites()
  }, [])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Favorite Movies</Text>
      {favoriteMovies.length > 0 ? (
        favoriteMovies.map((movie) => <MovieItem key={movie.id} movie={movie} />)
      ) : (
        <Text style={styles.noFavorites}>No favorite movies yet.</Text>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 16
  },
  noFavorites: {
    marginTop: 16,
    fontSize: 16
  }
})

export default Favorite