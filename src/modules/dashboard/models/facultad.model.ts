
export interface Facultad{
  id_facultad: string
  nombre_facultad: string
  carreras: Carreras[]
}

// export interface CreateUser extends Partial<Omit<User, 'role' | 'branch' | 'gender'>> {
//   roleId?: string
//   branchId?: string
// }


export interface Carreras{
    id_carrera: string
    nombre_carrera: string
  }
export interface UpdateUser { }
