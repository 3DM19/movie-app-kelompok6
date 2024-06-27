import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Genre {
  id: number;
  name: string;
}

const CategorySearch = (): JSX.Element => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      // Ganti dengan URL API yang sesuai untuk mendapatkan genre
      const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=API_KEY');
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const handleGenreSelect = (genre: Genre) => {
    setSelectedGenre(genre);
    console.log('Selected genre:', genre.name);
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
