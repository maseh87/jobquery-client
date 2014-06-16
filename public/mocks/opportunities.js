var opportunities = [];

for(var i = 1; i < 50; i++){
  var date = faker.Date.recent(5);
  opportunities.push({
    _id: i,
    active: true,
    jobTitle: faker.random.bs_buzz(),
    description: faker.Lorem.sentence(),
    tags: [
        {
            tagId: {
                name: faker.random.bs_buzz(),
                label: '',
                scaleDescription: [],
                isPublic: true,
                category: '',
            }, 
            value: 4
        }, {
            tagId: {
                name: faker.random.bs_buzz(),
                label: '',
                scaleDescription: [],
                isPublic: true,
                category: '',
            },
            value: 3
        }
    ],
    links: [
        {title: 'Blog', url: 'www.google.ca/blog'},
        {title: 'Jobs', url: 'www.google.ca/jobs'}
    ],
    notes: [],
    internalNotes: [],
    questions: [
        {date: 1402946938842, text: 'A question?'},
        {date: 1400956946058, text: 'Another one?'}
    ],
    survey: [],
    users: [],
    company: companies[Math.floor(Math.random() * 50)],
    createdAt: date,
    updatedAt: date
  });
}

var opportunity = opportunities[0];