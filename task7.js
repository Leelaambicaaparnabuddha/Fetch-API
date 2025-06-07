const userList = document.getElementById('userList');
const errorDisplay = document.getElementById('error');
const reloadBtn = document.getElementById('reloadBtn');

function fetchUsers() {
  userList.innerHTML = '';
  errorDisplay.textContent = '';

  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(users => {
      users.forEach(user => {
        const div = document.createElement('div');
        div.className = 'user';
        div.innerHTML = `
          <h3>${user.name}</h3>
          <p>Email: ${user.email}</p>
          <p>Address: ${user.address.street}, ${user.address.city}</p>
        `;
        userList.appendChild(div);
      });
    })
    .catch(error => {
      errorDisplay.textContent = 'Failed to load user data. Please check your internet connection.';
      console.error('Error:', error);
    });
}

// Fetch users on page load
fetchUsers();

// Reload button to refetch
reloadBtn.addEventListener('click', fetchUsers);
