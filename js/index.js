// We need to access our API
// so we create a variable to hold our URL
const init = function (){


// We need to grab the user input from our HTML
const usernameInput = document.querySelector("#github-form");
// Whenever someone types into the search box, we want to run this function 
usernameInput.addEventListener('submit', function(event){
    event.preventDefault();
    // Get the value of what's in the search box
    let searchTerm = document.querySelector("#search").value;
    const searchUrl = "https://api.github.com/search/users?q="+searchTerm;


    function searchYetu (){
        fetch(searchUrl)
        .then((response) => response.json()) // Parse the JSON data returned by the server
        .then((data) => display(data))  // Display the data in the Console in HTML
    }

// we invoke the search function
    searchYetu()

// the function handles how and where we display the search result

    function display(data){
        console.log(data)
// To makesure we clear the previous search we will remove the DOM element before we render another search request
        const previousSearchLi = document.getElementById ("userSearched");
     
        if (document.contains(previousSearchLi)){
            previousSearchLi.remove();
            console.log(previousSearchLi);
        }
// select the element to appendchild
        const myUl = document.querySelector("#user-list");

// create an element to render the information from git api search 

        const myLi = document.createElement("li");
        myLi.className = "userJina";
        myLi.id = "userSearched"
        gitApi = data.items[0];
        myLi.innerHTML =
        `
        <h3>${gitApi.login} </h3>
        <img src="${gitApi.avatar_url}" alt="image">
        <a href="${gitApi.html_url}", target="_blank">Visit ${gitApi.login}'s Profile</a>

        `
            myUl.appendChild(myLi)

// we create an event listener too show user's reposiitories upon clicking of any element from the rendered search results
// this is for the button that will trigger a new get request when clicked on

document.querySelector("#user-list").addEventListener('click', function(){
    const repoUrl = data.items[0].repos_url;
    fetch(repoUrl).then(response=> response.json())
    .then(repoInfo => displayRepositories(repoInfo))

    function displayRepositories(repoInfo){
        const repoList = document.querySelector("#repos-list")
                
        repoInfo.forEach(repo => {
            // create an element to render the Users repo from the click
            const liRepo = document.createElement("li");
            liRepo.id = "user-repo";
            liRepo.textContent = repo.name
            console.log(liRepo)
            repoList.appendChild(liRepo)
        })



    }
    })
        

    }



})


}

document.addEventListener('DOMContentLoaded', init)
