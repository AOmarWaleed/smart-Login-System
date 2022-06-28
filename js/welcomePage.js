const welcomeMess = document.getElementById('welcomeMess');
const logOut = document.getElementById('logOut');

//get user data from sessionStorage to start use it 
let user = JSON.parse(sessionStorage.getItem('user'));
welcomeMess.innerHTML = `welcome ${user.name}`;



if(logOut) {

    logOut.addEventListener('click',function() {
        sessionStorage.removeItem('user');
        location.replace('index.html')
    })
}