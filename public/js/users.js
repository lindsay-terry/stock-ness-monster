//function to toggle add new user form
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

//function to delete a user
const deleteUser = async (event) => {
    event.preventDefault();
    //get id of user to delete
    const id = event.target.getAttribute('data-id');
    Swal.fire({
        title: 'Are you sure?',
        text: 'This cannot be undone.  Proceed?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete.',
        customClass: {
            popup: 'custom-confirm-popup',
            confirmButton: 'custom-confirm-button'
        }
    }).then(async (result) => {
        //if sweetalert response is confirmed, initiate request to delete
        if (result.isConfirmed) {
            try {
                const response = await fetch(`/api/users/${id}`, {
                    method: 'DELETE',
                });
                //if response is ok, show confirmation alert
                if (response.ok) {
                    await Swal.fire({
                        title: 'Success',
                        text: 'User has been successfully deleted',
                        icon: 'success',
                        confirmButtonText: 'Okay',
                        customClass: {
                            popup: 'custom-confirm-popup',
                            confirmButton: 'custom-confirm-button'
                        }
                    });
                    //refresh the page to update list
                    document.location.replace('/users');
                } else {
                    //error alert
                    await Swal.fire({
                        title: 'Error',
                        text: "There's been an error deleting the user, please try again.",
                        icon: 'error',
                        confirmButtonText: 'Okay',
                        customClass: {
                            popup: 'custom-error-popup',
                            confirmButton: 'custom-confirm-button'
                        }
                    });
                }
            } catch (error) {
                //catch error alert
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Okay',
                });
            }
        }
    });
};

//function to edit a user
const editUser = async (event) => {
    event.preventDefault();
    const id = event.target.getAttribute('data-id');


};

//event listeners
//event listener for add user button to toggle form
document
    .getElementById('add-usr')
    .addEventListener('click', toggleForm);

//event listener for submit button to create a new user
document
    .getElementById('create-usr')
    .addEventListener('click', addUser);

//event listener for edit user button to edit users
document
    .querySelector('.modal-container')    
    .addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-btn')) {
            editUser(event);
        }
    });

//event listener for delete button to delete users
document
    .querySelector('.modal-container')
    .addEventListener('click', function(event) {
        if (event.target.classList.contains('del-btn')) {
            deleteUser(event);
        }
    });