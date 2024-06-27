import { API_ACCESS_TOKEN, API_URL } from '@env'
import axios from 'axios'
import React, {useState, useEffect } from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import type { MovieListProps, Movie } from '../../types/app'
import MovieItem from './MovieItem'

const coverImageSize = {
    backdrop: {
      width: 280,
      height: 160,
    },
    poster: {
      width: 100,
      height: 160,
    },
  }
  

const MovieList = ({
    title, path, coverType
}: MovieListProps) => {
    const [movies, setMovies] = useState<Movie[]>([])

    useEffect(() => {
        getMovieList()
    }, [])

    const getMovieList = async() : Promise<void> => {
        const url = `${API_URL}${path}`
        try {
            const response = await axios.get(url, {headers: {"Accept": "application/json", "Authorization" : `Bearer ${API_ACCESS_TOKEN}`}})    
            setMovies(response.data.results);
        } catch (error) {
            console.log("🚀 ~ getMovieList ~ error:", error)
        }
    }

  return (
    <View>
        <View style={styles.header}>
            <View style={styles.purpleLabel}></View>
            <Text style={styles.title}>{title}</Text>
        </View>
        <FlatList
            style={{
                ...styles.movieList,
                maxHeight: coverImageSize[coverType].height,
            }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={movies}
            renderItem={({item}) => {
              return(
                <MovieItem
                movie={item}
                size={coverImageSize[coverType]}
                coverType={coverType}
                />
              )
            }}
            keyExtractor={(item) => item.id.toString()}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
      marginLeft: 6,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    purpleLabel: {
      width: 20,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#8978A4',
      marginRight: 12,
    },
    title: {
      fontSize: 20,
      fontWeight: '900',
    },
    movieList: {
        paddingLeft: 4,
        marginTop: 8
    }
  })

export default MovieList