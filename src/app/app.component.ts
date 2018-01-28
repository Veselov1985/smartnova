import { SettingsService } from './shared/services/common/settings.service';
import { Component, HostBinding, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Smartnova';
  public moment: Date = new Date();

  constructor(private settingsService: SettingsService) {}

  @HostBinding('class') public cssClass = 'sidebar-closed';

  @HostListener('window:beforeunload', ['$event'])
  saveSettings($event) {
    sessionStorage.setItem('settings', JSON.stringify(this.settingsService.settings));
  }

}
