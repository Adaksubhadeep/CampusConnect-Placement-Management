const API_BASE_URL = '/api';

async function apiRequest(endpoint, method = 'GET', body = null) {
  const token = localStorage.getItem('jwt_token');
  
  const headers = {
    'Content-Type': 'application/json'
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = { method, headers };
  if (body) config.body = JSON.stringify(body);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (response.status === 401) {
      alert('Session expired. Please log in again.');
      localStorage.clear();
      window.location.href = '/login.html';
      return null;
    }

    if (!response.ok) {
      throw new Error(data.message || 'API call failed');
    }

    return data;
  } catch (error) {
    alert(error.message);
    throw error;
  }
}