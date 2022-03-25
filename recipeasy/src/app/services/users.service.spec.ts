import { UsersService } from './users.service';
import { TestBed } from '@angular/core/testing';



describe('RecipesService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
