import { API_URL, jsonHeaders } from './base';

export const Dislike = {
  dislike(questionId) {
    return fetch(`${API_URL}/questions/${questionId}/dislikes`, {
      method: 'POST',
      headers: jsonHeaders,
      credentials: 'include',
    }).then((res) => res.json());
  },
  unDislike(questionId) {
    return fetch(`${API_URL}/questions/${questionId}/dislikes`, {
      method: 'DELETE',
      headers: jsonHeaders,
      credentials: 'include',
    }).then((res) => res.json());
  },
  getDislike(questionId) {
    return fetch(`${API_URL}/questions/${questionId}/dislikes`, {
      method: 'GET',
      headers: jsonHeaders,
      credentials: 'include',
    }).then((res) => res.json());
  },
};
