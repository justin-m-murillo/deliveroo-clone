export default {
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Restaurant name',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'short_description',
      type: 'string',
      title: 'Short description',
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'image',
      type: 'array',
      title: 'Images of the Restaurant',
      of: [{ type: 'image', }],
    },
    {
      name: 'address',
      type: 'string',
      title: 'Restaurant address',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'operation_hours',
      type: 'array',
      title: 'Hours',
      of: [
        {
          type: 'object',
          name: 'day',
          title: 'Day Hours',
          fields: [
            { name: 'day', type: 'string', title: 'Day of the week',},
            { name: 'start_time', type: 'string', title: 'Start time',},
            { name: 'start_am', type: 'boolean', title: 'Start time is AM?', validation: Rule => Rule.required()},
            { name: 'end_time', type: 'string', title: 'End time',},
            { name: 'end_am', type: 'boolean', title: 'End time is AM?', validation: Rule => Rule.required()},
          ],
        }
      ]
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Enter a Rating from (1-5 Stars)',
      validation: (Rule) => Rule.required()
        .min(1)
        .max(5)
        .error('Please enter a Value between 1 and 5'),
    },
    {
      name: 'genre',
      type: 'array',
      title: 'Category',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      validation: (Rule) => Rule.required()
    },
    {
      name: 'dishes',
      type: 'array',
      title: 'Dishes',
      of: [{ type: 'reference', to: [{ type: 'dish' }] }],
    },
  ],
}