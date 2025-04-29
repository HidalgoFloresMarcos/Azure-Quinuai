import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  // Rutas públicas
  { path: '', component: LandingComponent },
  { path: 'landing', component: LandingComponent },
  { 
    path: 'register', 
    loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)
  },

  // Rutas protegidas (requieren autenticación)
  { 
    path: 'home', 
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'compra', 
    loadComponent: () => import('./components/shopping/shopping.component').then(m => m.ShoppingComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'bot', 
    loadComponent: () => import('./components/bot/bot.component').then(m => m.BotComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'encuesta', 
    loadComponent: () => import('./components/encuesta/encuesta.component').then(m => m.EncuestaComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'estadisticas', 
    loadComponent: () => import('./components/estadisticas/estadisticas.component').then(m => m.EstadisticasComponent),
    canActivate: [AuthGuard]
  },

  // Ruta por defecto (redirección a la landing page)
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }