const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transactions: []
};

let local = localStorage;

checkLogged();

document.getElementById("logout-button").addEventListener("click", logout);

//ADICIONAR LANÇAMENTO
document.getElementById("transaction-form").addEventListener('submit', function (e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById('value-input').value);
    const description = document.getElementById('description-input').value;
    const date = document.getElementById('date-input').value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    
    localStorage.removeItem("value-input");

    data.transactions.unshift({
        value: value, type: type, description: description, date: date
    });

    saveData(data);
    e.target.reset();
    myModal.hide();


    getTransactions();
    getTotal();
    

    alert("Lançamento adicionado com sucesso!");

});

// CHECAR SE ESTÁ LOGADO
function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (!logged) {
        window.location.href = 'index.html';
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if (dataUser) {
        data = JSON.parse(dataUser);
    }

    getTransactions();
    getTotal();

}

// FAZER O LOGOUT
function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = 'index.html';
}

// MOSTRA AS TRANSAÇÕES
function getTransactions() {
    const transactions = data.transactions;
    let transactionsHtml = ``;

    if (transactions.length) {
        transactions.forEach((item) => {
            let type = "Entrada";

            if (item.type === "2") {
                type = "Saída";
            }

            transactionsHtml += `
                <tr>
                    <th scope="row">${item.date}</th>
                    <td>R$ ${item.value.toFixed(2)}</td>
                    <td>${type}</td>
                    <td>${item.description}</td>
                    <td><button class="btn button-delete" type="button" onclick="deleteItem()">Excluir</button></td>
                </tr>
            `;
        });

        document.getElementById('transactions-list').innerHTML = transactionsHtml;

    }
}

// MOSTRA O VALOR TOTAL
function getTotal() {
    const transactions = data.transactions;
    let total = 0;

    transactions.forEach((item) => {
        if (item.type === "1") {
            total += item.value;
        } else {
            total -= item.value;
        }
    })

    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;
}

function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

