import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import {
  UserIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from 'react-native-heroicons/outline';
import Categories from '../components/Categories/Categories';
import FeaturedRow from '../components/FeaturedRow/FeaturedRow';
import sanityClient from '../../sanity';
import category from '../../sanity/schemas/category';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient.fetch(
      `
        *[_type == 'featured'] {
          ...,
          restaurants[]-> {
            ...,
            "images": images[] {
              "url": asset->url,
            },
            dishes[]->,
          },
        }
      `
    ).then(data => {
      setFeaturedCategories(data);
      //console.log(data);
    });
  }, []);

  return (
    <SafeAreaView className="bg-white pt-5">
      <StatusBar 
        style="dark"
      />
      
        {/* Header */}
        <View className="flex-row items-center mx-4 space-x-2 px-1 pb-3">
          <Image 
            source={{
              uri: 'https://links.papareact.com/wru',
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />

          <View>
            <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
            <Text className="font-bold text-xl">Current Location
              <ChevronDownIcon size={20} color="#00CCBB" />
            </Text>
          </View>

          <UserIcon size={35} color="#00CCBB" />
        </View>

        {/* Search */}
        <View className="flex-row items-center space-x-2 mx-4 px-1 pb-3">
          <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
            <MagnifyingGlassIcon color="gray" size={20} />
            <TextInput
              placeholder='Restaurants and cuisines'
              keyboardType='default'
            />
          </View>

          <AdjustmentsVerticalIcon color="#00CCBB" />
        </View>

        {/* Body */}
        <ScrollView 
          className="bg-gray-100"
          showsVerticalScrollIndicator={false}
        >
          <View style={{ paddingBottom: 100 }}>
            {/* Categories */}
            <Categories />

            {/* Featured Rows */}
            {featuredCategories?.map(category => (
              <FeaturedRow 
                key={category._id}
                id={category._id}
                title={category.name}
                description={category.short_description}
              />
            ))}
          </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen