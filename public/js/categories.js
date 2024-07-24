const getAllCategories = async (event) => {
  try {
    const response = await fetch(`/api/categories`, {
      method: 'GET'
    });
    
    if (response.ok) {
      document.location.replace('/api/categories');
    } else {
      throw new Error('Failed to GET categories');
    }
  } catch (error) {
    Swal.fire({
      title: 'Error!',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'Okay'
    });
  }
};

const categoryById = async () => {
  const id = document.querySelector('#category-id-input').value;
  console.log(id)
  if (!id) {
    Swal.fire({
      title: 'Error!',
      text: 'Please enter a category ID',
      icon: 'error',
      confirmButtonText: 'Okay'
    });
    return;
  }
  try {
    const response = await fetch(`/api/categories/${id}`, {
      method: 'GET'
    });
    
    if (response.ok) {
      document.location.replace(`/api/categories/${id}`);
    } else {
      throw new Error('Failed to GET category by id');
    }
  } catch (error) {
    Swal.fire({
      title: 'Error!',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'Okay'
    });
  }
};

const displayCategoryForm = () => {
  const toggleDisplay = document.querySelector('#category-form');
  toggleDisplay.classList.toggle('d-none');
};

const addCategory = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#category-name').value.trim();

  if (name) {
    try {
      const response = await fetch(`/api/categories`, { 
        method: 'POST',
        body: JSON.stringify({ name }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        await Swal.fire({
          title: 'Success!',
          text: `Added ${name} to categories.`,
          icon: 'success',
          confirmButtonText: 'Okay',
          customClass: {
            popup: 'custom-confirm-popup',
            confirmButton: 'custom-confirm-button'
          }
        }).then(() => {
          document.location.replace('/categories');
        });
      } else {
        throw new Error('Failed to create category');
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Okay'
      });
    }
  }
};

const deleteCategory = async (event) => {
  console.log('in delete function')
  if (event.target.classList.contains('delete-category')) {
    const id = event.target.getAttribute('data-id');

    // Show SweetAlert2 confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        popup: 'custom-confirm-popup',
        confirmButton: 'custom-confirm-button'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`/api/categories/${id}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            Swal.fire({
              title: 'Deleted!',
              text: `Category ID: ${id} has been destroyed.`,
              icon: 'success',
              customClass: {
                popup: 'custom-confirm-popup',
                confirmButton: 'custom-confirm-button'
              }
            }).then(() => {
              document.location.replace('/categories');
            });
          } else {
            throw new Error('Failed to delete category');
          }
        } catch (error) {
          Swal.fire({
            title: 'Error!',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Okay'
          });
        }
      }
    });
  }
};

document
    .querySelector('#all-categories')
    .addEventListener('click', getAllCategories);

document
    .querySelector('#category-by-id')
    .addEventListener('click', categoryById);

document
    .querySelector('#add-category')
    .addEventListener('click', displayCategoryForm);

document
    .querySelector('#category-submit')
    .addEventListener('click', addCategory);

document.addEventListener('click', deleteCategory);