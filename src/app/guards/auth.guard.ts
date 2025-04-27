import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Aquí puedes agregar tu lógica para verificar si el usuario está autenticado
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (isAuthenticated) {
    return true;
  }
  
  // Si no está autenticado, redirige a register
  return router.parseUrl('/register');
}; 