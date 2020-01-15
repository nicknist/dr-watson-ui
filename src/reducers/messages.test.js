import { messages } from './messages';

describe('messages Reducer', () => {
  it('should return an empty array when there is no type', () => {
    expect(messages(undefined, { type: 'none' })).toEqual([]);
  });

  it('should give current array plus the additional message when ADD_MESSAGE it the type', () => {
    const mockState = [
      { message: 'numbah1' }
    ];
    const newMessage = {
      type: 'ADD_MESSAGE',
      message: 'numbah2'
    }
    const expected = [
      { message: 'numbah1' },
      { type: 'ADD_MESSAGE', message: 'numbah2' }
    ];

    expect(messages(mockState, newMessage)).toEqual(expected)
  });

  it('should return an empty array when the type is CLEAR_MESSAGES', () => {
    expect(messages(undefined, { type: 'CLEAR_MESSAGES' })).toEqual([])
  });
})
