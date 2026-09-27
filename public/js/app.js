function logout() {
  localStorage.clear();
  window.location.href = '/login.html';
}

function checkAuth(requiredRole) {
  const token = localStorage.getItem('jwt_token');
  const role = localStorage.getItem('user_role');

  if (!token) {
    window.location.href = '/login.html';
    return;
  }

  if (requiredRole && role !== requiredRole) {
    alert('Unauthorized access');
    window.location.href = '/login.html';
  }
}