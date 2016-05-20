var routes = [
  {
    name: 'User List',
    version: 1,
    controller: 'user',
    method: 'GET',
    path: 'users',
    config: {
      handler: 'list'
    }
  },
  {
    name: 'User Details',
    version: 1,
    controller: 'user',
    method: 'GET',
    path: 'users/{id}',
    config: {
      handler: 'get'
    }
  },
  {
    name: 'User Save',
    version: 1,
    controller: 'user',
    method: 'PUT',
    path: 'users',
    config: {
      handler: 'put'
    }
  },
  {
    name: 'User Save (Bulk)',
    version: 1,
    controller: 'user',
    method: 'PUT',
    path: 'users/bulk',
    config: {
      handler: 'bulkPut'
    }
  },
  {
    name: 'User Search',
    version: 1,
    controller: 'user',
    method: 'GET',
    path: 'search/users/{q}',
    config: {
      handler: 'search'
    }
  },
  {
    name: 'User Delete',
    version: 1,
    controller: 'user',
    method: 'DELETE',
    path: 'users',
    config: {
      handler: 'delete'
    }
  }
];

module.exports = routes;