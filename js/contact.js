// query selectors
const form = document.querySelector("#contact-form");
const firstName = document.querySelector("#fname");
const firstNameError = document.querySelector("#firstNameError");
const subject = document.querySelector("#fsubject");
const subjectError = document.querySelector("#subjectError")
const email = document.querySelector("#femail");
const emailError = document.querySelector("#emailError");
const message = document.querySelector("#fmessage");
const messageError = document.querySelector("#messageError");
const validation = document.querySelector(".validationMessage");

//adding eventlistener to the form.
form.addEventListener("submit", handleSubmit);

//called when pressed submit
function handleSubmit() {
    //preventing default of the submit that refreshes the page etc.
    event.preventDefault();
    //checking the different user inputs from the form with the coresponding lenght
    // and or regex for the email input.
    //will eighter display the error message or not.
    if(checkLen(firstName.value, 5)) {    
        firstNameError.style.display = "none";
    } else{
        firstNameError.style.display = "block";
    }
    if(checkLen(subject.value, 15) === true) {
        subjectError.style.display = "none";
    } else {
        subjectError.style.display ="block";
    }
    if(checkLen(message.value, 25) === true) {
        messageError.style.display = "none";
    } else {
        messageError.style.display ="block";
    }
    if((validateEmail(email.value) === true) && (email.value.length > 5)) {
        emailError.style.display = "none";
        console.log("inne");

    } else {

        emailError.innerHTML = `Please enter a valid email address.`;
        emailError.style.display = "block";
    }
    //this checks if eveything is fine and will give the user a validation for the sent form
    console.log(email.value.length > 0);
    if(validateEmail(email.value) && checkLen(firstName.value, 5) && checkLen(message.value, 25) && checkLen(subject.value, 15) && (email.value.length > 0)) {
        console.log("JAAA");
        handleFormSubmit();
        validation.innerHTML = `<h2>the form has been sent</h2>`;

    } else {
        //if the user tries to resend after getting a valdation i remove the validation if the information is not correct.
        validation.innerHTML = ``;
    }
}

//check lenght function tha's called further up.
function checkLen(value, len) {
    if(value.trim().length > len)   {
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

//posting contact form to wordpress
//this was my attempt to posting to wordpress, this does not currently work
//described in the raport
async function handleFormSubmit() {
    event.preventDefault();


    const emailBody = {
        "your-name": firstName,
        "your-email": email,
        "your-message": message,
    };

const form = new FormData();
for (const field in emailBody) {
    form.append(field, emailBody[field]);
}
 const post_url = `https://eksamen.audun.site/wp-json/contact-form-7/v1/contact-forms/146/feedback`;
fetch(post_url, {
    method: 'post', 
    headers: {
      'content-Type': 'application/json',
    },
    body: form,
  })
  .then((response) => {
    if (response.ok === true) {
      document.location.reload (true); 
    }
    return response.json();
  })
  .then((Object) => {
    //failed
  })
  .catch(error => console.log("error",  error));

  
  }
  
