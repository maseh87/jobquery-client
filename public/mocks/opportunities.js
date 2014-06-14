var opportunities = [];

for(var i = 1; i < 50; i++){
  var date = faker.Date.recent(5);
  opportunities.push({
    _id: i,
    active: true,
    jobTitle: faker.random.bs_buzz(),
    description: faker.Lorem.sentence(),
    tags: [],
    links: [],
    notes: [],
    internalNotes: [],
    questions: [],
    survey: [],
    createdAt: date,
    updatedAt: date
  });
}

var opportunity = opportunities[0];