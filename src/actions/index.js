export const createUser = user => ({
  type: 'CREATE_USER',
  user
});

export const removeUser = () => ({
  type: 'REMOVE_USER'
});

export const hasErrored = errorMsg => ({
  type: 'HAS_ERRORED',
  errorMsg
})

export const addMessage = (message, isUser) => ({
  type: 'ADD_MESSAGE',
  message,
  isUser
})

export const clearMessages = () => ({
  type: 'CLEAR_MESSAGES'
})
