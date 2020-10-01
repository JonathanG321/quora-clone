import { API_URL, jsonHeaders } from './base';

export const Vote = {
  vote(isUpVote, answerId) {
    return fetch(`${API_URL}/answers/${answerId}/votes`, {
      method: 'POST',
      headers: jsonHeaders,
      credentials: 'include',
      body: JSON.stringify({ isUpVote }),
    }).then((res) => res.json());
  },
  unVote(answerId) {
    return fetch(`${API_URL}/answers/${answerId}/votes`, {
      method: 'DELETE',
      headers: jsonHeaders,
      credentials: 'include',
    }).then((res) => res.json());
  },
  getVote(answerId) {
    return fetch(`${API_URL}/answers/${answerId}/votes`, {
      method: 'GET',
      headers: jsonHeaders,
      credentials: 'include',
    }).then((res) => res.json());
  },
};
