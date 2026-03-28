const API_BASE_URL = 'http://localhost:8080/api';

const getHeaders = () => {
  const user = getCurrentUser();
  const headers: any = {
    'Content-Type': 'application/json',
  };
  if (user?.token) {
    headers['Authorization'] = `Bearer ${user.token}`;
  }
  return headers;
};

const handleResponse = async (response: Response, errorMessage: string) => {
  if (!response.ok) {
    let detail = '';
    try {
      const errorBody = await response.json();
      detail = errorBody.message || errorBody.error || '';
    } catch (e) {
      detail = await response.text();
    }
    throw new Error(`${errorMessage}${detail ? ': ' + detail : ''}`);
  }
  return await response.json();
};

export const login = async (credentials: any) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await handleResponse(response, 'Login failed');
  if (data.token) {
    localStorage.setItem('user', JSON.stringify(data));
  }
  return data;
};

export const register = async (userData: any) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return await handleResponse(response, 'Registration failed');
};

export const getServices = async () => {
  const response = await fetch(`${API_BASE_URL}/services`);
  return await handleResponse(response, 'Failed to fetch services');
};

export const getStaff = async () => {
  const response = await fetch(`${API_BASE_URL}/staff`);
  return await handleResponse(response, 'Failed to fetch staff');
};

export const bookAppointment = async (appointmentData: any) => {
  const response = await fetch(`${API_BASE_URL}/appointments`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(appointmentData),
  });
  return await handleResponse(response, 'Failed to book appointment');
};

export const getUserAppointments = async (userId: number) => {
  const response = await fetch(`${API_BASE_URL}/appointments/user/${userId}`, {
    headers: getHeaders(),
  });
  return await handleResponse(response, 'Failed to fetch appointments');
};

export const cancelAppointment = async (appointmentId: number) => {
  const response = await fetch(`${API_BASE_URL}/appointments/${appointmentId}/cancel`, {
    method: 'PUT',
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Failed to cancel appointment');
  return response;
};

export const getAdminStats = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/stats`, {
    headers: getHeaders(),
  });
  return await handleResponse(response, 'Failed to fetch admin stats');
};

export const updateAppointmentStatus = async (id: number, status: string) => {
  const response = await fetch(`${API_BASE_URL}/admin/appointments/${id}/status?status=${status}`, {
    method: 'PUT',
    headers: getHeaders(),
  });
  return await handleResponse(response, 'Failed to update status');
};

export const getAdminAppointments = async (page = 0, size = 10) => {
  const response = await fetch(`${API_BASE_URL}/admin/appointments?page=${page}&size=${size}`, {
    headers: getHeaders(),
  });
  const data = await handleResponse(response, 'Failed to fetch admin appointments');
  // Handle Spring Boot Page object
  return data.content || data;
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
};

export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (e) {
    return null;
  }
};
