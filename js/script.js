


const slider = document.querySelector(".slideshow-container");
const url = `https://eksamen.audun.site/wp-json/wp/v2/posts`;
const mediaUrl = `https://eksamen.audun.site/wp-json/wp/v2/media/`;

//api call for the slider posts.
//got the images corresponding to the post the same way i commented on in the posts.js
async function sliderAPI() {
    try{
        const response = await fetch(url);
        const result = await response.json();
        //empties container
        slider.innerHTML="";
        console.log("inne");
        
        for( let i = 0; i <result.length; i++) {
          //only wanted 3 posts displayed
            if (i > 2) {
                break;
            }console.log(result[i]);
            await displayPost(result[i]);
        }
    }catch(e) {

    }finally {
      //the slider content is added after the posts in the html, this was easier to style this way.
      slider.innerHTML += `        <a class="siste" onclick="plusSlides(-1)">❮</a>
      <a class="neste" onclick="plusSlides(1)">❯</a>
      
      </div>
      <br>
      
      <div class ="dotDiv">
        <span class="circle" onclick="denneSlide(1)"></span> 
        <span class="circle" onclick="denneSlide(2)"></span> 
        <span class="circle" onclick="denneSlide(3)"></span> 
      </div>`; 
      //i had to call this function in the finally statement as the posts displayd were not yet defined.
      visSlides(count);  
    }
}

//display post function
async function displayPost(post) {
    try {
                console.log("inne");
    let mediaObj = null;
    if (post.featured_media !== 0) {
        mediaObj = await getMedia(post.featured_media);
        console.log(mediaObj);
    }
    console.log(mediaObj);
    
    slider.innerHTML += createHTML(post, mediaObj);

    }catch(e) {

    } finally {
        
        
    }
}
async function getMedia(id) {
    try {
      const response = await fetch(mediaUrl + id);
      const imageData = await response.json();
      return imageData;
    } catch (e) {
      container.innerHTML = e;
    } 
  }

  function createHTML(post, image) {
      console.log("to");
      let img ="hei";
      const yup = post.id;
      if (image) 
      img = `<img src='${image.media_details.sizes.medium.source_url}' alt="${image.alt_text}"/>`;
      return `  <div class="mSlide slide-animation">
      <a href="spesific-post.html?id=${post.id}">
      ${img}
      <div class="alt_text"><p>${image.alt_text}</p> </div>
    </div>
  `;
    
  }

  sliderAPI();

  
 let count = 1;



function plusSlides(x) {
  visSlides(count += x);
}


function denneSlide(x) {
  visSlides(count = x);
}

function visSlides(x) {

  let i;
let circles = document.getElementsByClassName("circle");
  let allSlide = document.getElementsByClassName("mSlide");

  //what slides will be displayed and what slides will not be displayed

  if (x > allSlide.length) {
    count = 1
  }
  if (x < 1) {
    count = allSlide.length
  }
  for (i = 0; i < allSlide.length; i++) {
    //setting display style to none
    allSlide[i].style.display = "none";
  }
  for (i = 0; i < circles.length; i++) {
    
    circles[i].className = circles[i].className.replace(" active", "");
  }
  //setting display to block and gives the dot another class "active"
  allSlide[count-1].style.display = "block";
  circles[count-1].className += " active";
}




// newsletter signup

const btnSignup = document.querySelector("#btnSignUp");
const sEmail  = document.querySelector("#sEmail");
const vEmail = document.querySelector("#validationSignUp");
btnSignup.addEventListener("click", handleSignUp);

function handleSignUp() {
  event.preventDefault();
  console.log(sEmail.value);
  if((validateEmail(sEmail.value) === true) && (sEmail.value.length > 5)) {
   vEmail.innerHTML = `You signed up for the newsletter`;
    console.log("inne");
} else {
  //displays error
  vEmail.innerHTML = `This email is invalid`;
}
}
//validate email regex
function validateEmail(email) {
  console.log(email);
  //regex
  const regEx = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
  //matching
  const matching = regEx.test(email);
  console.log(matching);
  //returns true or false
  return matching;
}
