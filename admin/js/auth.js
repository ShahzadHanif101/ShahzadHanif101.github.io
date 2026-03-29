function checkAuth() {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    window.location.href = 'index.html';
  }
  return JSON.parse(loggedInUser);
}

function logout() {
  localStorage.removeItem('loggedInUser');
  window.location.href = 'index.html';
}