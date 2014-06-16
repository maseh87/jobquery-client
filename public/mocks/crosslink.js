//Populate opportunities array of company
for(var i = 1; i < opportunities.length; i++){
  var index = Math.floor(Math.random() * 49);
  var opportunity = opportunities[i];
  companies[index].opportunities.push(opportunity);
};

//Populate users array of opportunity
for(var i = 1; i < users.length; i++){
  var index = Math.floor(Math.random() * 49);
  var user = users[i];
  opportunities[index].users.push(user);
};

//Populate tags array of opportunity
for(var i = 1; i < tags.length; i++){
  var index = Math.floor(Math.random() * 49);
  var tag = tags[i];
  opportunities[index].tags.push(tag);
};