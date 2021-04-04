const addBtn = document.querySelector("#addContact");

const cancelBtn = document.querySelector("#cancel");

const endPoint = "http://localhost:8080/api/v1/contactbook"

addBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const cForm = document.querySelector("#newContactForm");

    let name = cForm.cname.value;
    let email = cForm.email.value;
    let mobile = cForm.mobile.value;
    let city = cForm.city.value;

    const contactObj = {
        'name': name, 'email': email, 'mobile': mobile, 'city': city
    }

    console.log(contactObj);

    addContact(contactObj);

});


function addContact(contactObj) {
    fetch(`${endPoint}/new`, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactObj)
    })
        .then((resp) => resp.json())
        .then((data) => {
            if (data['status'] === 'Created') {
                alert("Contact added")
            }
            if (data['status'] === 'Failed') {
                alert("Failed to add contact")
            }
        })
        .catch((err) => {
            console.error(err);
        })
}


cancelBtn.addEventListener('click', (event) => {
    event.preventDefault();
    window.location = "index.html";
})