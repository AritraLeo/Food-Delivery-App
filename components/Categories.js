import { ScrollView, View, Text } from 'react-native'
import CategoriesCard from './CategoriesCard'
import sanityClient, { urlFor } from '../sanity'
import React, { useEffect, useState } from 'react'


const Categories = () => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        sanityClient.fetch(`
            *[_type == "category"]
        `).then(data => {
                setCategories(data);
            })
    }, [])

    console.log(categories);

    return (
        <ScrollView
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 10
            }}
            horizontal 
            showsHorizontalScrollIndicator={false}
        >
            {/* Categories Card */}

            {categories?.map(category => (
                <CategoriesCard
                    key={category._id}
                    title={category.name}
                    imgUrl={urlFor(category.image).width(200).url()}
                />
            ))}

            {/* <CategoriesCard imgUrl='https://links.papareact.com/gn7' title='Testing' />
            <CategoriesCard imgUrl='https://links.papareact.com/gn7' title='Testing' />
            <CategoriesCard imgUrl='https://links.papareact.com/gn7' title='Testing' />
            <CategoriesCard imgUrl='https://links.papareact.com/gn7' title='Testing' />
            <CategoriesCard imgUrl='https://links.papareact.com/gn7' title='Testing' />
            <CategoriesCard imgUrl='https://links.papareact.com/gn7' title='Testing' /> */}

        </ScrollView>
    )
}

export default Categories