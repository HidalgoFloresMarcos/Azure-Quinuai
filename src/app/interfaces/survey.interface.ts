export interface SurveyData {
  gender: 'masculino' | 'femenino' | null;
  birthDate: string | null;
  height: {
    value: number | null;
    unit: 'cm' | 'inch';
  };
  weight: {
    value: number | null;
    unit: 'kg' | 'lbs';
  };
  allergies: {
    gluten: boolean;
    seafood: boolean;
    corn: boolean;
    lactose: boolean; // Campo añadido para lácteos
    others: string;
  };
  dislikes: string[]; // Para disgustos alimenticios
  diseases: {
    diabetesType1: boolean;
    diabetesType2: boolean;
    anemia: boolean;
    hypertension: boolean;
    celiac: boolean;
    lactoseIntolerance: boolean;
    others: string;
  };
  location: {
    enabled: boolean;
    country: string;
    city: string;
    region: string;
  };
  physicalActivity: 'baja' | 'moderada' | 'alta' | null;
  goal: 'bajar de peso' | 'mantener peso' | 'aumentar peso' | 'mejorar salud' | null;
  
  // Para registro familiar
  isForFamily?: boolean;
  familyMembers?: FamilyMemberData[];
}

export interface FamilyMemberData {
  name: string;
  birthDate?: string;
  gender?: 'masculino' | 'femenino' | null;
  relationship: string;
  weight: number;
  height: number;
  allergies: string[];
  dislikes: string[];
  healthConditions: string[];
  physicalActivity?: 'baja' | 'moderada' | 'alta';
  goal?: 'bajar de peso' | 'mantener peso' | 'aumentar peso' | 'mejorar salud';
}

export type SurveyStep = 'gender' | 'measurements' | 'allergies' | 'health' | 'location' | 'goals';