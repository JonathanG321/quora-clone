import { API_URL, jsonHeaders } from './base';

export const Topic = {
  getTopic(topicId) {
    return fetch(`${API_URL}/topics/${topicId}`, {
      method: 'GET',
      headers: jsonHeaders,
      credentials: 'include',
    }).then((res) => res.json());
  },
};
