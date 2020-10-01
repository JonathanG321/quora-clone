import { API_URL, jsonHeaders } from './base';

export const Topic = {
  getTopic(topicId) {
    return fetch(`${API_URL}/topics/${topicId}`, {
      method: 'GET',
      headers: jsonHeaders,
      credentials: 'include',
    }).then((res) => res.json());
  },
  getTopics() {
    return fetch(`${API_URL}/topics`, {
      method: 'GET',
      headers: jsonHeaders,
      credentials: 'include',
    }).then((res) => res.json());
  },
  getAllTopics() {
    return fetch(`${API_URL}/topics/all`, {
      method: 'GET',
      headers: jsonHeaders,
      credentials: 'include',
    }).then((res) => res.json());
  },
  getUserTopics() {
    return fetch(`${API_URL}/users/topics`, {
      method: 'GET',
      headers: jsonHeaders,
      credentials: 'include',
    }).then((res) => res.json());
  },
  getFollows(topicId) {
    return fetch(`${API_URL}/topics/${topicId}/follows`, {
      method: 'GET',
      headers: jsonHeaders,
      credentials: 'include',
    }).then((res) => res.json());
  },
  getFollow(topicId) {
    return fetch(`${API_URL}/topics/${topicId}/follow`, {
      method: 'GET',
      headers: jsonHeaders,
      credentials: 'include',
    }).then((res) => res.json());
  },
  follow(topicId) {
    return fetch(`${API_URL}/topics/${topicId}/follow`, {
      method: 'POST',
      headers: jsonHeaders,
      credentials: 'include',
    }).then((res) => res.json());
  },
  unFollow(topicId) {
    return fetch(`${API_URL}/topics/${topicId}/follow`, {
      method: 'DELETE',
      headers: jsonHeaders,
      credentials: 'include',
    }).then((res) => res.json());
  },
};
