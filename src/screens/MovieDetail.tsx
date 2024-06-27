import React, { useState, useEffect } from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

interface Movie {
  id: number;
  title: string;
  poster: string;
  year: string;
}

interface MovieDetailProps {
  navigation: any;
  route: {
    params: {
      movie: Movie;
    };
  };
}

export default function MovieDetail({ navigation, route }: MovieDetailProps): React.ReactElement {
  const [isFavorite, setIsFavorite] = useState(false)
  const { movie } = route.params
  const nav = useNavigation()

  useEffect(() => {
    const initializeFavoriteStatus = async () => {
      const isFav = await checkIsFavorite(movie.id)
      setIsFavorite(isFav)
    }
    initializeFavoriteStatus()
  }, [movie.id])

  const addFavorite = async (movie: Movie) => {
    try {
      const initialData = await AsyncStorage.getItem('@FavoriteList')
      let favMovieList = []

      if (initialData !== null) {
        favMovieList = [...JSON.parse(initialData), movie]
      } else {
        favMovieList = [movie]
      }

      await AsyncStorage.setItem('@FavoriteList', JSON.stringify(favMovieList))
      setIsFavorite(true)
    } catch (error) {
      console.log(error)
    }
  }

  const removeFavorite = async (id: number) => {
    try {
      const initialData = await AsyncStorage.getItem('@FavoriteList')
      let favMovieList = []

      if (initialData !== null) {
        favMovieList = JSON.parse(initialData).filter((movie: Movie) => movie.id !== id)
        await AsyncStorage.setItem('@FavoriteList', JSON.stringify(favMovieList))
      }

      setIsFavorite(false)
    } catch (error) {
      console.log(error)
    }
  }

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(movie.id)
    } else {
      addFavorite(movie)
    }
  }

  const checkIsFavorite = async (id: number) => {
    try {
      const initialData = await AsyncStorage.getItem('@FavoriteList')
      if (initialData !== null) {
        const favMovieList: Movie[] = JSON.parse(initialData)
        return favMovieList.some((movie: Movie) => movie.id === id)
      }
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: 8 }}>Movie Detail Page</Text>
      <TouchableOpacity onPress={toggleFavorite}>
        <FontAwesome
          name={isFavorite ? 'heart' : 'heart-o'}
          size={24}
          color={isFavorite ? 'red' : 'black'}
          style={{ marginBottom: 16 }}
        />
      </TouchableOpacity>
      <Button
        title="KEMBALI"
        onPress={() => {
          navigation.navigate('MovieScreen')
        }}
      />
      <Button
        title="Lihat Favorite"
        onPress={() => {
          nav.navigate('Favorite')
        }}
        style={{ marginTop: 20 }}
      />
    </View>
  )
}