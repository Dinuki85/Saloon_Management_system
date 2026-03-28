'use client';

const API_BASE_URL = 'http://localhost:8080/api';

const getAuthHeader = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};
  const userStr = localStorage.getItem('user');
  if (!userStr) return {};
  try {
    const user = JSON.parse(userStr);
    return user?.token ? { 'Authorization': `Bearer ${user.token}` } : {};
  } catch (e) {
    return {};
  }
};

// Auth
export const login = async (credentials: any) => {
  const res = await fetch(`${API_BASE_URL}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Login failed');
  }
  const data = await res.json();
  localStorage.setItem('user', JSON.stringify(data));
  return data;
};

export const register = async (userData: any) => {
  const res = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Registration failed');
  }
  return res.json();
};

export const logout = () => {
  localStorage.removeItem('user');
};

// Services
export const getServices = async () => {
  const res = await fetch(`${API_BASE_URL}/services`);
  if (!res.ok) throw new Error('Failed to fetch services');
  return res.json();
};


// Appointments
export const bookAppointment = async (data: any) => {
  const res = await fetch(`${API_BASE_URL}/appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to book appointment');
  }
  return res.json();
};

// Admin
export const getAdminStats = async () => {
  const res = await fetch(`${API_BASE_URL}/admin/stats`, {
    headers: getAuthHeader(),
  });
  if (!res.ok) throw new Error('Failed to fetch admin stats');
  return res.json();
};

export const getUsers = async () => {
  const res = await fetch(`${API_BASE_URL}/admin/users`, {
    headers: getAuthHeader(),
  });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
};

// User Appointments
export const getUserAppointments = async (userId: number) => {
  const res = await fetch(`${API_BASE_URL}/appointments/user/${userId}`, {
    headers: getAuthHeader(),
  });
  if (!res.ok) throw new Error('Failed to fetch user appointments');
  return res.json();
};

export const getAllAppointments = async () => {
  const res = await fetch(`${API_BASE_URL}/admin/appointments`, {
    headers: getAuthHeader(),
  });
  if (!res.ok) throw new Error('Failed to fetch all appointments');
  return res.json();
};

export const updateAppointmentStatus = async (id: number, status: string) => {
  const res = await fetch(`${API_BASE_URL}/appointments/${id}/status?status=${status}`, {
    method: 'PUT',
    headers: getAuthHeader(),
  });
  if (!res.ok) throw new Error('Failed to update appointment status');
  return res.json();
};

export const createService = async (service: any) => {
  const res = await fetch(`${API_BASE_URL}/services`, {
    method: 'POST',
    headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(service),
  });
  if (!res.ok) throw new Error('Failed to create service');
  return res.json();
};

export const updateService = async (id: number, service: any) => {
  const res = await fetch(`${API_BASE_URL}/services/${id}`, {
    method: 'PUT',
    headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(service),
  });
  if (!res.ok) throw new Error('Failed to update service');
  return res.json();
};

export const deleteService = async (id: number) => {
  const res = await fetch(`${API_BASE_URL}/services/${id}`, {
    method: 'DELETE',
    headers: getAuthHeader(),
  });
  if (!res.ok) throw new Error('Failed to delete service');
  return res;
};

export const getStaff = async () => {
  const res = await fetch(`${API_BASE_URL}/staff`, {
    headers: getAuthHeader(),
  });
  if (!res.ok) throw new Error('Failed to fetch staff');
  return res.json();
};

export const createStaff = async (staff: any) => {
  const res = await fetch(`${API_BASE_URL}/staff`, {
    method: 'POST',
    headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(staff),
  });
  if (!res.ok) throw new Error('Failed to create staff');
  return res.json();
};

export const updateStaff = async (id: number, staff: any) => {
  const res = await fetch(`${API_BASE_URL}/staff/${id}`, {
    method: 'PUT',
    headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(staff),
  });
  if (!res.ok) throw new Error('Failed to update staff');
  return res.json();
};

export const deleteStaff = async (id: number) => {
  const res = await fetch(`${API_BASE_URL}/staff/${id}`, {
    method: 'DELETE',
    headers: getAuthHeader(),
  });
  if (!res.ok) throw new Error('Failed to delete staff');
  return res;
};

export const cancelAppointment = async (id: number) => {
  const res = await fetch(`${API_BASE_URL}/appointments/${id}/cancel`, {
    method: 'PUT',
    headers: getAuthHeader(),
  });
  if (!res.ok) throw new Error('Failed to cancel appointment');
  return res.json();
};

// User Profile
export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  return JSON.parse(localStorage.getItem('user') || 'null');
};
