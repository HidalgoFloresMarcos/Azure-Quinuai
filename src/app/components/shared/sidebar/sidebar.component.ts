import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class SidebarComponent {
  @Output() expanded = new EventEmitter<boolean>();
  isExpanded = false;

  menuItems = [
    { icon: 'fas fa-home', route: '/home', label: 'Inicio' },
    { icon: 'fas fa-shopping-cart', route: '/compra', label: 'Compras' },
    { icon: 'fas fa-robot', route: '/bot', label: 'Bot' },
    { icon: 'fas fa-chart-bar', route: '/encuesta', label: 'Encuesta' }
  ];

  onMouseEnter() {
    this.isExpanded = true;
    this.expanded.emit(true);
  }

  onMouseLeave() {
    this.isExpanded = false;
    this.expanded.emit(false);
  }
} 