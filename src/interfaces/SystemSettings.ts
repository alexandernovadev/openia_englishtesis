// Modelo de Configuración del Sistema (SystemSettings)
export interface SystemSettings {
  settingsID: string; // Identificador único de las configuraciones del sistema.
  languageOptions: string[]; // Idiomas disponibles en el sistema.
  defaultLanguage: string; // Idioma predeterminado del sistema.
  examDifficultyLevels: string[]; // Niveles de dificultad disponibles para los exámenes.
  defaultExamDifficulty: string; // Dificultad predeterminada para nuevos exámenes.
  rolesAvailable: string[]; // Roles de usuario disponibles.
  feedbackStatusOptions: string[]; // Opciones de estado para la retroalimentación.
  questionTypes: string[]; // Tipos de preguntas disponibles.
  maxScoreDefault: number; // Puntuación máxima por defecto para exámenes.
  createdAt?: string; // Fecha y hora de creación de la configuración.
  updatedAt?: string; // Fecha y hora de la última actualización de la configuración.
}