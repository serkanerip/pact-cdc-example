import axios from 'axios';

const defaultBaseUrl = 'http://localhost:3000';

export const api = (baseUrl = defaultBaseUrl) => ({
  getHealth: () =>
    axios.get(`${baseUrl}/health`).then((response) => response.data.status),
  getUsers: () =>
      axios.get(`${baseUrl}/users`).then(response => response.data),
  getPosts: () =>
      axios.get(`${baseUrl}/posts`).then(response => response.data),
  pong: () =>
      axios.get(`${baseUrl}/pong`).then(response => response.data)
  /* other endpoints here */
});