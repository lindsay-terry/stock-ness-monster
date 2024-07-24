//Query order data for by customer id
const viewOrder = async(event) => {
    event.preventDefault();
    const id = event.target.getAttribute('data-id');

    if (!id) {
        Swal.fire({
            title: 'Error',
            text: 'No information found',
            icon: 'error',
            confirmButtonText: 'Okay',
            customClass: {
                popup: 'custom-error-popup',
                confirmButton: 'bg-warning'
            }
        });
    } else {
        try {
            const response = await fetch(`/api/customers/${id}`, {
                method: 'GET',
            });
            if (response.ok) {
                console.log(response);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.error(error);
        }
    }   

}

//event listener to trigger viewing closed orders
document
    .querySelector('.customer-area')
    .addEventListener('click', function(event) {
        if (event.target.classList.contains('get-info')) {
            viewOrder(event);
        }
    });