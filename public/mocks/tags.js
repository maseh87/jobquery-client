var tags = [];

for(var i = 1; i < 25; i++){
  var date = faker.Date.recent(5);
  tags.push({
    _id: i,
    name: faker.random.bs_adjective(),
    label: faker.random.bs_adjective(),
    scaleDescription: [],
    isPublic: true,
    createdAt: date,
    updatedAt: date
  });
}

var tag = tags[0];