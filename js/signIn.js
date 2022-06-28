// ----------------------- SIGN IN
// inputes and submit button
const userEmail = document.getElementById('userEmail');
const userPassword = document.getElementById('userPassword');
const signIn = document.getElementById('signIn');
const toSignUpPart = document.getElementById('toSignUpPart');
const hidePart = document.getElementById('hidePart');
const showPassword = document.getElementById('showPassword');



// warning & success messages
const messageElement = document.getElementById('messageElement');
const warningMessage = 'text-danger';  

//to Show any message to the user
function showMessage( type , text) {
    messageElement.innerHTML = text;
    messageElement.classList.add(type);
    if(messageElement.classList.contains('d-none')){
        messageElement.classList.replace('d-none' , 'd-block')
    }
}

function hideMessage() {
    if(messageElement.classList.contains('d-block')){
        messageElement.classList.replace('d-block','d-none' )
    }
}





// main function
if(signIn) {
    signIn.addEventListener('click' , function(e) {
        //to strop the form from restart the page
        e.preventDefault()
        //start with resset all messages
        hideMessage();

        // 1 -- make sure the user enterd values in all inputs
        if(isEmptyValue(userEmail.value,userPassword.value) == true) {
            // 2 -- make sure this email in listOfUsers
            if(isEmailExist(userEmail.value) != -1){
                // 3 -- get user index 
                let index = isEmailExist(userEmail.value);
                // 4 -- make sure he enterd the wright password
                if(getPassword(index,userPassword.value) == true) {
                // 5 --- send his data to welcome Page
                    sessionStorage.setItem('user', JSON.stringify(listOfUsers[index]));
                // 6 -- and lets go there   
                    location.assign("./homePage.html")
                }
            }
        }
    })
}


//move to sign up part
if(toSignUpPart){
    toSignUpPart.addEventListener('click' , ()=>{
        if(hidePart.classList.contains('start-0')){
            hidePart.classList.replace('start-0','start-100')
        }
        if(hidePart.classList.contains('rounded-start')){
            hidePart.classList.replace('rounded-start','rounded-end')
        }
    })
}


//
function isEmailExist(Email) {
    for(let [i,v] of listOfUsersMap){
        if(v.email == Email) {
            return i;
        } 
    }
    showMessage(warningMessage , 'This Email Not Exist')
    return -1;
}


function isEmptyValue(email , password) {
    if(email == '' || password == '') {
        showMessage(warningMessage , 'All Iputes Required')
        return false;
    }

    return true;
}

function getPassword(index,password) {  
    if(listOfUsers[index].password == password) {
        return true;
    }else {
        showMessage(warningMessage,"Password Is Wrong")
    }
}

