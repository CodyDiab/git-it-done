// var for user input form//
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
////
/// nodes to write search respone to//
 var repoContainerEl = document.querySelector("#repos-container");
 var repoSearchTerm = document.querySelector("#repo-search-term");

 //var for data buttons
 var languageButtonsEl = document.querySelector("#language-buttons")

/// submit form function///
var formSubmitHandler = function(event) {
    event.preventDefault();
    
    var username = nameInputEl.value.trim();

    if(username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("please enter a GitHub username");
    }
}



var getUserRepos = function(user) {
   
/// declare var as place holder perameter for the fetch(HTTP request)
    var apiUrl = "https://api.github.com/users/" + user + "/repos"

    fetch(apiUrl)
      .then(function(response){
   //check if user exists
    if (response.ok) {
    response.json().then(function(data){
       // place vars into display function// 
        displayRepos(data,user);
    });
  }else {
      alert("error: " + response.statusText);
  }
  })
  // handel server conection error
   .catch(function(error) {
       alert("Unable to connect to GitHub");
   })
};
/// sort repos

var getFeaturedRepos = function(language){
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";

 fetch(apiUrl).then(function(response) {
     if (response.ok) {
         response.json().then(function(data){
             displayRepos(data.items, language);
            });
     }else {
         alert("Error: " + response.statusText);
     }
 });
};

////















// display HTTP request for specified items to user//
var displayRepos = function(repos, searchTerm){
    //check if user has repos
    if( repos.length ===0){
        repoContainerEl.textContent = " No repositories found."
    }
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;  
    // loop through repo results to display
    for (var i =0; i < repos.length; i++) {
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create a container/link for each repo
        var repoEl = document.createElement("a");
        // link to page with query peramiter for repo
        repoEl.setAttribute("href","./single-repo.html?repo="+repoName)
        repoEl.classList = "list-item flex-row justify-space-between align-center"
        
        // create span for repo name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //append span to container created
        repoEl.appendChild(titleEl);
        // create element for status
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";
        // check if repo[i] has issue of not
        if (repos[i].open_issues_count > 0){
            statusEl.innerHTML = 
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
        //append issue status element to container created
        repoEl.appendChild(statusEl);
       
        // append container created to the dom
        repoContainerEl.appendChild(repoEl);

    }
    //end loop
}
///
// function for click event (language buttons by data attribute)**************************
var buttonClickHandler= function(event) {
    //adress button by data attribute
    var language=event.target.getAttribute("data-language")
   
    if(language) {
    getFeaturedRepos(language);

    /////// clear old content
    repoContainerEl.textContent = "";

    
    }
}

userFormEl.addEventListener("submit", formSubmitHandler);

languageButtonsEl.addEventListener("click",buttonClickHandler)