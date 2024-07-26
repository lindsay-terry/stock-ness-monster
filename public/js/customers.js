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