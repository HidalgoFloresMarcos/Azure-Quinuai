/**
 * Iconos para secciones específicas
 */
export const SECTION_ICONS = {
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

/**
 * Opciones comunes para platos favoritos con iconos
 */
export const FAVORITE_DISHES = [
  { name: 'Pollo al horno', icon: '🍗' },
  { name: 'Lomo saltado', icon: '🥩' },
  { name: 'Ensalada César', icon: '🥗' },
  { name: 'Pasta con verduras', icon: '🍝' },
  { name: 'Tacos', icon: '🌮' },
  { name: 'Pescado a la parrilla', icon: '🐟' },
  { name: 'Arroz con pollo', icon: '🍚' },
  { name: 'Sopa de verduras', icon: '🥣' }
];

/**
 * Opciones comunes para alergias con iconos
 */
export const COMMON_ALLERGIES = [
  { name: 'Gluten', icon: '🌾' },
  { name: 'Lácteos', icon: '🥛' },
  { name: 'Frutos secos', icon: '🥜' },
  { name: 'Mariscos', icon: '🦐' },
  { name: 'Huevo', icon: '🥚' },
  { name: 'Soja', icon: '🫘' }
];

/**
 * Opciones comunes para disgustos alimenticios
 */
export const COMMON_DISLIKES = [
  { name: 'Berenjena', icon: '🍆' },
  { name: 'Brócoli', icon: '🥦' },
  { name: 'Pescado', icon: '🐟' },
  { name: 'Hígado', icon: '🥩' },
  { name: 'Espinacas', icon: '🍃' },
  { name: 'Hongos', icon: '🍄' }
];

/**
 * Opciones comunes para condiciones médicas
 */
export const HEALTH_CONDITIONS = [
  { name: 'Diabetes tipo 1', icon: '💉' },
  { name: 'Diabetes tipo 2', icon: '📊' },
  { name: 'Hipertensión', icon: '❤️' },
  { name: 'Celiaquía', icon: '🚫' },
  { name: 'Anemia', icon: '💪' },
  { name: 'Colesterol alto', icon: '🍔' }
];

/**
 * Estilos de tooltip personalizados para cada sección
 */
export const TOOLTIP_DATA = {
  budget: 'Esta información nos ayudará a sugerir recetas dentro de tu presupuesto',
  meals: 'Adapta tus recomendaciones nutricionales a tu horario de comidas diario',
  favorites: 'Conocer tus preferencias nos permite personalizar tus sugerencias',
  habits: 'Esta información nos ayuda a entender tus hábitos alimenticios actuales'
};

/**
 * Mensajes de ayuda para secciones específicas
 */
export const HELP_MESSAGES = {
  budget: 'Establecer un presupuesto nos ayuda a optimizar tus compras y recomendarte opciones económicas sin sacrificar valor nutricional',
  location: 'Tu ubicación nos permite sugerir alimentos y mercados locales cerca de ti',
  activity: 'El nivel de actividad física nos ayuda a calcular tus necesidades calóricas diarias'
};
