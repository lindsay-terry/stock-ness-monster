//function to add a new user
const toggleForm = (event) => {
    event.preventDefault();
    const form = document.querySelector('#user-form');

    if (form.getAttribute('style') === 'display: none') {
        form.setAttribute('style', 'display: block;');
    } else {
        form.setAttribute('style', 'display: none');
    }
};

//function to create a new user
const addUser = async (event) => {
    event.preventDefault();

    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (password.length < 8) {
        Swal.fire({
            title: 'Error:',
            text: 'Your password must be longer than 8 characters',
            icon: 'error',
            confirmButtonText: 'Okay',
                customClass: {
                    popup: 'custom-error-popup',
                    confirmButton: 'bg-warning'
                }
            });
    } else if (firstName && lastName && username && password) {
        try {
            //fetch request to api/users
            const response = await fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify({ firstName, lastName, username, password }),
                headers: { 'Content-Type': 'application/json' },
            });
            
            if (response.ok) {
                await Swal.fire({
                    title: 'Success!',
                    text: `Added ${firstName} ${lastName} as ${username} to the team.`,
                    icon: 'success',
                    confirmButtonText: 'Okay',
                    customClass: {
                        popup: 'custom-confirm-popup',
                        confirmButton: 'custom-confirm-button'
                    }
                }).then(() => {
                    document.location.replace('/users');
                })
            } else {
                throw new Error('Failed to create user');
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error,
                icon: 'error',
                confirmButtonText: 'Okay',
                customClass: {
                    popup: 'custom-error-popup',
                    confirmButton: 'bg-warning'
                }
            });
        }
    }


};


document
    .getElementById('add-usr')
    .addEventListener('click', toggleForm);

document
    .getElementById('create-usr')
    .addEventListener('click', addUser);