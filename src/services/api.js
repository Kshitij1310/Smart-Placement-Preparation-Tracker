// API Service for frontend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('📍 API Base URL:', API_BASE_URL);

// Error handling
const handleResponse = async (response) => {
  if (!response.ok) {
    try {
      const error = await response.json();
      throw new Error(error.message || `API Error: ${response.status}`);
    } catch (e) {
      throw new Error(`API Error: ${response.status}`);
    }
  }
  return response.json();
};

// Tasks API
export const tasksAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`);
    return handleResponse(response);
  },

  create: async (task) => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    return handleResponse(response);
  },

  update: async (id, task) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};

// Applications API
export const applicationsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/applications`);
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/applications/${id}`);
    return handleResponse(response);
  },

  create: async (application) => {
    const response = await fetch(`${API_BASE_URL}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(application),
    });
    return handleResponse(response);
  },

  update: async (id, application) => {
    const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(application),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};

// Interviews API
export const interviewsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/interviews`);
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/interviews/${id}`);
    return handleResponse(response);
  },

  create: async (interview) => {
    const response = await fetch(`${API_BASE_URL}/interviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(interview),
    });
    return handleResponse(response);
  },

  update: async (id, interview) => {
    const response = await fetch(`${API_BASE_URL}/interviews/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(interview),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/interviews/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};
