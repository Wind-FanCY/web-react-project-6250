export function fetchLogin(username) {
  return fetch('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json', 
    },
    body: JSON.stringify( { username } ),
  })
  .catch( err => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(!response.ok) {  
      return response.json().then( err => Promise.reject(err) );
    }
    return response.json(); 
  });
};

export function fectchSession() {
  return fetch('api/session')
    .catch(err => Promise.reject({ error: 'network-error' }))
    .then(response => {
      if (!response.ok) {
        return Promise.reject({ error: 'not-logged-in' });
      }
      return response.json();
    });
};

export function fetchLogout() {
  return fetch('api/session', {
    method: 'DELETE',
  })
    .catch(err => Promise.reject({ error: 'network-error' }))
    .then(reponse => reponse.json());
};

export function fetchWord() {
  return fetch('api/word')
    .catch(err => Promise.reject({ error: 'network-error' }))
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => Promise.reject(err));
      }
      return response.json();
  })
};

export function updateWord(word) {
  return fetch('api/word', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify( { word } ),
  })
    .catch(err => Promise.reject({ error: 'network-error' }))
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => Promise.reject(err));
      }
      return response.json();
  })
}



