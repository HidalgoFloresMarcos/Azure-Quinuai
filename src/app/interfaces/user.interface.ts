export interface Usuario {
  id?: string;
  nombre: string;
  email: string;
  fechaNacimiento: string;
  sexo: 'masculino' | 'femenino';
  pesoKg: number;
  alturaCm: number;
  alergias: string[];
  disgustos: string[];
  condicionesMedicas: string[];
  ubicacion: {
    pais: string;
    ciudad: string;
    region: string;
  };
  actividadFisica: 'baja' | 'moderada' | 'alta';
  objetivo: 'bajar de peso' | 'mantener peso' | 'aumentar peso' | 'mejorar salud';
}

export interface FamiliaUsuario {
  usuarioPrincipal: Usuario;
  miembros: Usuario[];
}
