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

// Function to edit a user
const editUser = async (event) => {
    event.preventDefault();
    const id = event.target.getAttribute('data-id');
    console.log(`Editing user with id: ${id}`); // Debug log

    const firstName = document.getElementById(`edit-first-name-${id}`).value.trim();
    const lastName = document.getElementById(`edit-last-name-${id}`).value.trim();
    const username = document.getElementById(`edit-username-${id}`).value.trim(); 
    const password = document.getElementById(`edit-password-${id}`).value.trim();
    const confirmPassword = document.getElementById(`confirm-edit-password-${id}`).value.trim();
    
    console.log(`New values - First Name: ${firstName}, Last Name: ${lastName}, Username: ${username}, Password: ${password}, Confirm Password: ${confirmPassword}`); // Debug log

    // Added password match validation
    if (password !== confirmPassword) {
        Swal.fire({
            title: 'Error!',
            text: 'Passwords do not match',
            icon: 'error',
            confirmButtonText: 'Okay',
            customClass: {
                popup: 'custom-error-popup',
                confirmButton: 'bg-warning'
            }
        });
        return;
    }

    if (firstName && lastName && username && password) {
        try {
            const response = await fetch(`/api/users/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ firstName, lastName, username, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                await Swal.fire({
                    title: 'Success!',
                    text: 'Profile updated successfully',
                    icon: 'success',
                    confirmButtonText: 'Okay',
                    customClass: {
                        popup: 'custom-confirm-popup',
                        confirmButton: 'custom-confirm-button'
                    }
                });
                document.location.replace('/users');
            } else {
                throw new Error('Failed to update profile');
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

// Event listeners
// Event listener for add user button to toggle form
document
    .getElementById('add-usr')
    .addEventListener('click', toggleForm);

// Event listener for submit button to create a new user
document
    .getElementById('create-usr')
    .addEventListener('click', addUser);

// Event listener for edit user button to edit users
document
    .querySelector('.modal-container')
    .addEventListener('click', function (event) {
        if (event.target.classList.contains('edit-btn')) {
            const userId = event.target.getAttribute('data-id');
            const editFormContainer = document.getElementById(`edit-form-container-${userId}`);
            editFormContainer.style.display = 'block';
            console.log(`Displaying edit form for user with id: ${userId}`); // Debug log
        }
    });

// Event listener for delete button to delete users
document
    .querySelector('.modal-container')
    .addEventListener('click', function (event) {
        if (event.target.classList.contains('del-btn')) {
            deleteUser(event);
        }
    });

// Event listener for submit button to save edited user
document
    .querySelector('.modal-container')
    .addEventListener('submit', function (event) {
        if (event.target.id.startsWith('edit-user-form-')) {
            editUser(event);
        }
    });