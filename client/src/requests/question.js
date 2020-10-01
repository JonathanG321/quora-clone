import { API_URL, jsonHeaders } from './base';

export const Question = {
  all() {
    return fetch(`${API_URL}/questions`, {
      credentials: 'include',
    }).then((res) => res.json());
  },
  create(newQuestion) {
    return fetch(`${API_URL}/questions`, {
      method: 'POST',
      headers: jsonHeaders,
      credentials: 'include',
      body: JSON.stringify(newQuestion),
    }).then((res) => res.json());
  },
  one(id) {
    return fetch(`${API_URL}/questions/${id}`, {
      credentials: 'include',
    }).then((res) => res.json());
  },
  oneCard(id) {
    return fetch(`${API_URL}/questions/${id}/card`, {
      credentials: 'include',
    }).then((res) => res.json());
  },
  getTopicQuestions(id) {
    return fetch(`${API_URL}/topics/${id}/questions`, {
      credentials: 'include',
    }).then((res) => res.json());
  },
  findRecent() {
    return fetch(`${API_URL}/questions/recent`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => res.json());
  },
  related(spaceId) {
    return fetch(`${API_URL}/questions/related/${spaceId}`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => res.json());
  },
};
