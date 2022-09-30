import { hello } from '../src/index';

describe('index', () => {
  describe('hello export', () => {
    it('is correct', async () => {
      expect(hello).toEqual('world');
    });
  });
});
