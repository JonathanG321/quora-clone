import { API_URL, jsonHeaders } from './base';

export const Space = {
  getSpace(topicId) {
    return fetch(`${API_URL}/topics/${topicId}`, {
      method: 'GET',
      headers: jsonHeaders,
      credentials: 'include',
    }).then((res) => res.json());
  },
};
