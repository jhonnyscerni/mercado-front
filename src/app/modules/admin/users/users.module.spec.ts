import { TestBed } from '@angular/core/testing';

import { UsersModule } from './users.module';

describe('UsersModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UsersModule],
    });
  });

  it('initializes', () => {
    const module: UsersModule = TestBed.inject(UsersModule);
    expect(module).toBeTruthy();
  });
});
