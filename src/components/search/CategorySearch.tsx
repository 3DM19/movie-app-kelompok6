  import { API_ACCESS_TOKEN, API_URL } from '@env';
  import axios from 'axios';
  import React, { useState, useEffect } from 'react';
  import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
  import { useNavigation, StackActions } from '@react-navigation/native';

  interface Genre {
    id: number;
    name: string;
  }

  const CategorySearch = (): JSX.Element => {
    const navigation = useNavigation()
    const [genres, setGenres] = useState<Genre[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
    const pushAction = StackActions.push('CategorySearchResult', {genreId: selectedGenre?.id, genreName: selectedGenre?.name, setSelectedGenre});

    useEffect(() => {
      fetchGenres();
    }, []);

    const fetchGenres = async () => {
      try {
        // Ganti dengan URL API yang sesuai untuk mendapatkan genre
        const response = await axios.get(`${API_URL}/genre/movie/list`, {
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${API_ACCESS_TOKEN}`
          }
        });
        const data = await response.data;
        setGenres(data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    const handleGenreSelect = (genre: Genre) => {
      setSelectedGenre(genre);
      // Lakukan API request menggunakan genre yang terpilih
      // Tampilkan data film berdasarkan genre pada layar
    };

    return (
      <View style={styles.container}>
        <Text style={styles.label}>Pilih Genre:</Text>
        <View style={styles.genreContainer}>
          {genres.map((genre) => (
            <TouchableOpacity
              key={genre.id}
              style={[
                styles.genreButton,
                selectedGenre?.id === genre.id && { backgroundColor: '#8978A4' },
              ]}
              onPress={() => handleGenreSelect(genre)}
            >
              <Text style={styles.genreText}>{genre.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={() => {
          console.log("jalan")
          navigation.dispatch(pushAction)
          console.log("id", selectedGenre?.id)
        }}>
          <Text style={styles.topBarLabel}>
            Search
          </Text>  
        </TouchableOpacity>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    button: {
      marginTop: 16,
      backgroundColor: '#8978A4',
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100,
      height: 60,
    },
    topBarLabel: {
      color: 'white',
      fontSize: 20,
      fontWeight: '400',
      textTransform: 'capitalize',
    },
    label: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    genreContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    genreButton: {
      backgroundColor: '#C0B4D5',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      margin: 5,
    },
    genreText: {
      color: 'white',
      fontSize: 16,
    },
  });

  export default CategorySearch;
