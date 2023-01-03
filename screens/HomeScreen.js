import { useNavigation } from '@react-navigation/native';
import { Text, TextInput, ScrollView, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLayoutEffect } from 'react';
import {
    ChevronDownIcon,
    UserIcon,
    MagnifyingGlassIcon,
    AdjustmentsVerticalIcon
} from 'react-native-heroicons/outline'
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import { useState, useEffect } from 'react';
import sanityClient from '../sanity';


function HomeScreen() {

    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState([])

    useEffect(() => {
        sanityClient.fetch(
            `
            *[_type == "featured"] {
                ...,
                restaurants[]->{
                    ...,
                    dishes[]->
                }
            }
            `).then(data => {
                setFeaturedCategories(data);
            })
    }, [])

    // console.log(featuredCategories);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])


    return (
        <SafeAreaView className='bg-white pt-5'>
            {/* Header */}

            <View className='flex-row pb-3 items-center mx-4 space-x-2'>
                <Image
                    source={{
                        uri: 'https://links.papareact.com/wru'
                    }}
                    className='h-7 w-7 bg-gray-300 p-4 rounded-full'
                />

                <View className='flex-1'>
                    <Text className='text-gray-400 font-bold text-xs'>
                        Deliver Now!
                    </Text>
                    <Text className='font-bold text-xl'>
                        Current Location
                        <ChevronDownIcon size={20} color='#00ccbb' />
                    </Text>
                </View>

                <UserIcon size={35} color='#00ccbb' />
            </View>

            {/* Search */}
            <View className='flex-row items-center space-x-2 pb-2 mx-4'>
                <View className='flex-row flex-1 space-x-2 bg-gray-200 p-3'>
                    <MagnifyingGlassIcon color='#00ccbb' size={20} />
                    <TextInput placeholder='Search for restraurants' keyboardType='default' />
                </View>
                <AdjustmentsVerticalIcon color='#00ccbb' />
            </View>


            {/* Content */}
            <ScrollView
                className='bg-gray-100'
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
            >
                {/* Categories */}
                <Categories />



                {featuredCategories?.map((category) => (
                    <FeaturedRow
                        key={category._id}
                        id={category._id}
                        title={category.name}
                        description={category.short_description}
                    />
                ))}

                
                {/* Featured Row */}
                {/* <FeaturedRow
                    id='1'
                    title="Featured"
                    description="Paid placements for you"
                />
                <FeaturedRow
                    id='12'
                    title="Featured"
                    description="Paid placements for you"
                />
                <FeaturedRow
                    id='123'
                    title="Featured"
                    description="Paid placements for you"
                /> */}


            </ScrollView>
        </SafeAreaView>
    );
}

export default HomeScreen;