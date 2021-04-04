const endPoint = "http://localhost:8080/api/v1/contactbook"

const searchBtn = document.querySelector("#searchBtn");

const deleteAllBtn = document.querySelector("#deleteAllBtn");

const initBtn = document.querySelector("#initBtn");

function getAllContacts() {

    fetch(`${endPoint}/all`, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((resp) => resp.json())
        .then((data) => {
            // console.log(data);
            displayContacts(data)
        })
        .catch((err) => {
            console.error(err);
        })

}

function displayContacts(contacts) {

    let str = '';

    contacts.forEach(element => {
        let name = element.name;
        let email = element.email;
        let mobile = element.mobile;
        let city = element.city;

        str += `<tr> 
        <td> ${name} </td> 
        <td> ${mobile} </td> 
        <td> ${email} </td> 
        <td> ${city} </td> 
        `
    });

    document.querySelector("#tBody").innerHTML = str;
}


searchBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const searchForm = document.querySelector("#searchForm");

    let name = searchForm.search.value;

    fetch(`${endPoint}/${name}`, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((resp) => resp.json())
        .then((data) => {
            try {
                displayContacts(data)
            } catch (error) {
                alert("No Contacts Found");
            }
        })
        .catch((err) => {
            console.error(err);
        })

})


deleteAllBtn.addEventListener('click', (event) => {
    event.preventDefault();

    let action = confirm('Are you sure delete all contacts');

    if (action) {
        fetch(`${endPoint}/deleteall`, {
            method: 'DELETE',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                try {
                    console.log(data);
                    alert(data['status']);
                    getAllContacts();
                } catch (err) {
                    console.error(err);
                    alert(data['status']);
                }
            })
            .catch((err) => {
                console.error(err);
            })
    }

})


initBtn.addEventListener('click', (event) => {
    event.preventDefault();

    let action = confirm('Are you sure to delete all contacts and initialize default contacts');

    if (action) {
        fetch(`${endPoint}/init`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                try {
                    console.log(data);
                    alert(data['status']);
                    getAllContacts();
                } catch (err) {
                    console.error(err);
                    alert(data['status']);
                }
            })
            .catch((err) => {
                console.error(err);
            })
    }

})


getAllContacts();
