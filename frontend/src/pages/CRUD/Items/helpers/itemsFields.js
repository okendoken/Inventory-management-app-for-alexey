const itemsFields = {
  id: { type: 'id', label: 'ID' },

  name: { type: 'string', label: 'Name' },

  description: { type: 'string', label: 'Description' },

  status: {
    type: 'enum',
    label: 'Status',

    options: [
      { value: 'available', label: 'available' },

      { value: 'unavailable', label: 'unavailable' },
    ],
  },

  price: { type: 'decimal', label: 'Price' },

  quantity: { type: 'int', label: 'Quantity' },

  images: { type: 'images', label: 'Images' },
};

export default itemsFields;
