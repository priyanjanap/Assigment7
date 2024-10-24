const showHiddenPass1 = (loginPass, loginEye) =>{
    const input1 = document.getElementById(loginPass),
        iconEye1 = document.getElementById(loginEye)

    iconEye1.addEventListener('click', () =>{
        if(input1.type === 'password'){
            input1.type = 'text'

            iconEye1.classList.add('ri-eye-line')
            iconEye1.classList.remove('ri-eye-off-line')
        } else{

            input1.type = 'password'

            iconEye1.classList.remove('ri-eye-line')
            iconEye1.classList.add('ri-eye-off-line')
        }
    })
}

showHiddenPass1('login-pass','login-eye')


const showHiddenPass2 = (signupPass, signupEye) =>{
    const input2 = document.getElementById(signupPass),
        iconEye2 = document.getElementById(signupEye)

    iconEye2.addEventListener('click', () =>{
        if(input2.type === 'password'){
            input2.type = 'text'

            iconEye2.classList.add('ri-eye-line')
            iconEye2.classList.remove('ri-eye-off-line')
            console.log("pass")
        } else{

            input2.type = 'password'

            iconEye2.classList.remove('ri-eye-line')
            iconEye2.classList.add('ri-eye-off-line')

            console.log("fail")
        }
    })
}

showHiddenPass2('signup-pass1','signup-eye1')
const showHiddenPass3 = (signupPass, signupEye) =>{
    const input2 = document.getElementById(signupPass),
        iconEye2 = document.getElementById(signupEye)

    iconEye2.addEventListener('click', () =>{
        if(input2.type === 'password'){
            input2.type = 'text'

            iconEye2.classList.add('ri-eye-line')
            iconEye2.classList.remove('ri-eye-off-line')
            console.log("pass")
        } else{

            input2.type = 'password'

            iconEye2.classList.remove('ri-eye-line')
            iconEye2.classList.add('ri-eye-off-line')

            console.log("fail")
        }
    })
}

showHiddenPass3('signup-pass2','signup-eye2')
//
// localStorage.setItem("123", "user");
// localStorage.setItem("1234", "password");

// JavaScript for handling login

document.getElementById("loginForm").addEventListener("submit", function(event){
    event.preventDefault();  // Prevent form submission

    // Correct username and password stored
    const correctUsername = ("username");
    const correctPassword = ("password");

    // Get input values
    const enteredUsername = document.getElementById("login-userName").value;
    const enteredPassword = document.getElementById("login-pass").value;

    // Check if the username and password are correct
    if (enteredUsername === correctUsername && enteredPassword === correctPassword) {
        // Store login state in localStorage
        localStorage.setItem("isLoggedIn", "true");

        // Use replaceState to prevent the back button from returning to the login page
        history.replaceState(null, null, 'index.html');

        // Redirect to the dashboard page
        window.location.assign("http://localhost:63342/My%20Pos-System/index.html?_ijt=9jpuhigeb9q5kao34fobfuuijq&_ij_reload=RELOAD_ON_SAVE");
    } else {
        // Display error message if login fails
        // document.getElementById("error-message").innerText = "Incorrect username or password!";
        // document.getElementById("error-message").style.color = "red";
        //
        //
    }
});
window.onpopstate = function(event) {
    if (localStorage.getItem("isLoggedIn") === "true") {
        history.go(0);
    }
};

