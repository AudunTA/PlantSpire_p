

//urls for api calls.
const url = `https://eksamen.audun.site/wp-json/wp/v2/posts/?per_page=100`;
const mediaUrl = `https://eksamen.audun.site/wp-json/wp/v2/media/`;

//queryselectors.
const container = document.querySelector(".container-posts");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const filter = params.get("filter");
const iPlant = document.querySelector(".indoor-div");
const oPlant = document.querySelector(".outdoor-div");
const pPlant = document.querySelector(".plastic-div");
const rFilter = document.querySelector("#remove-filter");
const cSpan = document.querySelector("#display-cat");

const btnSeeMore = document.querySelector("#btnSeePosts");

const searchfield = document.querySelector("#search");
const btnSearch = document.querySelector("#btnSearch");
const searchResults = document.querySelector("#searchResults");

//api call function with 2 parameters (length and filter thats desired)
async function callApi(len, filter) {
  try {
    const response = await fetch(url);
    const posts = await response.json();
    container.innerHTML = "";
    for (let i = 0; i < posts.length; i++) {

     // how many do i want to show?
      if (i > len) {
        break;
      }
      //if filter has no value it will ignore this step
      if (filter === null) {
        //need to send to display post to get the corresponding featured image for the post.
        await matchPost(posts[i]);
      }else {
        //filter thats sendt to this function is the category id, this is checked vs
        //post[i].categories[0]
        if(posts[i].categories[0] === filter) {
          await matchPost(posts[i]);
        }
      }
      
    }
  } catch (e) {
    //will display the error to the container
    container.innerHTML = e;
    //will also console log the error
    console.log(e);
  } finally {
}
}

async function matchPost(post) {
  //this function will match the post with its mediaObj
  let image= null;
  if (post.featured_media !== 0) {
    image = await callMedia(post.featured_media);
  }
  //sends the post and its mediaObject to a function that will display it in the HTML
  container.innerHTML += createHTML(post, image);
}

//creates the html and displays it.
function createHTML(post, image) {
  let img = "";
  if (image)
    img = `<img src='${image.media_details.sizes.medium.source_url}' alt="${image.alt_text}"/>`;
  return `
  <div class="item-container">
  <a href="spesific-post.html?id=${post.id}">
    <div class="align-class">
    <div class="align-class-image">
    ${img}
    </div>
  <h2>${post.title.rendered}</h2>
  
  </div>
</div>
`;
}


async function callMedia(id) {
  try {
    const response = await fetch(mediaUrl + id);
    const imageData = await response.json();
    return imageData;
  } catch (e) {
    //will display the error to the container
    container.innerHTML = e;
    //will also console log the error
    console.log(e);
  }
}

//this is how i desided to call the api function based on filted and how many posts i wanted to display.
//first it checks for filter in the URL parimiter
if(filter === "indoor") {
  iPlant.style.backgroundColor="#516f90";
  cSpan.innerHTML = "Indoor";
  rFilter.style.display="flex";
  btnSeeMore.style.display="none";
  callApi(20, 4);
} else {
  if(filter ==="outdoor") {
  oPlant.style.backgroundColor="#516f90";
  cSpan.innerHTML = "Outdoor";
  rFilter.style.display="flex";
  btnSeeMore.style.display="none";
  callApi(20, 5);
} else {
  if(filter ==="plastic") {
  pPlant.style.backgroundColor="#516f90";
  cSpan.innerHTML = "Plastic";
  rFilter.style.display="flex";
  btnSeeMore.style.display="none";
  callApi(20, 6);
} else {
  //if no filter is pressed it will display 10 posts (9 including the 0 index with a filter value of null)
  callApi(9, null);
}
}

}
//if the remove filter is pressed i refresh the page without the url parameter
//i could have removed the container's html but it would not remove the paramter
//so if the page is linked to someone else it would display the filter.
rFilter.onclick = function() {
  window.location = "posts.html";

}


btnSeeMore.onclick = btnClick;

function btnClick() {
  //removes the container content and displayes up to 100 posts
  container.innerHTML = "";
  callApi(100, null);
  btnSeeMore.style.display="none";
  searchResults.style.display="none";
  
}

//eventlistener for the search bar
// i tried to use 'key up' insted of clicking the button but this
//but i desided to use click as keyup would make an api call by every key pressed
btnSearch.addEventListener("click", handleSearch);

function handleSearch() {
  let search = searchfield.value;
  //api call
  apiSearch(search);
  //removes content
  container.innerHTML = "";
  //if there is a filter active i will remmove the styling
  rFilter.style.display="none";
  oPlant.style.backgroundColor="#425B76";
  iPlant.style.backgroundColor="#425B76";
  pPlant.style.backgroundColor="#425B76";
}
//making a variable i will use to check for results in my search function, if i hit a result i have a increment to check how many results i hit and also if this is 0 i can display that no results matched.
let count = 0;
async function apiSearch(search) {
  try {
    
    const response = await fetch(url);
    const posts = await response.json();
    container.innerHTML = "";
    for (let i = 0; i < posts.length; i++) {
      console.log(i);
      console.log(searchfield.value);
      console.log(posts[i].title.rendered[0]);
      //make sure the values are to lowercase 
      if (posts[i].title.rendered.toLowerCase().includes(searchfield.value.toLowerCase())) {
        count ++;
        await matchPost(posts[i]);
      }
      else {

      }
    }
  
}
   catch (e) {
     
     // if theres an error i display it in the container and console log it
    container.innerHTML = e;
    console.log(e);
  } finally {
    btnSeeMore.style.display="inline";
    searchResults.style.display ="block";
    console.log(count);
    if (count === 0) {
          searchResults.innerHTML = `<p> no matching results </p>`;
          

    }
    else {
      searchResults.innerHTML = `you got ${count} results`;
    }
    // 
    count = 0;
}

}
