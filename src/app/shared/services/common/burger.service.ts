import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BurgerService {
  private actionAnnouncedSource = new Subject<string>();
  actionAnnounced$ = this.actionAnnouncedSource.asObservable();
  mission = 'closed';
  constructor() { }

  openCloseSidebar() {
    this.mission = this.mission === 'opened' ? 'closed' : 'opened';
    this.actionAnnouncedSource.next(this.mission);
  }
}
