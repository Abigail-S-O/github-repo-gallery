//Where profile information will appear// 
const overview = document.querySelector (".overview"); 
//GitHub username//
const username = "Abigail-S-O"; 
//Unordered list of repos//
const repoList = document.querySelector (".repo-list"); 
//Where repo information appears//
const repoDesc= document.querySelector (".repos");
//Where individual repo data appears// 
const repoDetails = document.querySelector (".repo-data"); 
//Back to repos button// 
const backButton = document.querySelector (".view-repos"); 
//Search by name placeholder // 
const filterInput = document.querySelector (".filter-repos");




const gitUserInfo = async function () {
   const userInfo = await fetch (`https://api.github.com/users/${username}`); 
   const data = await userInfo.json(); 
   displayUserInfo(data);
}; 

gitUserInfo();

const displayUserInfo = function (data) {
    const div = document.createElement ("div"); 
    div.classList.add ("user-info");
    div.innerHTML = `
    <figure>
        <img alt ="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div> 
    `;
    overview.append(div);
    listRepo ();
};

const listRepo = async function () {
    const fetchRepo = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepo.json(); 

    displayRepo (repoData);
};

const displayRepo = function (repos) {
    filterInput.classList.remove ("hide");
    for (const repo of repos) {
       const repoItem = document.createElement("li");
       repoItem.classList.add("repo"); 
       repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

repoList.addEventListener ("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText; 
        aboutRepo(repoName);
    }
});

const aboutRepo = async function (repoName) {
    const repoFetch = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await repoFetch.json ();
    console.log(repoInfo);


    const fetchLanguages = await fetch(repoInfo.languages_url); 
    const languageData = await fetchLanguages.json ();
    console.log(languageData);


    const languages = []; 
    for (const language in languageData) {
        languages.push(language);
        console.log(languages);
    }

    displayRepoInfo(repoInfo, languages);
}; 

const displayRepoInfo = function (repoInfo, languages) {
    backButton.classList.remove ("hide");
    repoDetails.innerHTML = ""; 
    repoDetails.classList.remove("hide");
    repoDesc.classList.add("hide");
    const div = document.createElement("div");
        div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;


     repoDetails.append(div);  
};


backButton.addEventListener ("click", function () {
    repoDesc.classList.remove ("hide"); 
    repoDetails.classList.add ("hide");
    backButton.classList.add ("hide");
}); 


filterInput.addEventListener ("input", function (e) {
    const searchValue = e.target.value;
    //console.log(e.target.value);
    const repos = document.querySelectorAll(".repo");
    const searchLowerCase = searchValue.toLowerCase ();
    for (const repo of repos) {
        const repoLowerCase = repo.innerText.toLowerCase();
      if (repoLowerCase.includes (searchLowerCase)) {
        repo.classList.remove ("hide");
      } else {
        repo.classList.add ("hide");
      }   
    }
});





