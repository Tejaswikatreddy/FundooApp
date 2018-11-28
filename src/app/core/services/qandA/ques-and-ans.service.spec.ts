import { TestBed } from '@angular/core/testing';

import { QuesAndAnsService } from './ques-and-ans.service';

describe('QuesAndAnsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuesAndAnsService = TestBed.get(QuesAndAnsService);
    expect(service).toBeTruthy();
  });
});
