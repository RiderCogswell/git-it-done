var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var languageButtonsEl = document.querySelector("#language-buttons")

// handle form submission
var formSubmitHandler = function(event) {
    event.preventDefault();

    // get value from input element
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a Github username");
    }

    console.log(event);
}

var getFeaturedRepos = function(language) {
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayRepos(data.items, language)
            });
        } else {
            alert('Error: GitHub User Not Found');
        }
    });
};

var buttonClickHandler = function(event) {
    var language = event.target.getAttribute("data-language");

    if (language) {
        // asynchronous so thiswill execute after clearing content
        getFeaturedRepos(language);

        // clear old content
        repoContainerEl.textContent = "";
    }
    console.log(language);
}

var displayRepos = function(repos, searchTerm) {
    // check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    for (var i = 0; i < repos.length; i++) {
        // format repos name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create link container for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append to container
        repoEl.appendChild(titleEl);

        // create status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if the current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = 
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + "issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>"
        }

        // append to container
        repoEl.appendChild(statusEl);

        // append container to dom
        repoContainerEl.appendChild(repoEl);
    }
};

var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url with nested then(function())
    fetch(apiUrl)
        .then(function(response) {
            // request was successful
            if (response.ok) {
                response.json().then(function(data) {
                    displayRepos(data, user);
                });
            } else {
                alert("Error: GitHub User Not Found");
            }
        })
        .catch(function(error) {
            // notice this catch being chained to the end of the .then() method
            alert("Unable to connect to GitHub");
        });
};

getUserRepos();


// Add event listener 
userFormEl.addEventListener("submit", formSubmitHandler);

languageButtonsEl.addEventListener("click", buttonClickHandler)
// Add Search form
// Handle form submission
// Display response data on page
// Add error handling
// Save progress con git