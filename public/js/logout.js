//function to handle logging out
const handleLogout = async (event) => {
    const response = await fetch('/api/users/logout', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json'},
    });
    
    //if logout is successful send user back to homepage
    if (response.ok) {
     document.location.replace('/');
    } else {
        //will be changed eventually to accomodate for logged in rules
        alert(response);
    }
 };

 //event listener for logout button
 document
    .querySelector('#logout-btn')
    .addEventListener('click', handleLogout);