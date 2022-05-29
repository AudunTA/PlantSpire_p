const body =document.querySelector("body");
const img = document.querySelectorAll("#Image");

for(let i = 0; i < 2; i++) {
    img[i].addEventListener("click", handleClick);
}

function handleClick(num) {
    for(let i = 0; i < 2; i++) {
        img[i].classList.remove("fokusert-bilde");
        body.style.backgroundColor="white";
    }
    console.log("Hei");
    this.classList.toggle("fokusert-bilde");
    body.style.backgroundColor="grey";
}
