import { Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appForbidNegativeNumbers]'
})
export class ForbidNegativeNumbersDirective {
  
  constructor(private el:ElementRef) { }

  @HostListener('keydown', ['$event']) onKeyDown(e) {
    let value=this.el.nativeElement.value;
    if(value=='' && e.key===',') return;
    if (!((e.keyCode > 95 && e.keyCode < 106)
      ||(e.key===',' && value.indexOf(',')==-1)
      || (e.keyCode > 47 && e.keyCode < 58)
      || e.keyCode === 8)) {
        return false;
    }
  }
}

