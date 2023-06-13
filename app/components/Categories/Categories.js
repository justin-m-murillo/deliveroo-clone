import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import CategoryCard from './CategoryCard'

const displayCategories = () => {
  const categories = [];

  for (let i = 0; i < 5; i++) {
    categories.push(
      <CategoryCard imgUrl={`https://picsum.photos/seed/${Math.random()}/300`} title={`testing${i+1}`} key={i}/>
    );
  }

  return categories;
}

const Categories = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {/* CategoryCard */}
      {displayCategories()}
    </ScrollView>
  );
};

export default Categories;