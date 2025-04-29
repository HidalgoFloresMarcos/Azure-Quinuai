import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatStepperModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatSliderModule,
    MatChipsModule,
    MatDividerModule,
    MatTooltipModule,
    MatCheckboxModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {
  // Control de pasos de registro
  currentStep: number = 1;
  totalSteps: number = 4; // Actualizado a 4 pasos
  
  // Tipo de registro: individual o familiar
  registrationType: 'individual' | 'familiar' = 'individual';
  
  // Formulario reactivo para los datos de registro
  registerForm: FormGroup;
  
  // Arrays para alergias, disgustos, condiciones médicas y platos favoritos
  alergias: string[] = [];
  disgustos: string[] = [];
  condicionesMedicas: string[] = [];
  platosFavoritos: string[] = [];

  // Para miembros de la familia
  familyMembers: any[] = [];
  currentMemberIndex: number = -1;
  
  // Indicadores de expansión para secciones
  expansionPanels = {
    datosPersonales: true,
    salud: false,
    presupuestoPreferencias: false
  };
  
  // Comidas del día para selección múltiple
  comidasDelDia = [
    { name: 'Desayuno', selected: true },
    { name: 'Media mañana', selected: false },
    { name: 'Almuerzo', selected: true },
    { name: 'Merienda', selected: false },
    { name: 'Cena', selected: true }
  ];

  // Iconos y datos visuales
  icons = {
    personal: 'person',
    health: 'health_and_safety',
    budget: 'payments',
    preferences: 'restaurant',
    meals: 'restaurant_menu',
    favorites: 'favorite',
    location: 'location_on',
    activity: 'fitness_center',
    goals: 'track_changes',
    family: 'family_restroom'
  };

  // Datos visuales para opciones
  favoriteDishOptions = [
    { name: 'Pollo al horno', icon: '🍗' },
    { name: 'Lomo saltado', icon: '🥩' },
    { name: 'Ensalada César', icon: '🥗' },
    { name: 'Pasta con verduras', icon: '🍝' },
    { name: 'Tacos', icon: '🌮' }
  ];
  
  allergyOptions = [
    { name: 'Gluten', icon: '🌾' },
    { name: 'Lácteos', icon: '🥛' },
    { name: 'Frutos secos', icon: '🥜' },
    { name: 'Mariscos', icon: '🦐' }
  ];
  
  dislikeOptions = [
    { name: 'Berenjena', icon: '🍆' },
    { name: 'Brócoli', icon: '🥦' }
  ];
  
  // Actualizar las opciones de condiciones médicas
  healthConditionOptions = [
    { name: 'Diabetes tipo 1', icon: '💉', description: 'Dependiente de insulina' },
    { name: 'Diabetes tipo 2', icon: '📊', description: 'No dependiente de insulina' },
    { name: 'Anemia', icon: '🔴', description: 'Deficiencia de hierro' },
    { name: 'Hipertensión', icon: '❤️', description: 'Presión arterial alta' },
    { name: 'Celiaquía', icon: '🌾', description: 'Intolerancia al gluten' }
  ];
  
  // Arreglo para almacenar las condiciones seleccionadas (separado de los textos ingresados)
  selectedHealthConditions: string[] = [];

  // Texto para tooltips
  tooltips = {
    budget: 'Esta información nos ayudará a sugerir recetas dentro de tu presupuesto',
    meals: 'Adapta tus recomendaciones nutricionales a tu horario de comidas diario',
    favorites: 'Conocer tus preferencias nos permite personalizar tus sugerencias',
    habits: 'Esta información nos ayuda a entender tus hábitos alimenticios actuales'
  };
  
  helpMessages = {
    budget: 'Establecer un presupuesto nos ayuda a optimizar tus compras',
    location: 'Tu ubicación nos permite sugerir alimentos y mercados locales',
    activity: 'El nivel de actividad física nos ayuda a calcular tus necesidades calóricas'
  };
  
  // Animación y UI
  showConfetti = false;

  // Variables para manejar los valores de presupuesto
  presupuestoTotalValue: number = 0;
  presupuestoDiarioValue: number = 0;

  // Datos para los desplegables de ubicación
  paises: string[] = [
    'Perú', 'Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 'Ecuador', 
    'Estados Unidos', 'México', 'Canadá', 'Venezuela', 'Uruguay', 'Paraguay',
    'Costa Rica', 'Cuba', 'Guatemala', 'Honduras', 'Nicaragua', 'Panamá',
    'Puerto Rico', 'República Dominicana', 'El Salvador'
  ];

  ciudadesPorPais: { [key: string]: string[] } = {
    'Perú': ['Lima', 'Arequipa', 'Trujillo', 'Cusco', 'Chiclayo', 'Piura', 'Iquitos', 'Huancayo', 'Tacna', 'Pucallpa'],
    'Argentina': ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'La Plata', 'Tucumán', 'Mar del Plata'],
    'Bolivia': ['La Paz', 'Santa Cruz', 'Cochabamba', 'Sucre', 'Potosí', 'Oruro'],
    'Brasil': ['São Paulo', 'Río de Janeiro', 'Brasilia', 'Salvador', 'Fortaleza', 'Belo Horizonte'],
    'Chile': ['Santiago', 'Valparaíso', 'Concepción', 'La Serena', 'Antofagasta'],
    'Colombia': ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Santa Marta'],
    'Ecuador': ['Quito', 'Guayaquil', 'Cuenca', 'Machala', 'Manta'],
    'Estados Unidos': ['Nueva York', 'Los Ángeles', 'Chicago', 'Houston', 'Phoenix', 'Miami', 'Boston', 'San Francisco'],
    'México': ['Ciudad de México', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'León', 'Juárez'],
    'Canadá': ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa'],
    'Venezuela': ['Caracas', 'Maracaibo', 'Valencia', 'Barquisimeto', 'Maracay'],
    'Uruguay': ['Montevideo', 'Salto', 'Paysandú', 'Las Piedras', 'Rivera'],
    'Paraguay': ['Asunción', 'Ciudad del Este', 'Encarnación', 'San Lorenzo', 'Capiatá'],
    'Costa Rica': ['San José', 'Alajuela', 'Cartago', 'Heredia', 'Liberia'],
    'Cuba': ['La Habana', 'Santiago de Cuba', 'Camagüey', 'Holguín', 'Santa Clara'],
    'Guatemala': ['Ciudad de Guatemala', 'Quetzaltenango', 'Escuintla', 'Villa Nueva'],
    'Honduras': ['Tegucigalpa', 'San Pedro Sula', 'La Ceiba', 'Choloma'],
    'Nicaragua': ['Managua', 'León', 'Masaya', 'Granada', 'Chinandega'],
    'Panamá': ['Ciudad de Panamá', 'Colón', 'David', 'La Chorrera', 'Santiago'],
    'Puerto Rico': ['San Juan', 'Bayamón', 'Carolina', 'Ponce', 'Caguas'],
    'República Dominicana': ['Santo Domingo', 'Santiago de los Caballeros', 'La Romana', 'San Pedro de Macorís'],
    'El Salvador': ['San Salvador', 'Santa Ana', 'Soyapango', 'San Miguel', 'Mejicanos']
  };

  distritosPorCiudad: { [key: string]: string[] } = {
    'Lima': ['Miraflores', 'San Isidro', 'Barranco', 'La Molina', 'San Borja', 'Surco', 'Jesús María', 'San Miguel', 'Magdalena', 'Lince'],
    'Arequipa': ['Cercado', 'Cayma', 'Yanahuara', 'Cerro Colorado', 'Paucarpata', 'José Luis Bustamante y Rivero'],
    'Ciudad de México': ['Polanco', 'Condesa', 'Roma', 'Coyoacán', 'Chapultepec', 'Santa Fe', 'Zona Rosa', 'Del Valle'],
    'Buenos Aires': ['Palermo', 'Recoleta', 'San Telmo', 'Puerto Madero', 'Belgrano', 'Caballito'],
    'Bogotá': ['Chapinero', 'Usaquén', 'La Candelaria', 'Teusaquillo', 'Santa Fe'],
    'Santiago': ['Providencia', 'Las Condes', 'Vitacura', 'Ñuñoa', 'La Reina', 'Santiago Centro'],
    'Nueva York': ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'],
    'São Paulo': ['Jardins', 'Pinheiros', 'Vila Mariana', 'Moema', 'Itaim Bibi', 'Consolação']
  };

  ciudadesDisponibles: string[] = [];
  distritosDisponibles: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      // Datos de cuenta
      cuenta: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      }),
      
      // Datos personales (individual o principal de familia)
      datosPersonales: this.fb.group({
        nombre: ['', Validators.required],
        fechaNacimiento: [null, Validators.required],
        sexo: ['', Validators.required],
        pesoKg: [null, [Validators.required, Validators.min(1)]],
        alturaCm: [null, [Validators.required, Validators.min(1)]],
        alergias: [[]],
        disgustos: [[]],
        condicionesMedicas: [[]]
      }),
      
      // Ubicación y objetivos
      ubicacionObjetivos: this.fb.group({
        ubicacion: this.fb.group({
          pais: ['Perú', Validators.required],
          ciudad: ['', Validators.required],
          region: ['', Validators.required]
        }),
        objetivos: this.fb.group({
          actividadFisica: ['baja', Validators.required],
          objetivo: ['', Validators.required]
        })
      }),
      
      // Preferencias y Presupuesto - asegurarnos que este grupo existe
      preferenciasPresupuesto: this.fb.group({
        presupuestoTotal: [0],
        presupuestoDiario: [0],
        descripcionAlimentacion: [''],
        limitacionesHorario: [''],
        comidaFueraDeCasa: [false],
        platosFavoritos: [[]]
      }),
      
      // Para registro familiar
      tipoRegistro: ['individual'],
      miembrosFamilia: this.fb.array([])
    });
  }

  ngOnInit(): void {
    // Inicializar con ciudades de Perú por defecto
    this.onPaisChange('Perú');
  }

  // Getter para acceder al array de miembros familiares
  get miembrosFamiliaArray() {
    return this.registerForm.get('miembrosFamilia') as FormArray;
  }

  // Cambiar el tipo de registro
  cambiarTipoRegistro(tipo: 'individual' | 'familiar') {
    this.registrationType = tipo;
    this.registerForm.get('tipoRegistro')?.setValue(tipo);
  }

  // Avanzar al siguiente paso
  siguientePaso() {
    // Validar el paso actual
    if (this.validarPasoActual()) {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
      } else {
        this.finalizar();
      }
    }
  }

  // Volver al paso anterior
  pasoPrevio() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Validar datos según el paso actual
  validarPasoActual(): boolean {
    // Dependiendo del paso, validamos diferentes grupos del formulario
    switch(this.currentStep) {  // Corregido: añadido 'this.'
      case 1: // Validar cuenta
        const cuentaGroup = this.registerForm.get('cuenta');
        return cuentaGroup?.valid || false;
      
      case 2: // Validar datos personales
        const datosGroup = this.registerForm.get('datosPersonales');
        return datosGroup?.valid || false;
      
      case 3: // Validar personalización (este es el nuevo paso)
        // Este paso puede ser opcional o tener validaciones específicas
        return true; // O implementar validaciones específicas si es necesario
      
      case 4: // Validar ubicación y objetivos
        const ubicacionObjetivosGroup = this.registerForm.get('ubicacionObjetivos');
        return ubicacionObjetivosGroup?.valid || false;
      
      default:
        return true;
    }
  }

  // Añadir un miembro familiar
  agregarMiembroFamiliar() {
    const nuevoMiembro = this.fb.group({
      nombre: ['', Validators.required],
      fechaNacimiento: [null],
      sexo: [''],
      pesoKg: [null, [Validators.required, Validators.min(1)]],
      alturaCm: [null, [Validators.required, Validators.min(1)]],
      relacion: ['', Validators.required],
      alergias: [[]],
      disgustos: [[]],
      condicionesMedicas: [[]],
      actividadFisica: ['baja'],
      objetivo: ['']
    });

    this.miembrosFamiliaArray.push(nuevoMiembro);
    this.familyMembers.push({
      nombre: '',
      alergias: [],
      disgustos: [],
      condicionesMedicas: []
    });
    
    // Seleccionar el nuevo miembro
    this.currentMemberIndex = this.familyMembers.length - 1;
  }

  // Seleccionar miembro para editar
  seleccionarMiembro(index: number) {
    this.currentMemberIndex = index;
  }

  // Métodos para la sección de comidas
  toggleComida(index: number) {
    this.comidasDelDia[index].selected = !this.comidasDelDia[index].selected;
  }
  
  // Método para añadir plato favorito con icono
  agregarPlatoFavoritoConIcono(plato: string, icono: string) {
    if (plato && plato.trim()) {
      const platoConIcono = `${icono} ${plato.trim()}`;
      this.platosFavoritos.push(platoConIcono);
      this.registerForm.get('preferenciasPresupuesto.platosFavoritos')?.setValue([...this.platosFavoritos]);
    }
  }
  
  // Métodos para platos favoritos
  agregarPlatoFavorito(plato: string) {
    if (plato && plato.trim()) {
      this.platosFavoritos.push(plato.trim());
      this.registerForm.get('preferenciasPresupuesto.platosFavoritos')?.setValue([...this.platosFavoritos]);
    }
  }

  eliminarPlatoFavorito(index: number) {
    this.platosFavoritos.splice(index, 1);
    this.registerForm.get('preferenciasPresupuesto.platosFavoritos')?.setValue([...this.platosFavoritos]);
  }

  // Método para finalizar con animación
  finalizar() {
    if (this.registerForm.valid) {
      // Asegurarnos de que los valores de presupuesto están actualizados
      this.registerForm.get('preferenciasPresupuesto.presupuestoTotal')?.setValue(this.presupuestoTotalValue);
      this.registerForm.get('preferenciasPresupuesto.presupuestoDiario')?.setValue(this.presupuestoDiarioValue);
      
      // Mostrar confeti
      this.showConfetti = true;
      
      console.log('Formulario enviado:', this.registerForm.value);
      
      // Guardar en localStorage y marcar como autenticado
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userData', JSON.stringify(this.registerForm.value));
      
      // Redireccionar al home después de una breve animación
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1500);
    }
  }

  // Métodos para manejar alergias
  agregarAlergia(alergia: string) {
    if (alergia && alergia.trim()) {
      this.alergias.push(alergia.trim());
      this.registerForm.get('datosPersonales.alergias')?.setValue([...this.alergias]);
    }
  }

  eliminarAlergia(index: number) {
    this.alergias.splice(index, 1);
    this.registerForm.get('datosPersonales.alergias')?.setValue([...this.alergias]);
  }

  // Métodos para manejar disgustos
  agregarDisgusto(disgusto: string) {
    if (disgusto && disgusto.trim()) {
      this.disgustos.push(disgusto.trim());
      this.registerForm.get('datosPersonales.disgustos')?.setValue([...this.disgustos]);
    }
  }

  eliminarDisgusto(index: number) {
    this.disgustos.splice(index, 1);
    this.registerForm.get('datosPersonales.disgustos')?.setValue([...this.disgustos]);
  }

  // Métodos para manejar condiciones médicas
  agregarCondicionMedica(condicion: string) {
    if (condicion && condicion.trim()) {
      const condiciones = condicion.split(',').map(c => c.trim()).filter(c => c);
      
      for (const c of condiciones) {
        if (!this.condicionesMedicas.includes(c)) {
          this.condicionesMedicas.push(c);
        }
      }
      
      this.registerForm.get('datosPersonales.condicionesMedicas')?.setValue([...this.condicionesMedicas]);
    }
  }

  eliminarCondicionMedica(index: number) {
    this.condicionesMedicas.splice(index, 1);
    this.registerForm.get('datosPersonales.condicionesMedicas')?.setValue([...this.condicionesMedicas]);
  }
  
  // Método para eliminar un miembro familiar
  eliminarMiembroFamiliar(index: number) {
    this.miembrosFamiliaArray.removeAt(index);
    this.familyMembers.splice(index, 1);
    
    // Si el miembro eliminado era el seleccionado actualmente
    if (this.currentMemberIndex === index) {
      this.currentMemberIndex = -1; // Volver al usuario principal
    } else if (this.currentMemberIndex > index) {
      // Ajustar el índice si se eliminó un miembro anterior
      this.currentMemberIndex--;
    }
  }

  // Método para comprobar si una condición está seleccionada
  isConditionSelected(conditionName: string): boolean {
    return this.selectedHealthConditions.includes(conditionName);
  }

  // Método para alternar una condición médica
  toggleHealthCondition(conditionName: string): void {
    const index = this.selectedHealthConditions.indexOf(conditionName);
    
    if (index === -1) {
      // Si no está seleccionada, la añadimos a ambos arrays
      this.selectedHealthConditions.push(conditionName);
      this.condicionesMedicas.push(conditionName);
    } else {
      // Si ya está seleccionada, la quitamos de ambos arrays
      this.selectedHealthConditions.splice(index, 1);
      const condicionIndex = this.condicionesMedicas.indexOf(conditionName);
      if (condicionIndex !== -1) {
        this.condicionesMedicas.splice(condicionIndex, 1);
      }
    }
    
    // Actualizar el formulario
    this.registerForm.get('datosPersonales.condicionesMedicas')?.setValue([...this.condicionesMedicas]);
  }

  // Métodos para actualizar el presupuesto desde el slider
  updatePresupuestoTotal(value: number) {
    this.presupuestoTotalValue = value;
    this.registerForm.get('preferenciasPresupuesto.presupuestoTotal')?.setValue(value);
    this.calcularPresupuestoDiario();
  }

  updatePresupuestoDiario(value: number) {
    this.presupuestoDiarioValue = value;
    this.registerForm.get('preferenciasPresupuesto.presupuestoDiario')?.setValue(value);
  }

  // Métodos para actualizar el presupuesto desde los inputs
  onPresupuestoTotalInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = Number(input.value);
    this.presupuestoTotalValue = value;
    this.registerForm.get('preferenciasPresupuesto.presupuestoTotal')?.setValue(value);
    this.calcularPresupuestoDiario();
  }

  onPresupuestoDiarioInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = Number(input.value);
    this.presupuestoDiarioValue = value;
    this.registerForm.get('preferenciasPresupuesto.presupuestoDiario')?.setValue(value);
  }

  // Método para calcular automáticamente el presupuesto diario basado en el total
  calcularPresupuestoDiario() {
    // Suponiendo un mes de 30 días y una sola persona
    const personasTotal = this.registrationType === 'familiar' ? 
      this.miembrosFamiliaArray.length + 1 : 1;
      
    if (personasTotal > 0 && this.presupuestoTotalValue > 0) {
      const presupuestoDiario = Math.round((this.presupuestoTotalValue / 30) / personasTotal);
      this.presupuestoDiarioValue = presupuestoDiario;
      this.registerForm.get('preferenciasPresupuesto.presupuestoDiario')?.setValue(presupuestoDiario);
    }
  }

  // Método para cargar ciudades según el país seleccionado
  onPaisChange(pais: string): void {
    // Actualizar el valor del país en el formulario
    this.registerForm.get('ubicacionObjetivos.ubicacion.pais')?.setValue(pais);
    
    // Cargar ciudades del país seleccionado
    this.ciudadesDisponibles = this.ciudadesPorPais[pais] || [];
    
    // Resetear ciudad y distrito
    this.registerForm.get('ubicacionObjetivos.ubicacion.ciudad')?.setValue('');
    this.registerForm.get('ubicacionObjetivos.ubicacion.region')?.setValue('');
    this.distritosDisponibles = [];
  }

  // Método para cargar distritos según la ciudad seleccionada
  onCiudadChange(ciudad: string): void {
    // Actualizar el valor de la ciudad en el formulario
    this.registerForm.get('ubicacionObjetivos.ubicacion.ciudad')?.setValue(ciudad);
    
    // Cargar distritos de la ciudad seleccionada
    this.distritosDisponibles = this.distritosPorCiudad[ciudad] || [];
    
    // Resetear distrito
    this.registerForm.get('ubicacionObjetivos.ubicacion.region')?.setValue('');
  }
}
