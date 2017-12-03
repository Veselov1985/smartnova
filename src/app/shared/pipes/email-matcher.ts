import { AbstractControl } from '@angular/forms';
export const emailMatcher = (control: AbstractControl): {[key: string]: boolean} => {
  const email = control.get('Check');
  const confirm = control.get('Confirm');
  if (!email || !confirm) {
    return null;
  }
  return email.value === confirm.value ? null : { nomatch: true };
};
