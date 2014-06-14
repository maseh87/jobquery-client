var users = [];

for(var i = 1; i <= 50; i++){
  var date = faker.Date.recent(5);
  users.push({
    _id: i,
    email: faker.Internet.email(),
    name: faker.Name.findName(),
    github: 'https://github.com/' + faker.Name.firstName(),
    isAdmin: false,
    isRegistered: true,
    searchStage: 'early',
    tags: [],
    city: 'San Francisco',
    state: 'CA',
    country: 'United States',
    geo: [],
    createdAt: date,
    updatedAt: date
  });
}

var user = users[0];
