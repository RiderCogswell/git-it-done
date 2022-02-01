var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

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

var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url with nested then(function())
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
};

getUserRepos();


// Add event listener 
userFormEl.addEventListener("submit", formSubmitHandler);
// Add Search form
// Handle form submission
// Display response data on page
// Add error handling
// Save progress con git