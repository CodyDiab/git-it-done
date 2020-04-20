var getUserRepos = function(user) {
   
/// declare var as place holder perameter for the fetch
    var apiUrl = "https://api.github.com/users/" + user + "/repos"

    fetch(apiUrl).then(function(response){
    response.json().then(function(data){
        console.log(data);
    });
  })
};

getUserRepos()