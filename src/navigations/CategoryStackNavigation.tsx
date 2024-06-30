import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MovieDetail from '../screens/MovieDetail'
import Search from '../screens/Search';
import CategoryList from '../components/search/CategoryList';

const Stack = createNativeStackNavigator()

const CategoryStackNavigator = (): React.JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName="Search"
    >
      <Stack.Screen
        name="Search"
        component={Search}
        options={
        {
          headerShown: false,
        }
        }
      />
        <Stack.Screen
        name="CategorySearchResult"
        component={CategoryList}
        options={{
          title: 'Category Search Result',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={{
          title: 'Movie Detail',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  )
}

export default CategoryStackNavigator