import { Carreras } from "./facultad.model"

export interface RendimientoAcademico
{ 
    nombre_carrera:string
    nombre_facultad: string
    periodo: string
    localidad: string
    modalidad: string
    ppa:number
    pps:number
    ppa1: number
    ppac: number
    id_carrera:  Carreras
    
  }