export default {
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Restraurant Name',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'short_description',
      type: 'string',
      title: 'Short Restraurant',
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'image',
      type: 'image',
      title: 'Restraunt Image',
    },
    {
      name: 'lat',
      type: 'number',
      title: 'Restraunt Latitude',
    },
    {
      name: 'long',
      type: 'number',
      title: 'Restraunt Longitude',
    },
    {
      name: 'address',
      type: 'string',
      title: 'Restraunt Address',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Restraunt Rating (1-5)',
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(5)
          .error("Please enter a value between 1 and 5"),
    },
    {
      name: 'type',
      title: 'Category',
      validation: (Rule) => Rule.required(),
      type: "reference",
      to: [{type: "category"}]
    },
    {
      name: 'dishes',
      type: 'array',
      title: 'Dished',
      of: [{ type: "reference", to: [{ type: "dish" }] }]
    },
  ],
}
