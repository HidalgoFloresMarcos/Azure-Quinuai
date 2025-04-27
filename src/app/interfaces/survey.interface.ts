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
    others: string;
  };
  diseases: {
    diabetes: boolean;
    cancer: boolean;
    hypertension: boolean;
    others: string;
  };
  location: boolean;
}

export type SurveyStep = 'gender' | 'measurements' | 'allergies' | 'location'; 