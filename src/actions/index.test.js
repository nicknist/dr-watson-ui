import { createUser, removeUser, hasErrored, addMessage, clearMessages } from './index';

describe('Actions', () => {
  it('should return a user object with type when createUser is called', () => {
    const mockUser = {
      name: 'Eric'
    };
    const expected = {
      user: mockUser,
      type: 'CREATE_USER'
    }

    expect(createUser(mockUser)).toEqual(expected);
  });

  it('should return a type when removeUser is called', () => {
    const expected = {
      type: 'REMOVE_USER'
    };

    expect(removeUser()).toEqual(expected);
  });

  it('should return a type and errorMsg when hasErrored is called', () => {
    const mockError = {
      message: 'Hi Eric and Robbie :D'
    };
    const expected = {
      errorMsg: mockError,
      type: 'HAS_ERRORED'
    };

    expect(hasErrored(mockError)).toEqual(expected);
  });

  it('should have a type, message, and isUser when addMessage is called', () => {
    const mockMessage = {
      message: 'Hi Eric and Robbie :D'
    };
    const mockIsUser = false;
    const expected = {
      type: 'ADD_MESSAGE',
      message: mockMessage,
      isUser: mockIsUser
    };

    expect(addMessage(mockMessage, mockIsUser)).toEqual(expected);
  });

  it('should have a type when clearMessages is called', () => {
    const expected = {
      type: 'CLEAR_MESSAGES'
    };

    expect(clearMessages()).toEqual(expected);
  });
});
