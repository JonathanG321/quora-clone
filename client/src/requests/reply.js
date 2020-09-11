import { API_URL, jsonHeaders } from './base';

export const Reply = {
  create(newReply, answerId, questionId) {
    return fetch(`${API_URL}/questions/${questionId}/answers/${answerId}/replies`, {
      method: 'POST',
      headers: jsonHeaders,
      credentials: 'include',
      body: JSON.stringify(newReply),
    }).then((res) => res.json());
  },
};
