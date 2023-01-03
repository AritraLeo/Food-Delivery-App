import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import { ScrollView } from 'react-native-gesture-handler'
import RestraurantCard from './RestraurantCard'
import sanityClient from '../sanity'

const FeaturedRow = ({ id, title, description }) => {
    
    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        sanityClient.fetch(`
            *[_type == "featured" && _id == $id]{
                ...,
                restaurants[]->{
                    ...,
                    dishes[]->,
                    type->{
                        name
                    }
                }
            }[0]
        `,
            { id: id }).then(data => {
                setRestaurants(data?.restaurants);
            })
    }, [])
    

    // console.log(restaurants);

    return (
        <View>
            <View className='mt-4 flex-row px-4 items-center justify-between'>
                <Text className='font-bold text-lg'>
                    {title}
                </Text>
                <ArrowRightIcon color='#00ccbb' />
            </View>

            <Text className='text-xs text-gray-500 px-4'>
                {description}
            </Text>
            
            <ScrollView
                horizontal
                contentContainerStyle={{
                    paddingHorizontal: 15,
                }}
                showsHorizontalScrollIndicator={false}
                className='pt-4'
            >
                {/* Restraurant Cards */}

                {restaurants?.map(restaurant => (
                    <RestraurantCard
                        key={restaurant._id}
                        id={restaurant._id}
                        imgUrl={restaurant.image}
                        title={restaurant.name}
                        short_description={restaurant.short_description}
                        rating={restaurant.rating}
                        genre={restaurant?.name}
                        address={restaurant.address}
                        dishes={restaurant.dishes}
                        long={restaurant.long}
                        lat={restaurant.lat}
                    />
                ))}

                {/* <RestraurantCard
                    id={123}
                    imgUrl='https://links.papareact.com/gn7'
                    title='Dada Boudi Biriyani'
                    short_description='Best Biriyani'
                    rating={3}
                    genre='Indian'
                    address='Belghoria'
                    dishes={[]}
                    long={20}
                    lat={0}
                />
                <RestraurantCard
                    id={123}
                    imgUrl='https://links.papareact.com/gn7'
                    title='Dada Boudi Biriyani'
                    short_description='Best Biriyani'
                    rating={3}
                    genre='Indian'
                    address='Belghoria'
                    dishes={[]}
                    long={20}
                    lat={0}
                />
                <RestraurantCard
                    id={123}
                    imgUrl='https://links.papareact.com/gn7'
                    title='Dada Boudi Biriyani'
                    short_description='Best Biriyani'
                    rating={3}
                    genre='Indian'
                    address='Belghoria'
                    dishes={[]}
                    long={20}
                    lat={0}
                /> */}

        </ScrollView>
        </View>
    )
}

export default FeaturedRow