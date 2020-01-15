import { errorMsg } from './errorMsg';

describe('errorMsg Reducer', () => {
  it('should return empty string when there is no case', () => {
    expect(errorMsg(undefined, { type: 'none' })).toEqual('');
  });

  it('should return an errorMsg when the case is HAS_ERRORED', () => {
    const mockAction = {
      type: 'HAS_ERRORED',
      errorMsg: 'Hi Eric and Robbie :D'
    };

    expect(errorMsg(undefined, mockAction)).toEqual('Hi Eric and Robbie :D')
  })
});
