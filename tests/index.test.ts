import Jiter, { init, createEvent } from '../src';

describe('module exports', () => {
  it('exports methods as named exports', () => {
    expect(init).toBeDefined();
    expect(createEvent).toBeDefined();
  });

  it('exports methods as default exports', () => {
    expect(Jiter).toBeDefined();
    expect(Jiter.init).toBeDefined();
    expect(Jiter.Events).toBeDefined();
  });
});
