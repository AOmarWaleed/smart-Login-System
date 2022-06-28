// ----------------------- SIGN UP
// inputes and submit button
const signUpUserName = document.getElementById('signUpUserName');
const signUpUserEmail = document.getElementById('signUpUserEmail');
const signUpUserPassword = document.getElementById('signUpUserPassword');
const signUp = document.getElementById('signUp');
const toSignInPart = document.getElementById('toSignInPart');
const hideHlafPart = document.getElementById('hidePart');


//regular ex
const emailRE = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const paawordRE = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;


//MESSAGE (warning , successed)
const messageElementSingUp = document.getElementById('messageElementSingUp');
const warningMessageSingUp = 'text-danger',
      successMessageSingUp = 'text-primary'    

//to Show any message to the user
function showMessageSignUp( type , text) {
    messageElementSingUp.innerHTML = text;
    if(type == warningMessageSingUp) {
        if(messageElementSingUp.classList.contains(successMessageSingUp)) {
            messageElementSingUp.classList.replace(successMessageSingUp , warningMessageSingUp)
        }
    }else {
        if(messageElementSingUp.classList.contains(warningMessageSingUp)) {
            messageElementSingUp.classList.replace(warningMessageSingUp , successMessageSingUp)
        }
    }
    messageElementSingUp.classList.add(type);
    if(messageElementSingUp.classList.contains('d-none')){
        messageElementSingUp.classList.replace('d-none' , 'd-block')
    }
}
//to hide any message 
function hideMessageSignUp() {
    if(messageElementSingUp.classList.contains('d-block')){
        messageElementSingUp.classList.replace('d-block','d-none' )
    }
}


//show password when u trype or hide it
if(showPassword){
    showPassword.addEventListener('click',function() {
        if(this.checked){
            if(signUpUserPassword.getAttribute('type') == 'password') {
                signUpUserPassword.setAttribute('type' , 'text') 
            }
        }else {
            if(signUpUserPassword.getAttribute('type') == 'text') {
                signUpUserPassword.setAttribute('type' , 'password')
            }
        }
    })
}



//Move To Sign In Part 
if(toSignInPart) {
    toSignInPart.addEventListener('click', ()=> {
        if(hidePart.classList.contains('start-100')){
            hidePart.classList.replace('start-100','start-0')
        }
        if(hidePart.classList.contains('rounded-end')){
            hidePart.classList.replace('rounded-end','rounded-start')
        }
    })
}


//main Function 
if(signUp) { 
    signUp.addEventListener('click', function(e) {
        //start with restart all warning messages
        hideMessageSignUp();
        //to stop form from restart th epage
        e.preventDefault();
        //it will get user values and save it in local stage
        setUsers();
    })
}


let listOfUsers = [] ;
let listOfUsersMap = [];
let lastId = 0;
// if we have any users ,, put them in the listOfUsers array
// and get the last id
if(localStorage.getItem('users') != null) {
    listOfUsers = JSON.parse(localStorage.getItem('users'));
    //using itiretable object 
    listOfUsersMap = new Map(Object.entries(listOfUsers));
    lastId = listOfUsers[(listOfUsers.length - 1)].id;
    lastId++;
}

function setUsers() {
    console.log("hi");
  // 1 -- make sure all inputs have values   
  if(signUpUserName.value == '' ||signUpUserEmail.value == '' ||signUpUserPassword.value == '' ){
    showMessageSignUp(warningMessageSingUp,"All Inputes Required")
  }else {
    // 2 -- make sure this is a new email 
    if(isEmailExist(signUpUserEmail.value) == -1) {
        //3 -- valid the Email
        if(emailRE.test(signUpUserEmail.value)){
            //4-- valid the Password
            if(paawordRE.test(signUpUserPassword.value)){
                var user = {
                    name : signUpUserName.value,
                    email : signUpUserEmail.value,
                    password : signUpUserPassword.value,
                    id : lastId++,
                }
                clearInputes();
                listOfUsers.push(user);
                localStorage.setItem('users' , JSON.stringify(listOfUsers));
                showMessageSignUp(successMessageSingUp,"Successed Sign Up")


                //to pe dynamic ,, get data without reloading
                listOfUsers = JSON.parse(localStorage.getItem('users'));
                listOfUsersMap = new Map(Object.entries(listOfUsers));
            }else {
                showMessageSignUp(warningMessageSingUp,'Pls Enter At Lest 8 Char including at lest a - z A - Z')
            }
         
        }
        else {
            showMessageSignUp(warningMessageSingUp,"Pls Use Valid Email")
        }
    }else {
        showMessageSignUp(warningMessageSingUp,"This Email Already Exsit");
    }
  }
    
}

function clearInputes() {
    signUpUserName.value = "";
    signUpUserEmail.value = "";
    signUpUserPassword.value = "";
}

//if the function find the user email it will retuen the user index
// else it will return -1
function isEmailExist(Email) {
    for(let [i,k] of listOfUsersMap){
        if(k.Email == Email){
            return i;
        }
    }
    
    return -1;
}
