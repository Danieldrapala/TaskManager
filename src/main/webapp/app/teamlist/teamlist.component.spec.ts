jest.mock('@angular/router');
jest.mock('app/core/auth/account.service');

import { ComponentFixture, TestBed, waitForAsync, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { AccountService } from 'app/core/auth/account.service';
import { TeamListComponent } from './teamlist.component';
import { TeamListService } from './teamlist.service';
import { UserForUser } from '../model/user.model';


describe('Component Tests', () => {
  describe('User Management Component', () => {
    let comp: TeamListComponent;
    let fixture: ComponentFixture<TeamListComponent>;
    let service: TeamListService;
    let mockAccountService: AccountService;
    const data = of({
      defaultSort: 'id,asc',
    });
    const queryParamMap = of(
      jest.requireActual('@angular/router').convertToParamMap({
        page: '1',
        size: '1',
        sort: 'id,desc',
      })
    );

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          declarations: [TeamListComponent],
          providers: [Router, { provide: ActivatedRoute, useValue: { data, queryParamMap } }, AccountService],
        })
          .overrideTemplate(TeamListComponent, '')
          .compileComponents();
      })
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(TeamListComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(TeamListService);
      mockAccountService = TestBed.inject(AccountService);
      mockAccountService.identity = jest.fn(() => of(null));
    });

    describe('OnInit', () => {
      it('Should call load all on init', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          const headers = new HttpHeaders().append('link', 'link;link');
          spyOn(service, 'query').and.returnValue(
            of(
              new HttpResponse({
                body: [new UserForUser(123)],
                headers,
              })
            )
          );

          // WHEN
          comp.ngOnInit();
          tick(); // simulate async

          // THEN
          expect(service.query).toHaveBeenCalled();
          expect(comp.users?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        })
      ));
    });
  });
});
