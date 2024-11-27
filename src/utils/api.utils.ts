import { AppConfig } from '../config'

export const ENDPOINTS = {
  // auth
  AUTH: '/auth',
  RESET_PASSWORD: '/api/reset-password',
  RECOVER_PASSWORD: '/api/forgot-password',
  // user
  USER: '/api/users',
  REGISTER: '/auth/register',
  ROLE: '/api/roles',
  PERMISO: '/api/permiso',
  CLIENTES: '/api/clientes',

  RESERVAS: '/api/reservas',
//carreras
  CARRERA: '/api/carreras',
  FACULTAD: '/api/facultades',
  ESTADISTICA_ACADEMICA: '/api/estadisticas-academicas',
  RENDIMINETO_ACADEMICO: '/api/rendimiento-academico',

  // administracion
  BRANCH: '/api/branch',

  // inventario
  PRODUCT: '/api/productos',
  CATEGORY: '/api/categorias',

  LOGIN: '/api/login',
  VERIFY: '/api/checkToken',
  LOGOUT: '/api/logout',
  // RECOVER_PASSWORD: '/api/forgot-password',
  // RESET_PASSWORD: '/api/reset-password',
  STORE: '/api/store',
  STORE_COMMENT: '/api/store-comment'
  // CATEGORY: '/api/category'
}

export const API_BASEURL = AppConfig.API_URL
