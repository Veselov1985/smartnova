import { Component, HostBinding, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Smartnova';
  public moment: Date = new Date();
  @HostBinding('class') public cssClass = 'sidebar-closed';

}
