import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'


const client = sanityClient({
    projectId: "o502yph0",
    dataset: "production",
    useCdn: true,
    apiVersion: "2021-10-21",
});

const builder = imageUrlBuilder(client)

// Run to add exception for http://localhost:3000 
// sanity cors add http://localhost:3000
// sanity cors add http://localhost:19006


export const urlFor = (source) => builder.image(source);
export default client;
