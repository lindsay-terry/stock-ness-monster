//function to toggle display of add customer form
const toggleCustomerForm = async(event) => {
    const form = document.querySelector('#add-customer-form');

    if (form.getAttribute('style') === 'display: none') {
        form.setAttribute('style', 'display: block;');
    } else {
        form.setAttribute('style', 'display: none');
    };
};

//toggle edit form and tie id of customer to update to submit button
const toggleEditForm = async (id) => {
    const form = document.querySelector('#edit-customer-form');
    const submit = document.querySelector('.submit-edit-btn');
    submit.setAttribute('data-id', id);

    if (form.getAttribute('style') === 'display: none') {
        form.setAttribute('style', 'display: block;');
    } else {
        form.setAttribute('style', 'display: none');
    };
    form.scrollIntoView({ behavior: 'smooth'});
};

//function to handle adding a customer
const handleAddCustomer = async () => {
    //get access to form elements
    const companyName = document.getElementById('company-name').value.trim();
    const acctMngrId = document.getElementById('account-manager-dropdown').value;

    //ensure all fields are filled out
    if(!companyName || acctMngrId === 'Select an account manager' ) {
        Swal.fire({
            title: 'Error!',
            text: 'Please fill out company name and select an account manager',
            icon: 'error',
            confirmButtonText: 'Okay',
            customClass: {
                popup: 'custom-error-popup',
                confirmButton: 'bg-warning'
            }
        });
        return;
    } else {
        try {
            const response = await fetch('/api/customers', {
                method: 'POST',
                body: JSON.stringify({ company_name: companyName, account_manager_id: acctMngrId }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                await Swal.fire({
                    title: 'Success!',
                    text: `Added ${companyName}`,
                    icon: 'success',
                    confirmButtonText: 'Okay',
                    customClass: {
                      popup: 'custom-confirm-popup',
                      confirmButton: 'custom-confirm-button'
                    } 
                }); 
                await document.location.replace('/customers');

            } else {
                throw new Error('Failed to create customer');
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.message,
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

//function to handle editing customer data
const handleEditCustomer = async (event) => {
    event.preventDefault();
    //get access to data attribute of submit button for req.param
    const submit = document.querySelector('.submit-edit-btn');
    const id = submit.getAttribute('data-id');
    //access to form elements
    const companyName = document.getElementById('edit-company-name').value.trim();
    const acctMngrId = document.getElementById('edit-account-manager-dropdown').value;
    
    //verify elements are properly filled out
    if(!companyName || acctMngrId === 'Select an account manager' ) {
        Swal.fire({
            title: 'Error!',
            text: 'Please fill out company name and select an account manager',
            icon: 'error',
            confirmButtonText: 'Okay',
            customClass: {
                popup: 'custom-error-popup',
                confirmButton: 'bg-warning'
            }
        });
        return;
    } else {
        try {
            //put request to update customer by id
            const response = await fetch(`/api/customers/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ company_name: companyName, account_manager_id: acctMngrId }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            //success sweetalert
            if (response.ok) {
                await Swal.fire({
                    title: 'Success!',
                    text: `Successfully updated ${companyName}`,
                    icon: 'success',
                    confirmButtonText: 'Okay',
                    customClass: {
                      popup: 'custom-confirm-popup',
                      confirmButton: 'custom-confirm-button'
                    } 
                }); 
                //refresh the page
                await document.location.replace('/customers');

            } else {
                throw new Error('Failed to create customer');
            }
            //error sweetalert
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.message,
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

//function to delete customer
const handleDelete = async (id) => {
    console.log(id);
    if (id) {
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
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`/api/customers/${id}`, {
                        method: 'DELETE',
                    });

                    //if response is ok, show confirmation alert
                    if (response.ok) {
                        await Swal.fire({
                            title: 'Success',
                            text: 'Customer has been successfully deleted',
                            icon: 'success',
                            confirmButtonText: 'Okay',
                            customClass: {
                                popup: 'custom-confirm-popup',
                                confirmButton: 'custom-confirm-button'
                            }
                        });  
                        document.location.replace('/customers');                   
                    } else {
                        await Swal.fire({
                            title: 'Error',
                            text: "There's been an error deleting the customer, please try again.",
                            icon: 'error',
                            confirmButtonText: 'Okay',
                            customClass: {
                                popup: 'custom-error-popup',
                                confirmButton: 'custom-confirm-button'
                            }
                        });
                    }
                } catch(error) {
                    Swal.fire({
                        title: 'Error',
                        text: error.message,
                        icon: 'error',
                        confirmButtonText: 'Okay',
                        customClass: {
                            popup: 'custom-error-popup',
                            confirmButton: 'custom-confirm-button'
                        }
                    });
                }
            }
        });     
    }
};





//event listener for delete buttons
document
    .querySelector('.customer-area')
    .addEventListener('click', function(event) {
        // event.preventDefault();
        if (event.target.classList.contains('del-btn')) {
            const btn = event.target;
            const btnId = btn.getAttribute('data-id');
            handleDelete(btnId);
        }
    });

//event listener for edit buttons
document
    .querySelector('.customer-area')
    .addEventListener('click', function(event) {
        // event.preventDefault();
        if (event.target.classList.contains('edit-btn')) {
            const btn = event.target;
            const btnId = btn.getAttribute('data-id');
            toggleEditForm(btnId);
        }
    });

//event listener for edit form submit button
document
    .querySelector('.submit-edit-btn')
    .addEventListener('click', handleEditCustomer);

//submit button event listener to handle add customer
document
    .querySelector('.submit-div')
    .addEventListener('click', function(event) {
        event.preventDefault();
        if (event.target.classList.contains('submit-form')) {
            handleAddCustomer();
        }
    });

//submit button event listener to toggle add customer form
document
    .querySelector('.add-cus-btn')
    .addEventListener('click', toggleCustomerForm);