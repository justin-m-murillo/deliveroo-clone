import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { MapPinIcon } from 'react-native-heroicons/outline';
import { StarIcon } from 'react-native-heroicons/solid';

const RestaurantCard = ({
  id,
  imgUrl,
  name,
  rating,
  genre,
  address,
  short_description,
  dishes
}) => {
  return (
    <TouchableOpacity className="bg-white mr-3 shadow">
      <Image 
        source={{
          uri: imgUrl
        }}
        className="h-36 w-64 rounded-sm"
      />
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{name}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color="green" opacity={0.5} size={22} />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500">{rating}</Text> · {
              genre?.map(gen => (
                <Text key={gen._id}>{gen.title} </Text>
              ))
            }
          </Text>
        </View>

        <View className="flex-row items-center space-x-1">
          <MapPinIcon color="gray" opacity={0.4} size={22} />
          <Text className="text-xs text-gray-500">Nearby · {address.substring(0, 19) + '...'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default RestaurantCard