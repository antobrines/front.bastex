import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const cookie = document.cookie;

  if (cookie.includes('connect.sid')) {
    return true;
  }
  return false;


};
