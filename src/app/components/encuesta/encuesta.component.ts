import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SurveyData } from '../../interfaces/survey.interface';
import * as L from 'leaflet';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule, MatStepper } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule
  ],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.scss'
})
export class EncuestaComponent implements OnInit, AfterViewInit {
  @ViewChild('stepper') stepper!: MatStepper;
  selectedLocation: L.LatLng | null = null;
  map!: L.Map;
  private marker: L.Marker | null = null;
  
  surveyData: SurveyData = {
    gender: null,
    birthDate: '',
    height: { value: 170, unit: 'cm' },
    weight: { value: 70, unit: 'kg' },
    allergies: {
      gluten: false,
      seafood: false,
      corn: false,
      others: ''
    },
    diseases: {
      diabetes: false,
      cancer: false,
      hypertension: false,
      others: ''
    },
    location: false
  };

  constructor(private router: Router) {}

  ngOnInit() {
    // Cargar los estilos de Leaflet
    const leafletLink = document.createElement('link');
    leafletLink.rel = 'stylesheet';
    leafletLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    leafletLink.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    leafletLink.crossOrigin = '';
    document.head.appendChild(leafletLink);

    // Cargar los estilos de Material Icons
    const materialLink = document.createElement('link');
    materialLink.rel = 'stylesheet';
    materialLink.href = 'https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined';
    document.head.appendChild(materialLink);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.stepper.selectedIndex === 3) {
        this.initMap();
      }
    });
  }

  canProceed(): boolean {
    if (!this.stepper) return false;
    
    const currentStep = this.stepper.selectedIndex;
    switch (currentStep) {
      case 0: // Datos Personales
        return !!this.surveyData.gender && !!this.surveyData.birthDate;
      case 1: // Medidas
        return !!this.surveyData.height.value && !!this.surveyData.weight.value;
      case 2: // Salud
        return true; // Opcional
      case 3: // Ubicación
        return true; // Opcional
      default:
        return false;
    }
  }

  previousStep() {
    if (!this.stepper) return;
    if (this.stepper.selectedIndex > 0) {
      this.stepper.previous();
    }
  }

  nextStep() {
    if (!this.stepper) return;
    if (!this.canProceed()) {
      return;
    }

    if (this.stepper.selectedIndex === 3) {
      this.finishSurvey();
    } else {
      this.stepper.next();
      if (this.stepper.selectedIndex === 3) {
        setTimeout(() => this.initMap(), 100);
      }
    }
  }

  initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement || this.map) return;

    const defaultLocation = new L.LatLng(-12.0464, -77.0428); // Lima, Perú

    this.map = L.map('map', {
      center: [this.selectedLocation?.lat || defaultLocation.lat, 
              this.selectedLocation?.lng || defaultLocation.lng],
      zoom: 15,
      zoomControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.selectedLocation = e.latlng;
      this.updateMarker(e.latlng);
    });

    setTimeout(() => {
      this.map?.invalidateSize();
    }, 100);
  }

  updateMarker(position: L.LatLng) {
    if (!this.map) return;

    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    this.marker = L.marker(position).addTo(this.map);
    this.map.setView(position, 15);
  }

  requestLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = new L.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          this.selectedLocation = location;
          this.surveyData.location = true;
          
          if (this.map) {
            this.updateMarker(location);
          } else {
            this.initMap();
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          this.surveyData.location = false;
        }
      );
    }
  }

  skipLocation() {
    this.surveyData.location = false;
    this.nextStep();
  }

  finishSurvey() {
    console.log('Datos de la encuesta:', this.surveyData);
    this.router.navigate(['/bot']);
  }
}
