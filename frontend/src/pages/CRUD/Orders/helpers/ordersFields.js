const ordersFields = {
  id: { type: 'id', label: 'ID' },

  user: { type: 'relation_one', label: 'User' },

  items: { type: 'relation_many', label: 'Items' },

  order_date: { type: 'datetime', label: 'OrderDate' },
};

export default ordersFields;
