const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

function getAuthToken() {
  return localStorage.getItem('token');
}

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const token = getAuthToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers, credentials: 'include' });
  if (!res.ok) {
    let err;
    try { err = await res.json(); } catch (_) { err = { message: res.statusText }; }
    throw new Error(err.message || 'Request failed');
  }
  return res.status === 204 ? null : res.json();
}

export const api = {
  // Auth
  register: (data) => request('/api/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => request('/api/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  me: () => request('/api/auth/me'),

  // Products
  listProducts: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/api/products${q ? `?${q}` : ''}`);
  },
  getProduct: (id) => request(`/api/products/${id}`),
  adminCreateProduct: (data) => request('/api/products', { method: 'POST', body: JSON.stringify(data) }),
  adminUpdateProduct: (id, data) => request(`/api/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  adminDeleteProduct: (id) => request(`/api/products/${id}`, { method: 'DELETE' }),

  // Cart
  getCart: () => request('/api/cart'),
  addToCart: (productId, quantity = 1) => request('/api/cart/add', { method: 'POST', body: JSON.stringify({ productId, quantity }) }),
  updateCart: (productId, quantity) => request('/api/cart/update', { method: 'POST', body: JSON.stringify({ productId, quantity }) }),
  clearCart: () => request('/api/cart/clear', { method: 'POST' }),

  // Orders/Payment
  createPaymentIntent: () => request('/api/orders/create-payment-intent', { method: 'POST' }),
  confirmOrder: (orderId) => request('/api/orders/confirm', { method: 'POST', body: JSON.stringify({ orderId }) }),
  myOrders: () => request('/api/orders'),
};


