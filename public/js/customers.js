//function to toggle display of add customer form
const toggleCustomerForm = async(event) => {
    const form = document.querySelector('#add-customer-form');
    if (form.getAttribute('style') === 'display: none') {
        form.setAttribute('style', 'display: block;');
    } else {
        form.setAttribute('style', 'display: none');
    };
};
//function to get access to elements related to edit and delete
const getAccess = (id) => {
    const nameInput = document.querySelector(`#company-name-${id}`);
    const accountInput = document.querySelector(`#edit-account-manager-dropdown${id}`);
    //access to edit and delete buttons
    const editBtn = document.getElementById(`edit-${id}`);
    const deleteBtn = document.getElementById(`del-${id}`);
    // access to confirm and cancel buttons
    const confirmBtn = document.getElementById(`confirm-${id}`);
    const cancelBtn = document.getElementById(`cancel-${id}`);
    return { nameInput, accountInput, editBtn, deleteBtn, confirmBtn, cancelBtn };
}
//toggle edit form and tie id of customer to update to submit button
const enableEditForm = async (event) => {
    const id = event.target.getAttribute('data-id');
    const { nameInput, accountInput, editBtn, deleteBtn, confirmBtn, cancelBtn } = getAccess(id);
    //show confirm and cancel buttons
    confirmBtn.classList.remove('d-none');
    cancelBtn.classList.remove('d-none');
    //hide edit and delete buttons
    editBtn.classList.add('d-none');
    deleteBtn.classList.add('d-none');
    //enable input fields
    nameInput.disabled = false;
    accountInput.disabled = false;
};
const handleCancel = async (event) => {
    const id = event.target.getAttribute('data-id');
    const { nameInput, accountInput, editBtn, deleteBtn, confirmBtn, cancelBtn } = getAccess(id);
    //show edit and delete buttons
    editBtn.classList.remove('d-none');
    deleteBtn.classList.remove('d-none');
    //hide confirm and cancel buttons
    confirmBtn.classList.add('d-none');
    cancelBtn.classList.add('d-none');
    //disable input fields
    nameInput.disabled = true;
    accountInput.disabled = true;
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
        //get access to data attribute of confirm button for req.param
    const id = event.target.getAttribute('data-id');
       //access to form elements
    const { nameInput, accountInput } = getAccess(id);
    const companyName = nameInput.value.trim();
    const acctMngrId = accountInput.value;
    //verify elements are properly filled out
    if(!companyName || !acctMngrId ) {
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
//event listener for confirm edit buttons
document.querySelectorAll('.confirm-btn').forEach(button => {
    button.addEventListener('click', handleEditCustomer);
})
//event listener for edit buttons
document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', enableEditForm);
  });
//event listener for cancel buttons
document.querySelectorAll('.cancel-btn').forEach(button => {
    button.addEventListener('click', handleCancel);
})
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