import { API_URL, jsonHeaders } from './base';

export const Space = {
  getSpace(spaceId) {
    return fetch(`${API_URL}/spaces/${spaceId}`, {
      method: 'GET',
      headers: jsonHeaders,
      credentials: 'include',
    }).then((res) => res.json());
  },
  getSpaces() {
    return fetch(`${API_URL}/spaces`, {
      method: 'GET',
      headers: jsonHeaders,
      credentials: 'include',
    }).then((res) => res.json());
  },
  getUserSpaces() {
    return fetch(`${API_URL}/users/spaces`, {
      method: 'GET',
      headers: jsonHeaders,
      credentials: 'include',
    }).then((res) => res.json());
  },
  getTopicSpaces(topicId) {
    return fetch(`${API_URL}/spaces/topic/${topicId}`, {
      method: 'GET',
      headers: jsonHeaders,
      credentials: 'include',
    }).then((res) => res.json());
  },
  getFollows(spaceId) {
    return fetch(`${API_URL}/spaces/${spaceId}/follows`, {
      method: 'GET',
      headers: jsonHeaders,
      credentials: 'include',
    }).then((res) => res.json());
  },
  getFollow(spaceId) {
    return fetch(`${API_URL}/spaces/${spaceId}/follow`, {
      method: 'GET',
      headers: jsonHeaders,
      credentials: 'include',
    }).then((res) => res.json());
  },
  follow(spaceId) {
    return fetch(`${API_URL}/spaces/${spaceId}/follow`, {
      method: 'POST',
      headers: jsonHeaders,
      credentials: 'include',
    }).then((res) => res.json());
  },
  unFollow(spaceId) {
    return fetch(`${API_URL}/spaces/${spaceId}/follow`, {
      method: 'DELETE',
      headers: jsonHeaders,
      credentials: 'include',
    }).then((res) => res.json());
  },
};
