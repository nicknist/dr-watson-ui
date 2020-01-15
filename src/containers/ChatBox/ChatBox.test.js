import React from 'react';
import { shallow, mount } from 'enzyme';
import { ChatBox, mapStateToProps, mapDispatchToProps } from './ChatBox';
import { hasErrored, addMessage } from '../../actions';
import { postMessage } from '../../apiCalls';

jest.mock('../../apiCalls');

describe('ChatBox component', () => {
  let wrapper
  const mockHasErrored = jest.fn();
  const mockAddMessage = jest.fn();
  const mockMessages = [
    {
      message: "Hello, I am Dr. Watson.  My understanding is that you are feeling tired.  Have you been feeling anxious this week?",
      isUser: false
    },
    {
      message: "Absolutely.  I feel like I am struggling to keep up.",
      isUser: true
    }
  ];

  beforeEach(() => {
    wrapper = shallow(<ChatBox
      messages={mockMessages}
      hasErrored={mockHasErrored}
    />);
  });

  it('should match the snapshot rendering all messages', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot rendering an error if there is an errorMsg in the store', () => {
    wrapper = shallow(<ChatBox
      messages={mockMessages}
      errorMsg={'fetch failed.'}
      hasErrored={mockHasErrored}
    />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should update the state when handleChange is called', () => {
    wrapper = mount(<ChatBox
      messages={mockMessages}
      hasErrored={mockHasErrored}
    />);

    wrapper.instance().handleChange({ target: { value: 'Hello world' } });

    expect(wrapper.state('message')).toEqual('Hello world');
  });

  it('should call messageChatBot, and clear state when calling handleSubmit pressing Enter', () => {
    wrapper = mount(<ChatBox
      addMessage={mockAddMessage}
      messages={mockMessages}
      hasErrored={mockHasErrored}
    />);
    wrapper.instance().messageChatBot = jest.fn();

    wrapper.setState({ message: 'Hello world' });
    wrapper.instance().handleSubmit({ key: 'Enter' });

    expect(wrapper.state('message')).toEqual('');
    expect(wrapper.instance().messageChatBot).toHaveBeenCalled();
  });

  it('should call addMessage, messageChatBot, and clear state when calling handleSubmit clicking the button', () => {
    wrapper = mount(<ChatBox
      addMessage={mockAddMessage}
      messages={mockMessages}
      hasErrored={mockHasErrored}
    />);
    wrapper.instance().messageChatBot = jest.fn();

    wrapper.setState({ message: 'Hello world' });
    wrapper.instance().handleSubmit({ button: 0 });

    expect(wrapper.state('message')).toEqual('');
    expect(wrapper.instance().messageChatBot).toHaveBeenCalled();
  });

  it('should not call addMessage, messageChatBot, or clear state when calling handleSubmit', () => {
    wrapper = mount(<ChatBox
      addMessage={mockAddMessage}
      messages={mockMessages}
      hasErrored={mockHasErrored}
    />);
    wrapper.instance().messageChatBot = jest.fn();

    wrapper.setState({ message: 'WADDUP COVERAGE' });
    wrapper.instance().handleSubmit({ key: 'none' });

    expect(wrapper.state('message')).toEqual('WADDUP COVERAGE');
    expect(wrapper.instance().messageChatBot).not.toHaveBeenCalled()
  });

  it('should call postMessage and addMessage when calling messageChatBot', async () => {
    wrapper = mount(<ChatBox
      messages={mockMessages}
      hasErrored={mockHasErrored}
    />);

    postMessage.mockImplementation(() => {
      return Promise.resolve({ message: 'My name is Dr. Watson.  How are you today?' });
    });

    wrapper.instance().setState({ message: 'Hi there.' });
    await wrapper.instance().messageChatBot();

    expect(postMessage).toHaveBeenCalledWith('Hi there.')
  });

  it('should call hasErrored if messageChatBot rejects', async () => {
    wrapper = mount(<ChatBox
      messages={mockMessages}
      hasErrored={mockHasErrored}
    />);

    postMessage.mockImplementation(() => {
      return Promise.reject(Error('fetch failed.'));
    });

    await wrapper.instance().messageChatBot();

    expect(mockHasErrored).toHaveBeenCalledWith('fetch failed.')
  });
});

describe('mapStateToProps', () => {
  it('should return an object with the messages and errorMsg information', () => {
    const mockUser = {
      id: 1568665187737,
      firstName: "Travis",
      lastName: "Rollins",
      feeling: "tired"
    };

    const mockState = {
      user: mockUser,
      messages: [{
        message: 'Hi there, my name is Dr. Watson. I understand that you have been feeling happy. That is super exciting to hear!',
        isUser: false,
      }],
      errorMsg: ''
    };
    const expected = {
      errorMsg: '',
      messages: [{
        message: 'Hi there, my name is Dr. Watson. I understand that you have been feeling happy. That is super exciting to hear!',
        isUser: false,
      }]
    };
    const mappedProps = mapStateToProps(mockState);

    expect(mappedProps).toEqual(expected);
  });
});

describe('mapDispatchToProps', () => {
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

});
