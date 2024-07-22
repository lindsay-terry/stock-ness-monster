//function to retrieve specific customer data based on clicked on customer 
const getCustomerData = async (event) => {
    //get id of clicked on customer name
    let id = event.target.getAttribute('data-id');
 
     try {
        //fetch requeset to query specific data based on id
         const response = await fetch(`/api/customers/${id}`, {
             method: 'GET',
         });
         if (response.ok) {
             const data = await response.json();
             console.log(data);
             document.getElementById('company-name').textContent = data.company_name;
             document.getElementById('account-manager').textContent = `Account Manager: ${data.user.first_name} ${data.user.last_name}`;
         }
     } catch (error) {
         console.error(error);
     }
 }
 
 const container = document.querySelector('#container-div');
 
 //event listener to listen for a click on an h3 in specified area
 container.addEventListener('click', function(event) {
     if (event.target.tagName === 'H3') {
         getCustomerData(event);
         const showDiv = document.getElementById('customerDetails');
         showDiv.setAttribute('style', 'display: block;');
     }
 });