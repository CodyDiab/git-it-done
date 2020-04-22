var issueContainerEl = document.querySelector("#issues-container");

var limitWarningEl = document.querySelector("#limit-warning")

var getRepoIssues = function(repo) {
   var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc"

   fetch(apiUrl)
    .then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                // pass response to dom
                displayIssues(data);

                if (response.headers.get("Link")) {
                    displayWarning(repo)
                }
            });
        } else {
            alert("there was a problem with your request!")
        }
    })
}
//dom function
var displayIssues = function(issues) {
    if (displayIssues.length === 0 ) {
        issueContainerEl.textContent = "This repo has no open issues!"
    }
    for(var i = 0; i < issues.length; i++) {
        // create a link for each object in array
        var issueEl = document.createElement("a");
        //apply style class
        issueEl.classList = "list-item flex-row justify-space-between align-center"
        //set href link to the issues at github
        issueEl.setAttribute("href",issues[i].html_url);
        // opens links in new tab
        issueEl.setAttribute("target","_blank")
         //cretae span to hold the issue in dom
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        //append to the container div
        issueEl.appendChild(titleEl);

        //create element for type
        var typeEl = document.createElement("span");
        // check if issue is an actual issue or a pull
        if(issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        }else{
            typeEl.textContent = "(Issue)"
        }

        //apppend to container
        issueEl.appendChild(typeEl);

        issueContainerEl.appendChild(issueEl);

    }

}
  // var to add text to warning container
var displayWarning = function(repo) {
     
    limitWarningEl.textContent = "to see more than 30 issues, visit "
    
    var linkEl = document.createElement("a");
    linkEl.textContent =(" See More Issues on GitHub.com")
    linkEl.setAttribute("href","https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target","_blank");
    limitWarningEl.appendChild(linkEl)

}
getRepoIssues("facebook/react")