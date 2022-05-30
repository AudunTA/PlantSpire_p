
//get the parameter
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
//retrives the data from the parameter and assign it to a variable
const id = params.get("id");
//api urls
const url = `https://eksamen.audun.site/wp-json/wp/v2/posts/`;
const mediaUrl = `https://eksamen.audun.site/wp-json/wp/v2/media/`;
const commentUrl = `https://eksamen.audun.site/wp-json/wp/v2/comments?post=`;

console.log(commentUrl);
//queryselectors
const container = document.querySelector(".container-spes");
const modal = document.getElementById("myModal");
const modalImg = document.getElementById("img-modal");
const pageTitle = document.querySelector("title");

//single post api call function
async function displaySingleProduct() {
    try {
       
        //fetching and retriving data from the API.
        const response = await fetch(url+id);
        const result = await response.json();
        console.log("test", result.id);
        console.log(result.featured_media);
        //changeing title name based on post title.
        pageTitle.innerHTML =`Posts | ${result.title.rendered}`;
        let imgData = await callMedia(result.featured_media);
        createHTML(result, imgData);

    }catch(e){
      console.log(e);
      container = e;
    } finally {
      //the modal needs to be called in the finally statement
      hEvent();
      
    }
}
async function callMedia(id) {
    try {
      const response = await fetch(mediaUrl + id);
      const imageData = await response.json();
      return imageData;
    } catch (e) {
      container.innerHTML = e;
    }
  }

  //create html function
function createHTML(result, img) {
  container.innerHTML="";
  let category = result.categories[0];

  console.log(typeof(category));
//assign the html string to the category variable corresponding to the category id.
  if ( category === 4) {
    category = `<a href="posts.html?filter=indoor"><p>Indoor Plants</p></a>`
  }
  if(category === 5) {
    console.log("inne");
    category = `<a href="posts.html?filter=outdoor"><p>Outdoor Plants</p></a>`
  }
  if(category === 6) {
    category = `<a href="posts.html?filter=plastic"><p>Plastic Plants</p></a>`
  }
 
  
  //insert into html
  console.log(img.alt_text);
    container.innerHTML += `<div class="itemDetails" id="${result.id}"> 
        <div id="section-spes">
    <img src="${img.media_details.sizes.medium.source_url}" id="modalImage" alt="${img.alt_text}">
  </div>
  <div id="section-spess">
    <h1>${result.title.rendered}</h1>
    ${result.excerpt.rendered}
   <div class="category-link"> ${category}</div> 
    </div> 
    </div>`;
    console.log(img.media_details.sizes.medium.source_url);

}
displaySingleProduct();


//function that needs to be called after the api call for the queryselector and
//eventlistener to be read.
function hEvent() {
  const img = document.getElementById("modalImage");
  img.addEventListener("click", imgClick);

}
//if the image is clicked it will display the class modal and
//insert the clicked image into the modal container.
 function imgClick() {
   modal.classList.toggle("displayClass");
   modalImg.src = this.src

   
 }
 //this is probably not the best way to only close the modal if anything but the image is clicked, if the background is pressed the classlist will be more than 2 so i made this function to check if image is pressed.
modal.addEventListener("click", function(e) {
  if( (e.target.classList.length) > 1) {
    modal.classList.remove("displayClass");
  };
  
});



const commentStatus = document.querySelector(".comment-status");
 async function displayComments() {
    try {
      const response = await fetch(commentUrl+id);
      const result = await response.json();
      console.log(result.length);
      if (result.length === 0) {
        commentStatus.style.display="block";
      }
      for(let i = 0; i < result.length; i++) {
        commentHTML(result[i]);
      }
    } catch(e) {
      console.log(e);
      commentStatus = e;
    } finally {

    }
 }
 displayComments();

 const comment = document.querySelector(".comments");
 function commentHTML(com) {
   console.log(com.slug);
  comment.innerHTML += `<div class="comment-container">
  <div class="email-section">
  <h2 id="comment-email">${com.author_name} ${com.date}</h2>
  </div>
  <div class="text-section">
  ${com.content.rendered}
  </div>
  </div>`;
 }
//contact form queryselectos
 const fname = document.querySelector("#cname");
const auth_email = document.querySelector("#cemail");
const auth_comment = document.querySelector("#ccomment");
const form = document.querySelector("#comment-form");

const commentError = document.querySelector("#commentError");
const nameError = document.querySelector("#firstNameError");
const emailError = document.querySelector("#emailError");

form.addEventListener("submit", handleCommentSubmit);
// handling input errors as i did in contact.js
function handleCommentSubmit() {
  //preventing default
  event.preventDefault();
  console.log(fname.value);
  //checks values and handling erros
  if(checkLen(fname.value, 5) === true) {
    nameError.style.display = "none";
} else {
    nameError.style.display ="block";
}
if(checkLen(auth_comment.value, 15) === true) {
  commentError.style.display="none";
}
else {
  commentError.style.display="block";
}
console.log(auth_email.value);
console.log(validateEmail(auth_email.value));
if((validateEmail(auth_email.value)) && (auth_email.value.length > 5)) {
    emailError.style.display = "none";
    console.log("inne");
} else {
  emailError.style.display="block";
}

if(!(validateEmail(auth_email.value)) || !(checkLen(auth_comment.value, 15)) || !(checkLen(fname.value, 5))) {
  console.log("failed");
}
else {
  //if everything alright posting commennt
  postComment();
}

}
//post comment function
function postComment() {
  let postID = id;
  //data i want to post
  const data = JSON.stringify( {
    post: postID,
    author_name: fname.value,
    author_email: auth_email.value,
    content: auth_comment.value,
  });
  
  
  const post_url = `https://eksamen.audun.site/wp-json/wp/v2/comments`;
  //url fetch and post method
  fetch(post_url, {
    method: 'post', 
    headers: {
      'content-Type': 'application/json',
    },
    //data in the body
    body: data,
  })
  .then((response) => {
    if (response.ok === true) {
      //reloads page if comment is posted to update the display
     document.location.reload (true); 
    }
    return response.json();
  })
  .then((Object) => {
    //failed
  })
  .catch(error => console.log("error",  error));
  console.log(id);
  
  }
  



function checkLen(value, len) {
  if(value.trim().length >= len)   {
      //if the value.trim (removes spaces) is longer than the lenght it will return true.
      console.log("true");
      return true;
  }
  else {
      //return false if not right.
      return false;
  }
}

//regex for email validation
function validateEmail(email) {
  console.log(email);
  const regEx = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
  const matching = regEx.test(email);
  console.log(matching);
  //returns true or false
  return matching;
}