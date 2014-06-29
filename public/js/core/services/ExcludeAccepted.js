app.filter('ExcludeAccepted', function () {
  return function (user) {
    if (user.searchStage === 'Accepted') {
      return false;
    } else {
      return true;
    }
  };
});
