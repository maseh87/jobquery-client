var matches = [];

for(var i = 1; i < 50; i++){
  for(var j = 0; j < 25; j++){
    var date = faker.Date.recent(5);
    var usedIds = {};
    var index = Math.floor(Math.random() * 50);
    if(!usedIds[index]){
      usedIds[index] = true;
      matches.push({
        userId: i,
        oppId: index,
        userInterest: Math.floor((Math.random() * 4) + 1),
        answers: [],
        createdAt: date,
        updatedAt: date 
      });
    }
  }
}