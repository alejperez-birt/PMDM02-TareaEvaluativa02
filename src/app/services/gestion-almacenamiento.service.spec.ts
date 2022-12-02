import { TestBed } from '@angular/core/testing';

import { GestionAlmacenamientoService } from './gestion-almacenamiento.service';

describe('GestionAlmacenamientoService', () => {
  let service: GestionAlmacenamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionAlmacenamientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
