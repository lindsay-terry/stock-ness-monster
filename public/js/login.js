//function to handle logging in
const handleLogin = async (event) => {
    event.preventDefault();

    //getting access to form elements
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    const responseArea = document.querySelector('#response-p');

    //if both username and password have been entered, send fetch to login route
    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        //if response ok send user to homepage
        if (response.ok) {
            document.location.replace('/');
        } else {
            //if response not ok display username or password message
            // const errorMessage = await response.json();
            // responseArea.textContent = errorMessage.message;
            Swal.fire({
              title: 'Invalid Login',
              text: 'Incorrect username or password. Please try again',
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

//event listener to handleLogin upon form submission
document
    .querySelector('.login-form')
    .addEventListener('submit', handleLogin);


//event listener for login button to send to login page
document
    .querySelector('#login-btn')
    .addEventListener('click', function() {
        document.location.href = '/login';
    });