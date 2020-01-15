export const startConversation = async feeling => {
  const url = 'https://drwatson-api.herokuapp.com/api/v1/start_session'
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ feeling })
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw Error('Dr Watson is currently down.  Please try again later.')
  }

  const data = await response.json();
  return data;
}

export const postMessage = async newMessage => {
 const url = 'https://drwatson-api.herokuapp.com/api/message';
 const options = {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify({ newMessage })
 };

 const response = await fetch(url, options);
 if (!response.ok) {
   throw Error('Oh no! I can not respond to that. Try something else')
 }

 const data = await response.json();
 return data;
}

export const endConversation = async () => {
  const url = 'https://drwatson-api.herokuapp.com/api/v1/end_session';

  const response = await fetch(url);
  if (!response.ok) {
    throw Error('There was a problem ending the session.  Please close the application.')
  }
}
