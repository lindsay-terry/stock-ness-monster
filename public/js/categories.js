const addCategory = async (event) => {
  event.preventDefault();

  const name = document.getElementById('add-category-name').value.trim();

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

const enableEditCategory = async (event) => {
  const id = event.target.getAttribute('data-id');
  document.getElementById(`category-name-${id}`).disabled = false;

  document.querySelector(`.edit-category[data-id="${id}"]`).classList.add('d-none');
  document.querySelector(`.delete-category[data-id="${id}"]`).classList.add('d-none');
  document.querySelector(`.save-category[data-id="${id}"]`).classList.remove('d-none');
  document.querySelector(`.cancel-category[data-id="${id}"]`).classList.remove('d-none');
}

const cancelEditCategory = async (event) => {
  const id = event.target.getAttribute('data-id');
  document.getElementById(`category-name-${id}`).disabled = true;

  document.querySelector(`.edit-category[data-id="${id}"]`).classList.remove('d-none');
  document.querySelector(`.delete-category[data-id="${id}"]`).classList.remove('d-none');
  document.querySelector(`.save-category[data-id="${id}"]`).classList.add('d-none');
  document.querySelector(`.cancel-category[data-id="${id}"]`).classList.add('d-none');
}

const editCategory = async (event) => {
  const id = event.target.getAttribute('data-id');
  const editName = document.getElementById(`category-name-${id}`).value.trim();
  if (editName) {
    try {
      const response = await fetch(`/api/categories/${id}`, { 
        method: 'PUT',
        body: JSON.stringify({ name: editName }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        await Swal.fire({
          title: 'Success!',
          text: `Edited category ${id}.`,
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
        throw new Error('Failed to edit category');
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
};

const deleteCategory = async (event) => {
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
    .querySelector('.add-category')?.addEventListener('click', addCategory);

document.querySelectorAll('.edit-category').forEach(button => {
  button.addEventListener('click', enableEditCategory);
});

document.querySelectorAll('.cancel-category').forEach(button => {
  button.addEventListener('click', cancelEditCategory);
});

document.querySelectorAll('.save-category').forEach(button => {
  button.addEventListener('click', editCategory);
});

document.addEventListener('click', deleteCategory);