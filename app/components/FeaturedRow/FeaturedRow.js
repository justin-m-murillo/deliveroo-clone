import { View, Text, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import RestaurantCard from '../Restaurant/RestaurantCard';
import sanityClient from '../../../sanity';

const FeaturedRow = ({ id, title, description }) => {
  const [restaurants, setRestaurants] = useState([])
  //console.log(id);

  useEffect(() => {
    sanityClient.fetch(
      `
      *[_type == 'featured' && _id == $id] {
        restaurants[]-> {
          ...,
          dishes[]->,
          genre[]->,
          "images": images[] {
            "url": asset->url,
          }
        }
      }
      `,
      { id }
    ).then(data => {
      setRestaurants(data[0]?.restaurants);
    });
  }, []);

  
  
  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB"/>
      </View>

      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="mt-6"
      >
        {/* RestaurantCard */}
        {restaurants?.map(restaurant => (
          <RestaurantCard 
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.images[0].url}
            name={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.genre}
            address={restaurant.address}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}

          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow