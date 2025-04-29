import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container" [class.sidebar-expanded]="sidebarExpanded" [class.no-sidebar]="hideSidebar">
      <app-sidebar *ngIf="!hideSidebar" (expanded)="onSidebarExpanded($event)"></app-sidebar>
      <main class="main-content" [class.no-margin]="hideSidebar">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`  
    .app-container {
      display: flex;
      min-height: 100vh;
      position: relative;
    }

    .main-content {
      flex: 1;
      margin-left: 70px;
      padding: 20px;
      background-color: #f8f9fa;
      transition: margin-left 0.3s ease;
    }

    .no-sidebar .main-content,
    .main-content.no-margin {
      margin-left: 0;
      background-color: white;
    }

    .sidebar-expanded .main-content {
      margin-left: 200px;
    }

    .no-sidebar .main-content {
      padding: 0;
    }

    @media (max-width: 1023px) {
      .main-content {
        margin-left: 0;
        margin-bottom: 60px;
        padding: 15px;
      }

      .sidebar-expanded .main-content {
        margin-left: 0;
      }
    }
  `],
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent]
})
export class AppComponent {
  title = 'quinuai';
  sidebarExpanded = false;
  hideSidebar = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Rutas donde no queremos mostrar la barra de navegación
        this.hideSidebar = ['', '/', '/landing', '/register', '/encuesta'].includes(event.url);
      }
    });
  }

  onSidebarExpanded(expanded: boolean): void {
    this.sidebarExpanded = expanded;
  }
}
