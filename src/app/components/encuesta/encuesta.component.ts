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
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatChipInputEvent } from '@angular/material/chips';

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
    MatCheckboxModule,
    MatChipsModule,
    MatRadioModule,
    MatSelectModule
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
      lactose: false, // Añadido lácteos
      others: ''
    },
    dislikes: [], // Para disgustos alimenticios
    diseases: {
      diabetesType1: false,
      diabetesType2: false,
      anemia: false,
      hypertension: false,
      celiac: false,
      lactoseIntolerance: false,
      others: ''
    },
    location: {
      enabled: false,
      country: 'Perú',
      city: '',
      region: ''
    },
    physicalActivity: null,
    goal: null
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

  // Método para añadir disgustos alimenticios
  addDisgusto(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.surveyData.dislikes.push(value);
    }
    // Clear the input value
    if (event.chipInput) {
      event.chipInput.clear();
    }
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
          this.surveyData.location.enabled = true; // Actualizado para usar el objeto location
          
          if (this.map) {
            this.updateMarker(location);
          } else {
            this.initMap();
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          this.surveyData.location.enabled = false; // Actualizado para usar el objeto location
        }
      );
    }
  }

  skipLocation() {
    this.surveyData.location.enabled = false; // Actualizado para usar el objeto location
    this.nextStep();
  }

  finishSurvey() {
    // Convertir los datos a la estructura requerida
    const userData = {
      id: "1",
      nombre: "Usuario", // Podría obtenerse del registro previo
      email: localStorage.getItem('userEmail') || "usuario@example.com",
      fechaNacimiento: this.surveyData.birthDate || new Date().toISOString().split('T')[0],
      sexo: this.surveyData.gender || "femenino",
      pesoKg: this.surveyData.weight.value || 70,
      alturaCm: this.surveyData.height.value || 160,
      alergias: this.convertirAlergias(),
      disgustos: this.surveyData.dislikes || [],
      condicionesMedicas: this.convertirCondicionesMedicas(),
      ubicacion: {
        pais: this.surveyData.location.country || "Peru",
        ciudad: this.surveyData.location.city || "Lima",
        region: this.surveyData.location.region || "Lima"
      },
      actividadFisica: this.surveyData.physicalActivity || "baja",
      objetivo: this.surveyData.goal || "mejorar salud"
    };
    
    // Guardar datos y marcar como autenticado
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('isAuthenticated', 'true');
    
    // Redireccionar al home
    this.router.navigate(['/home']);
  }

  // Funciones auxiliares para convertir datos
  private convertirAlergias(): string[] {
    const alergias: string[] = [];
    if (this.surveyData.allergies.gluten) alergias.push('gluten');
    if (this.surveyData.allergies.seafood) alergias.push('mariscos');
    if (this.surveyData.allergies.corn) alergias.push('maíz');
    if (this.surveyData.allergies.lactose) alergias.push('lácteos');
    if (this.surveyData.allergies.others) {
      const otras = this.surveyData.allergies.others.split(',').map(a => a.trim()).filter(a => a);
      alergias.push(...otras);
    }
    return alergias;
  }

  private convertirCondicionesMedicas(): string[] {
    const condiciones: string[] = [];
    if (this.surveyData.diseases.diabetesType1) condiciones.push('diabetes melitus tipo 1');
    if (this.surveyData.diseases.diabetesType2) condiciones.push('diabetes tipo 2');
    if (this.surveyData.diseases.anemia) condiciones.push('anemia');
    if (this.surveyData.diseases.hypertension) condiciones.push('hipertensión');
    if (this.surveyData.diseases.celiac) condiciones.push('enfermedad celíaca');
    if (this.surveyData.diseases.lactoseIntolerance) condiciones.push('intolerancia a la lactosa');
    if (this.surveyData.diseases.others) {
      const otras = this.surveyData.diseases.others.split(',').map(c => c.trim()).filter(c => c);
      condiciones.push(...otras);
    }
    return condiciones;
  }
}
