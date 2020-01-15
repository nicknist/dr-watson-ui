import React from 'react';
import { shallow } from 'enzyme';
import { App, mapStateToProps, mapDispatchToProps } from './App';
import { removeUser, hasErrored, addMessage, clearMessages } from '../../actions';
import { endConversation } from '../../apiCalls';

jest.mock('../../apiCalls');

describe('App component', () => {
  const mockRemoveUser = jest.fn();
  const mockHasErrored = jest.fn();
  let wrapper;

  beforeEach(() => {
    const mockUser = {
      id: 1568665187737,
      firstName: "Travis",
      lastName: "Rollins",
      feeling: "tired"
    };

    wrapper = shallow(<App
        user={mockUser}
        removeUser={mockRemoveUser}
        hasErrored={mockHasErrored}
    />);
  });

  it('should match the snapshot with a ChatBox if the user has signed in', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should match the snapshot with a WelcomeModal if the user hasn't signed in yet", () => {
    const wrapper = shallow(<App
      user={null}
      removeUser={mockRemoveUser}
      hasErrored={mockHasErrored}
    />);

    expect(wrapper).toMatchSnapshot();
  });


  it('should call endConversation, and removeUser if someone signs out', async () => {
    await wrapper.instance().signOut();

    expect(endConversation).toHaveBeenCalled();
    expect(mockRemoveUser).toHaveBeenCalled();
  });

  it('should call hasErrored if endCoversation does not resolve when a user signs out', async () => {
    endConversation.mockImplementation(() => {
      return Promise.reject(Error('fetch failed.'));
    });

    await wrapper.instance().signOut();

    expect(mockHasErrored).toHaveBeenCalledWith('fetch failed.');
  });
});

describe('mapStateToProps', () => {
  it('should return an object with the user information and messages', () => {
    const mockUser = {
      id: 1568665187737,
      firstName: "Travis",
      lastName: "Rollins",
      feeling: "tired"
    };

    const mockMessages = [{
      message: 'Hi there, my name is Dr. Watson. I understand that you have been feeling happy. That is super exciting to hear!',
      isUser: false,
    }]

    const mockState = {
      user: mockUser,
      messages: mockMessages,
      errorMsg: ''
    };
    const expected = {
      user: mockUser,
      messages: mockMessages
    }

    const mappedProps = mapStateToProps(mockState);

    expect(mappedProps).toEqual(expected);
  });
});

describe('mapDispatchToProps', () => {
  it('calls dispatch with a removeUser action when removeUser is called', () => {
    const mockDispatch = jest.fn();
    const actionToDispatch = removeUser();

    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.removeUser();

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });

  it('calls dispatch with a hasErrored action when hasErrored is called', () => {
    const mockDispatch = jest.fn();
    const actionToDispatch = hasErrored('fetch failed');

    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.hasErrored('fetch failed');

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });

  it('should call dispatch when addMessage has been called', () => {
    const mockDispatch = jest.fn();
    const actionToDispatch = addMessage({ message: 'waddup', isUser: true });

    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.addMessage({ message: 'waddup', isUser: true });

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });

  it('should call dispatch when clearMessages has been called', () => {
    const mockDispatch = jest.fn();
    const actionToDispatch = clearMessages();

    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.clearMessages();

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });
});
