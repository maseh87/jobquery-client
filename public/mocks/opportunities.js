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
    company: companies[Math.floor(Math.random() * 50)],
    createdAt: date,
    updatedAt: date
  });
}

var opportunity = opportunities[0];