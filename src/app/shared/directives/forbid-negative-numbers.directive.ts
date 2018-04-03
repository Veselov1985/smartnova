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
      || e.keyCode === 8)) {
        return false;
    }
  }
}
