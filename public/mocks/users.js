var users = [];
var tags = [];


tags.push({
  tagId: {
    name:             'CSS',
    label:            'Rate your CSS ability',
    scaleDescription: ['None', 'Basic', 'Experienced', 'Expert'],
    category:         'Skills'
  },
  score : 1
});

tags.push({
  tagId: {
    name:             'UX',
    label:            'Rate your UX ability',
    scaleDescription: ['None', 'Basic', 'Experienced', 'Expert'],
    category:         'Skills'
  },
  score : 2
});

tags.push({
  tagId: {
    name:             'AngularJS',
    label:            'Rate your AngularJS ability',
    scaleDescription: ['None', 'Basic', 'Experienced', 'Expert'],
    category:         'Skills'
  },
  score : 3
});

tags.push({
  tagId: {
    name:             'Node.js/Express',
    label:            'Rate your Node.js/Express ability',
    scaleDescription: ['None', 'Basic', 'Experienced', 'Expert'],
    category:         'Skills'
  },
  score : 1
});

tags.push({
  tagId: {
    name:             'Backbone',
    label:            'Rate your Backbone ability',
    scaleDescription: ['None', 'Basic', 'Experienced', 'Expert'],
    category:         'Skills'
  },
  score : 2
});

tags.push({
  tagId: {
    name:             'HTML',
    label:            'Rate your HTML ability',
    scaleDescription: ['None', 'Basic', 'Experienced', 'Expert'],
    category:         'Skills'
  },
  score : 3
});

for(var i = 1; i <= 50; i++){
  var date = faker.Date.recent(5);
  users.push({
    _id: i,
    email: faker.Internet.email(),
    name: faker.Name.findName(),
    github: 'https://github.com/' + faker.Name.firstName(),
    isAdmin: false,
    isRegistered: true,
    searchStage: 0,
    tags: tags,
    city: 'San Francisco',
    state: 'CA',
    country: 'United States',
    geo: [],
    createdAt: date,
    updatedAt: date
  });
}

var user = users[0];
