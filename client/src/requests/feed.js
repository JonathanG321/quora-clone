import { API_URL } from './base';

export const Feed = {
  getFeed() {
    return fetch(`${API_URL}/questions/feed`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => res.json());
  },
  getFollows() {
    return fetch(`${API_URL}/follows`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => res.json());
  },
};
