const API_BASE_URL = 'http://localhost:8080/api';

export const login = async (credentials: any) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || 'Login failed');
  }

  const data = await response.json();
  if (data.token) {
    localStorage.setItem('user', JSON.stringify(data));
  }
  return data;
};

export const register = async (userData: any) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || 'Registration failed');
  }

  return await response.json();
};

export const getServices = async () => {
  const response = await fetch(`${API_BASE_URL}/services`);
  if (!response.ok) throw new Error('Failed to fetch services');
  return await response.json();
};

export const getStaff = async () => {
  const response = await fetch(`${API_BASE_URL}/staff`);
  if (!response.ok) throw new Error('Failed to fetch staff');
  return await response.json();
};

export const bookAppointment = async (appointmentData: any) => {
  const user = getCurrentUser();
  const response = await fetch(`${API_BASE_URL}/appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user?.token}`
    },
    body: JSON.stringify(appointmentData),
  });
  if (!response.ok) throw new Error('Failed to book appointment');
  return await response.json();
};

export const getUserAppointments = async (userId: number) => {
  const user = getCurrentUser();
  const response = await fetch(`${API_BASE_URL}/appointments/user/${userId}`, {
    headers: {
      'Authorization': `Bearer ${user?.token}`
    }
  });
  if (!response.ok) throw new Error('Failed to fetch appointments');
  return await response.json();
};

export const cancelAppointment = async (appointmentId: number) => {
  const user = getCurrentUser();
  const response = await fetch(`${API_BASE_URL}/appointments/${appointmentId}/cancel`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${user?.token}`
    }
  });
  if (!response.ok) throw new Error('Failed to cancel appointment');
  return response;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
  return null;
};
