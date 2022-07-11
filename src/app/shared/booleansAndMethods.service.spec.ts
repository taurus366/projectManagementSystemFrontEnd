import { TestBed } from '@angular/core/testing';

import { BooleansAndMethodsService } from './booleansAndMethods.service';

describe('MethodsService', () => {
  let service: BooleansAndMethodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooleansAndMethodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
