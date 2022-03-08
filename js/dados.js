let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");


checkLogged();

document.getElementById("logout-button").addEventListener("click", logout);
document.getElementById("transactions-button").addEventListener("click", function(){
    window.location.href = 'transactions.html';
});



function checkLogged() {
   if(session) {
       sessionStorage.setItem("logged", session);
       logged = session;
   }

   if(!logged) {
       window.location.href = 'index.html';
       return;
   }

   const dataUser = localStorage.getItem(logged);
   if(dataUser) {
       data = JSON.parse(dataUser);
   }


}

function logout() {
   sessionStorage.removeItem("logged");
   localStorage.removeItem("session");

   window.location.href = 'index.html';
}

const dadosEmail = document.getElementById("email-input").innerHTML


function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
} 

function getAccount(Key) {
    const account = localStorage.getItem(Key);
    if(account) {
        return JSON.parse(account);
    }

    return "";
    
} 