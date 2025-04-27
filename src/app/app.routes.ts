import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { BotComponent } from './components/bot/bot.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'register',
        loadChildren: () => import('./components/auth/register/register.module').then(m => m.RegisterModule)
    },
    {
        path: 'encuesta',
        component: EncuestaComponent,
        canActivate: [authGuard]
    },
    {
        path: 'bot',
        component: BotComponent,
        canActivate: [authGuard]
    },
    {
        path: 'compra',
        component: ShoppingComponent,
        canActivate: [authGuard]
    },
    {
        path: 'estadisticas',
        component: EstadisticasComponent,
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
