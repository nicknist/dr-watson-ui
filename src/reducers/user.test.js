import { user } from './user';

describe('user Reducer', () => {
  it('should return null when there is no action type', () => {
    expect(user(undefined, { type: 'none' })).toEqual(null);
  });

  it('should return null when the type is REMOVE_USER', () => {
    expect(user(undefined, { type: 'REMOVE_USER' })).toEqual(null);
  });

  it('should return a user when the type is CREATE_USER', () => {
    const mockUser = {
      type: 'CREATE_USER',
      user: 'ERTMER'
    };

    expect(user(undefined, mockUser)).toEqual('ERTMER');
  });
});
