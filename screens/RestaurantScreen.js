import { TouchableOpacity, ScrollView, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useLayoutEffect } from 'react';
import { urlFor } from '../sanity';
import { ArrowLeftIcon, ChevronRightIcon, MapIcon, QuestionMarkCircleIcon, StarIcon } from 'react-native-heroicons/solid';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../features/restaurantSlice';



const RestaurantScreen = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    
    // destructure via - route.params.id/name/title....
    // const route = useRoute();
    const {
        params: {
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat
        }
    } = useRoute()

    useEffect(() => {
        dispatch(setRestaurant({
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat,
        }))
    }, [dispatch])
    


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])
    
    return (
        <>
            <BasketIcon/>
        <ScrollView>
            <View className='relative'>
                <Image
                    source={{
                    uri: urlFor(imgUrl).url()
                    }}
                    className='w-full h-56 bg-gray-300 p-4'
                />
                <TouchableOpacity
                    className='absolute top-14 left-5 p-2 bg-gray-100 rounded-full'
                    onPress={navigation.goBack}>
                    <ArrowLeftIcon size={20} color='#00CCBB'/>
                </TouchableOpacity>
            </View>
            <View className='bg-white'>
                <View className='px-4 pt-4 '>
                    <Text className='font-bold text-3xl'>{title}</Text>
                    <View className='flex-row space-x-2 my-1'>

                        {/* The component inside */}
                        {/* Rating */}
                        <View className='flex-row items-center space-x-1'>
                        <StarIcon
                            color='green'
                            opacity={0.5}
                            size={22}
                            />
                            <Text className='text-xs text-gray-500'>
                                <Text className='text-green-500'>{rating} </Text> ?? {genre}
                            </Text>
                        </View>

                        {/* Location */}
                        <View className='flex-row items-center space-x-1'>
                            <MapIcon
                                color='green'
                                opacity={0.5}
                                size={22}
                            />
                            <Text className='text-xs text-gray-500'>
                                Nearby ?? {address}
                            </Text>
                        </View>
                    </View>


                        {/* Short - Desc */}
                        <Text className='text-gray-500 mt-2 pb-4'>
                            {short_description}
                        </Text>
                </View>

                <TouchableOpacity className='flex-row items-center space-x-2 p-4 border-y border-gray-300'>
                    <QuestionMarkCircleIcon
                        color='gray'
                        opacity={0.6}
                        size={20}
                    />
                    <Text className='pl-2 flex-1 text-md font-bold'>
                        Foody ?
                    </Text>
                    <ChevronRightIcon
                    color='#00CCBB'
                    />
                </TouchableOpacity>
            </View>

            <View>
                <Text className='pt-6 mb-3 font-bold text-xl px-6'>
                    Menu
                </Text>

                {/* Dishes */}
                {dishes.map(dish => (
                    <DishRow
                        key={dish._id}
                        id={dish._id}
                        name={dish.name}
                        description={dish.short_description}
                        price={dish.price}
                        image={dish.image}
                    />
                ))}
            </View>
            </ScrollView>
        </>
    )
}

export default RestaurantScreen