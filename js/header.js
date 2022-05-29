//queryselectors.
const header = document.querySelector("header");
const white = document.querySelector(".white");
const menuIcon = document.querySelector(".fa-bars-sort");
const closeIcon =document.querySelector(".close-icon");
const menu = document.querySelector(".hamburger-menu");
//eventlistener for scrolling on the document.
document.addEventListener('scroll', handleScroll);

function handleScroll() {
  //header gets different heights for mobile and desktop
  let screenWidth = window.innerWidth;
  //first checks scoll position
    if(window.scrollY > 90) {
      //then the screenwidth
      //style the header height to the desired heigth for differnt screenwidths and scrollposition.
      if(screenWidth > 805) {

      
        header.style.height = "100px";
        white.style.height ="100px";
    } else {
      header.style.height = "75px";
      white.style.height ="75px";
    }
    }
    else {
      if(screenWidth > 805) {
        header.style.height = "142px";
        white.style.height = "142px";
      }
      else {
        header.style.height = "100px";
        white.style.height ="100px";
      }
    }
}

//scroll up when click arrow icon in footer

const arrowUp = document.querySelector(".scroll-up");

arrowUp.onclick = function() {
  window.scrollTo(0,0);
}

//hamburger menu, eventlistener for clicking the icon
menuIcon.addEventListener("click", handleMenu);

function handleMenu() {
    //gives the menu a class if clicked
    menu.classList.add("showMenu");
    closeIcon.style.display = "block";
    menu.style.display="block";
}   
closeIcon.addEventListener("click", handleClose);

function handleClose() {
  menu.style.display="none";
  menu.classList.remove("showMenu");
  menuIcon.style.display = "block";

}