
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appForbidNegativeNumbers]'
})
export class ForbidNegativeNumbersDirective {
  @Input() setCursor: string;
  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event']) onKeyDown(e) {
    if (!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58)
      || e.keyCode === 8
      || e.keyCode === 46
      || e.keyCode === 16
      || e.keyCode === 17
      || (e.keyCode > 36 && e.keyCode < 41))) {
        return false;
    }
  }
}
