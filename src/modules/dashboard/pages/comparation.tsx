// "use client"

import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
  } from 'recharts'
  
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
  } from '@/components/ui/card'
  import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
  } from '@/components/ui/chart'
  import { useGetAllResource } from '@/hooks/useCrud';
  import { ENDPOINTS } from '@/utils';
  import { useState } from 'react';
import { SkeletonTable } from '@/components/skeleton-table';
import { SkeletonBarChart } from '@/components/skeleton-card1';
  const locadidades: string[] = [
      'SANTA CRUZ',
      'MONTERO',
      'CAMIRI',
      'YAPACANI',
      'SAN JULIAN',
      'VALLEGRANDE',
      'SAN IGNACIO DE VELAS',
      'EL TORNO',
      'ROBORE',
      'COTOCA',
      'PUERTO SUAREZ',
      '4 CANADAS',
      'SAN MATIAS',
      'COMARAPA',
      'MAIRANA',
      'SAN JOSE DE CHIQUITO',
      'LA GUARDIA',
  ]
  export const description = 'A collection of health charts.'
  const Charts = (): JSX.Element => {
      const [selectedPeriod, setSelectedPeriod] = useState('2019-1');
      const [selectedLocation, setSelectedLocation] = useState('SANTA CRUZ');
      const [selectedFaculty, setSelectedFaculty] = useState('05 CIENCIAS EXACTAS Y');
      const [selectedEtiqueta, setSelectedEtiqueta] = useState('Carreras');
      const [selectedCantidad, setSelectedCantidad] = useState('inscarreras');
      const [selectedModalidad, setSelectedModalidad] = useState('presencial');
      const [selectedCantidad2, setSelectedCantidad2] = useState('titulados');
  
      //http://localhost:3000/api/estadisticas-academicas/filter?periodo=2019-1&localidad=SANTA CRUZ&facultad=05 CIENCIAS EXACTAS Y
      const { allResource: allEstadisticas, isLoading} = useGetAllResource(
          `${ENDPOINTS.ESTADISTICA_ACADEMICA}/filter?periodo=${selectedPeriod}&localidad=${selectedLocation}&facultad=${selectedFaculty}&modalidad=${selectedModalidad}&etiquetaFila=${selectedEtiqueta}`
      )
      const { allResource: allFacultades} = useGetAllResource(ENDPOINTS.FACULTAD)
      // const facultad: Facultad[] = allFacultades
      const totalCount = allEstadisticas.reduce((acc: any, data:any) => {
          if (selectedCantidad === 'titulados') {
              return acc + (data.titulados || 0); // Sumamos 'inscritos_localidad'
          } else if (selectedCantidad === 'egresados') {
              return acc + (data.egresados || 0); // Sumamos 'inscritos_facultad'
          } else if (selectedCantidad === 'inscarreras') {
              return acc + (data.t_ins || 0); // Sumamos 't_ins' (inscritos por carreras)
          } else if (selectedCantidad === 'todos') {
                return acc + (data.t_ins || 0); // Sumamos 't_ins' (inscritos por carreras)
          }else if (selectedCantidad === 'retirados') {
              return acc + (data.retirados || 0); // Sumamos 't_ins' (inscritos por carreras)
          } else if (selectedCantidad === 'aprobados') {
                return acc + (data.porcentaje_aprobados || 0); // Sumamos 'inscritos_facultad'
          } else if (selectedCantidad === 'reprobados') {
                return acc + (data.porcentaje_reprobados || 0); // Sumamos 't_ins' (inscritos por carreras)
          } else if (selectedCantidad === 'sinNota') {
                  return acc + (data.porcentaje_sin_nota || 0); // Sumamos 't_ins' (inscritos por carreras)
          }else if (selectedCantidad === 'reprobados0') {
                return acc + (data.porcentaje_reprobados_con_0 || 0); // Sumamos 't_ins' (inscritos por carreras)  
          }else {
              return acc + (data.t_nue || 0); // Por defecto, sumamos 't_nue' (inscritos nuevos)
          }
      }, 0)
      const totalCount2 = allEstadisticas.reduce((acc: any, data: any) => {
        if (selectedCantidad2 === 'titulados') {
            return acc + (data.titulados || 0); // Sumamos 'inscritos_localidad'
        } else if (selectedCantidad2 === 'egresados') {
            return acc + (data.egresados || 0); // Sumamos 'inscritos_facultad'
        } else if (selectedCantidad2 === 'inscarreras') {
            return acc + (data.t_ins || 0); // Sumamos 't_ins' (inscritos por carreras)
        } else if (selectedCantidad2 === 'todos') {
            return acc + (data.t_ins || 0); // Sumamos 't_ins' (inscritos por carreras)
        }else if (selectedCantidad2 === 'retirados') {
            return acc + (data.retirados || 0); // Sumamos 't_ins' (inscritos por carreras)
        } else if (selectedCantidad2 === 'aprobados') {
            return acc + (data.porcentaje_aprobados || 0); // Sumamos 'inscritos_facultad'
        } else if (selectedCantidad2 === 'reprobados') {
            return acc + (data.porcentaje_reprobados || 0); // Sumamos 't_ins' (inscritos por carreras)
        } else if (selectedCantidad2 === 'sinNota') {
              return acc + (data.porcentaje_sin_nota || 0); // Sumamos 't_ins' (inscritos por carreras)
        }else if (selectedCantidad2 === 'reprobados0') {
            return acc + (data.porcentaje_reprobados_con_0 || 0); // Sumamos 't_ins' (inscritos por carreras)  
      
        }else {
            return acc + (data.t_nue || 0); // Por defecto, sumamos 't_nue' (inscritos nuevos)
        }
    }, 0)
      console.log(allEstadisticas)
    return (
      <div className="chart-wrapper mx-auto grid gap-6 p-6 lg:grid-cols-[500px,1fr] sm:p-8">
      <div className="col-span-1 grid gap-6 lg:max-w-[22rem] xl:max-w-[30rem]">
      <Card
            className="" x-chunk="charts-01-chunk-2"
          >
            <div className="p-4 max-w-4xl mx-auto">
        {/* Dropdown filters */}
        <div className="gap-4 mb-4">
          <div >
            <label htmlFor="period" className="block text-sm font-medium">
              Período
            </label>
            <select
              id="period"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="Todas">Todas</option>
              <option value="2019-1">2019-1</option>
              <option value="2019-2">2019-2</option>
              <option value="2020-1">2020-1</option>
              {/* <option value="2020-2">2020-2</option> */}
              
            </select>
          </div>
  
          <div>
            <label htmlFor="location" className="block text-sm font-medium">
              Localidad
            </label>
            <select
              id="locationes"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="Todas">Todas</option>
              {locadidades.map((locadidad, index) => {
                  return <option key={index} value={locadidad}>{locadidad}</option>
              })}
            </select>
          </div>
  
          <div>
            <label htmlFor="faculty" className="block text-sm font-medium">
              Facultad
            </label>
            <select
              id="faculty"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
            >
              <option value="Todas">Todas</option>
              {allFacultades.map((facultad: any, index:number) => {
                  return <option key={index} value={facultad.nombre_facultad}>{facultad.nombre_facultad}</option>
              })}
            </select>
            <div>
              <label htmlFor="faculty" className="block text-sm font-medium">
                  Modalidad
              </label>
              <select
                  id="faculty"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={selectedModalidad}
                  onChange={(e) => setSelectedModalidad(e.target.value)}
              >
                  <option value="Todas">Todas</option>
                  <option value="PRESENCIAL">PRESENCIAL</option>
                  <option value="VIRTUAL">VIRTUAL</option>
              </select>
            </div>
          </div>
        </div>
  
        {/* Tabla de datos */}
        <table className="min-w-full bg-white border border-gray-200 table-fixed dark:bg-slate-800 dark:border-slate-800">
          <thead className="bg-gray-100 border-b w-full dark:bg-slate-800">
            <tr className='w-full"'>
              <th className=" px-2">
                  <label htmlFor="faculty" className="block text-sm font-medium">
                      Etiquetas de fila
                  </label>
                  <select
                      id="faculty"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      value={selectedEtiqueta}
                      onChange={(e) => setSelectedEtiqueta(e.target.value)}
                  >
                      <option value="carreras">Carreras</option>
                      <option value="localidad">Localidad</option>
                      <option value="facultad">Facultad</option>
                      <option value="periodo">Periodo</option>
                      {/* Agregar más facultades aquí */}
                  </select>
              </th>
              <th className="px-2">
                  <label htmlFor="faculty" className="block text-sm font-medium">
                      Cantidad
                  </label>
                  <select
                      id="faculty"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      value={selectedCantidad}
                      onChange={(e) => setSelectedCantidad(e.target.value)}
                  >
                      {/* <option value="inslocalidad">Inscritos x localidades</option> */}
                      {/* <option value="insfacultad">Inscritos x facultades</option> */}
                      <option value="todos">Todos</option>
                      <option value="inscarreras">Inscritos x carreras</option>
                      <option value="newinscritos">Inscritos nuevos</option>
                      <option value="titulados">Titulados</option>
                      <option value="egresados">Egresados</option>
                      <option value="retirados">Retirados</option>
                      <option value="sinNota">%Sin Nota</option>
                      <option value="aprobados">%Aprobados</option>
                      <option value="reprobados">%Reprobados</option>
                      <option value="reprobados0">%Reprobados con 0</option>
                      {/* Agregar más facultades aquí */}
                  </select>
              </th>
              <th className=" px-2">
                  <label htmlFor="faculty" className="block text-sm font-medium">
                      Cantidad
                  </label>
                  <select
                      id="faculty"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      value={selectedCantidad2}
                      onChange={(e) => setSelectedCantidad2(e.target.value)}
                  >
                      {/* <option value="inslocalidad">Inscritos x localidades</option> */}
                      {/* <option value="insfacultad">Inscritos x facultades</option> */}
                      <option value="todos">Todos</option>
                      <option value="inscarreras">Inscritos x carreras</option>
                      <option value="newinscritos">Inscritos nuevos</option>
                      <option value="titulados">Titulados</option>
                      <option value="egresados">Egresados</option>
                      <option value="retirados">Retirados</option>
                      <option value="sinNota">%Sin Nota</option>
                      <option value="aprobados">%Aprobados</option>
                      <option value="reprobados">%Reprobados</option>
                      <option value="reprobados0">%Reprobados con 0</option>

                      {/* <option value="reprobados">%Reprobados</option> */}
                      {/* Agregar más facultades aquí */}
                  </select>
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading?(
                <SkeletonTable rows={12} />
            ):(
                allEstadisticas.map((data: any, index:number) => (
                <tr key={index} className="border-b">
                    {
                        selectedEtiqueta === 'localidad' ? (
                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-white">{data.localidad}</td>
                        ) : selectedEtiqueta === 'facultad' ? (
                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-white">{data.nombre_facultad}</td>
                        ) : selectedEtiqueta === 'periodo' ? (
                                <td className="px-4 py-2 text-sm text-gray-700 dark:text-white">{data.periodo}</td>
                        ) : (
                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-white">{data.nombre_carrera}</td>
                        )
                    }
                    {
                        selectedCantidad === 'titulados' ? (
                            <td className="px-4 py-2 text-sm text-center text-gray-700 dark:text-white">{data.titulados}</td>
                        ) : selectedCantidad === 'egresados' ? (
                            <td className="px-4 py-2 text-sm text-center text-gray-700 dark:text-white">{data.egresados}</td>
                        ) : selectedCantidad === 'inscarreras' ? (
                            <td className="px-4 py-2 text-sm text-center text-gray-700 dark:text-white">{data.t_ins}</td>
                        ) : selectedCantidad === 'todos' ? (
                            <td className="px-4 py-2 text-sm text-center text-gray-700 dark:text-white">{data.t_ins}</td>
                        ) : selectedCantidad === 'retirados' ? (
                            <td className="px-4 py-2 text-sm text-center text-gray-700 dark:text-white">{data.retirados}</td>
                        ) : selectedCantidad === 'sinNota' ? (
                                <td className="px-4 py-2 text-sm text-center text-gray-700 dark:text-white">{data.porcentaje_sin_nota}</td>
                        ) : selectedCantidad === 'aprobados' ? (
                                <td className="px-4 py-2 text-sm text-center text-gray-700 dark:text-white">{data.porcentaje_aprobados}</td>
                        ) : selectedCantidad === 'reprobados' ? (
                                <td className="px-4 py-2 text-sm text-center text-gray-700 dark:text-white">{data.porcentaje_aprobados}</td>  
                        ) : selectedCantidad === 'reprobados0' ? (
                                <td className="px-4 py-2 text-sm text-center text-gray-700 dark:text-white">{data.porcentaje_reprobados_con_0}</td>  
                        ) : (
                            <td className="px-4 py-2 text-sm text-center text-gray-700 dark:text-white">{data.t_nue}</td>
                        )
                    }
                    {
                        selectedCantidad2 === 'titulados' ? (
                            <td className="px-4 py-2 text-sm text-center text-gray-700 dark:text-white">{data.titulados}</td>
                        ) : selectedCantidad2 === 'egresados' ? (
                            <td className="px-4 py-2 text-sm text-center text-gray-700 dark:text-white">{data.egresados}</td>
                        ) : selectedCantidad2 === 'inscarreras' ? (
                            <td className="px-4 py-2 text-sm text-center text-gray-700 dark:text-white">{data.t_ins}</td>
                        ) : selectedCantidad2 === 'todos' ? (
                            <td className="px-4 py-2 text-sm text-center text-gray-700 dark:text-white">{data.t_ins}</td>
                        ) : selectedCantidad2 === 'retirados' ? (
                            <td className="px-4 py-2 text-sm text-center text-gray-700 dark:text-white">{data.retirados}</td>
                        ) : selectedCantidad2 === 'sinNota' ? (
                                <td className="px-4 py-2 text-sm text-center text-gray-700 dark:text-white">{data.porcentaje_sin_nota}</td>
                        ) : selectedCantidad2 === 'aprobados' ? (
                                <td className="px-4 py-2 text-sm text-center text-gray-700 dark:text-white">{data.porcentaje_aprobados}</td>
                        ) : selectedCantidad2 === 'reprobados' ? (
                                <td className="px-4 py-2 text-sm text-center text-gray-700 dark:text-white">{data.porcentaje_aprobados}</td>  
                        ) : selectedCantidad2 === 'reprobados0' ? (
                                <td className="px-4 py-2 text-sm text-center text-gray-700 dark:text-white">{data.porcentaje_reprobados_con_0}</td>  
                        ) : (
                            <td className="px-4 py-2 text-sm text-center text-gray-700 dark:text-white">{data.t_nue}</td>
                        )
                    }
                </tr>
                ))
            )}
            {/* Total general */}
            <tr className="bg-gray-200 font-bold dark:bg-slate-800">
              <td className="px-4 py-2 text-sm">Total general</td>
              <td className="px-4 py-2 text-sm text-center">{totalCount.toLocaleString()}</td>

              {/* <td className="px-4 py-2 text-sm">Total general</td> */}
              <td className="px-4 py-2 text-sm text-center">{totalCount2.toLocaleString()}</td> 
            </tr>
          </tbody>
          </table>
          </div>
          </Card>
          
        </div>
        <div className="col-span-1 grid gap-6">
        {/* <div className="col-span-full sm:col-span-2 grid gap-6"> */}
        <Card className="" x-chunk="charts-01-chunk-0">
          <CardHeader className="space-y-0 pb-2">
              <CardTitle className="tabular-nums">
              {
                selectedCantidad === 'titulados' ? (
                    'Estudiantes Titulados'
                ) : selectedCantidad === 'egresados' ? (
                    'Estudiantes Egresados'
                ) : selectedCantidad === 'inscarreras' ? (
                    'Inscritos por carrera'
                ) : selectedCantidad === 'retirados' ? (
                    'Estudiantes Retirados'
                ) : selectedCantidad === 'todos' ? (
                    'Todos los estudiantes'
                ) : selectedCantidad === 'aprobados' ? (
                    '%Aprobados'
                ) : selectedCantidad === 'reprobados' ? (
                    '%Reprobados'
                ) : selectedCantidad === 'reprobados0' ? (
                    '%Reprobados con 0'
                ) : selectedCantidad === 'sinNota' ? (
                    '%sin Nota'
                ) : (
                    'Inscritos nuevos'
                )
              } VS
              {
                selectedCantidad2 === 'titulados' ? (
                    ' Estudiantes Titulados'
                ) : selectedCantidad2 === 'egresados' ? (
                    ' Estudiantes Egresados'
                ) : selectedCantidad2 === 'inscarreras' ? (
                    ' Inscritos por carrera'
                ) : selectedCantidad2 === 'retirados' ? (
                    ' Estudiantes Retirados'
                ) : selectedCantidad2 === 'todos' ? (
                    ' Todos los estudiantes'
                ) : selectedCantidad2 === 'aprobados' ? (
                    ' %Aprobados'
                ) : selectedCantidad2 === 'reprobados' ? (
                    ' %Reprobados'
                ) : selectedCantidad2 === 'reprobados0' ? (
                    ' %Reprobados con 0'
                ) : selectedCantidad2 === 'sinNota' ? (
                    ' %Sin Nota'
                ) : (
                    ' Inscritos nuevos'
                )
              }
              </CardTitle>
          </CardHeader>
          <CardContent>
              {isLoading?(
                <SkeletonBarChart />
              ):(

                <ChartContainer
                config={{
                    inscritos: {
                        label: 'Inscritos',
                        color: 'hsl(var(--chart-1))'
                    }
                }}
                >
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart
                            accessibilityLayer
                            margin={{
                                left: -4,
                                right: -4,
                            }}
                            data={allEstadisticas.map((data: any) => ({
                                // Mapeo dinámico de las etiquetas
                                etiqueta:
                                selectedEtiqueta === 'localidad'
                                    ? data.localidad
                                    : selectedEtiqueta === 'facultad'
                                    ? data.nombre_facultad
                                    : selectedEtiqueta === 'periodo'
                                    ? data.periodo
                                    : data.nombre_carrera,
                                
                                // Primer valor de inscritos según la primera selección del usuario
                                inscritos1:
                                selectedCantidad === 'titulados'
                                    ? data.titulados
                                    : selectedCantidad === 'egresados'
                                    ? data.egresados
                                    : selectedCantidad === 'inscarreras'
                                    ? data.t_ins
                                    : selectedCantidad === 'todos'
                                    ? data.t_ins
                                    : selectedCantidad === 'retirados'
                                    ? data.retirados
                                    : selectedCantidad === 'aprobados'
                                    ? data.porcentaje_aprobados
                                    : selectedCantidad === 'reprobados'
                                    ? data.porcentaje_reprobados
                                    : selectedCantidad === 'reprobados0'
                                    ? data.porcentaje_reprobados_con_0
                                    : selectedCantidad === 'sinNota'
                                    ? data.porcentaje_sin_nota
                                    : data.t_nue,
                            
                                // Segundo valor de inscritos según la segunda selección del usuario
                                inscritos2:
                                selectedCantidad2 === 'titulados'
                                    ? data.titulados
                                    : selectedCantidad2 === 'egresados'
                                    ? data.egresados
                                    : selectedCantidad2 === 'inscarreras'
                                    ? data.t_ins
                                    : selectedCantidad2 === 'todos'
                                    ? data.t_ins
                                    : selectedCantidad2 === 'retirados'
                                    ? data.retirados
                                    : selectedCantidad2 === 'aprobados'
                                    ? data.porcentaje_aprobados
                                    : selectedCantidad2 === 'reprobados'
                                    ? data.porcentaje_reprobados
                                    : selectedCantidad2 === 'reprobados0'
                                    ? data.porcentaje_reprobados_con_0
                                    : selectedCantidad2 === 'sinNota'
                                    ? data.porcentaje_sin_nota
                                    : data.t_nue,
                            }))}
                            >
                            <XAxis dataKey="etiqueta" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {/* Primera barra (primer conjunto de datos) */}
                            <Bar dataKey="inscritos1" fill="#8884d8" name={selectedCantidad === 'titulados' ? (
                                                                        'Estudiantes Titulados'
                                                                    ) : selectedCantidad === 'egresados' ? (
                                                                        'Estudiantes Egresados'
                                                                    ) : selectedCantidad === 'inscarreras' ? (
                                                                        'Inscritos por carrera'
                                                                    ) : selectedCantidad === 'retirados' ? (
                                                                        'Estudiantes Retirados'
                                                                    ) : selectedCantidad === 'todos' ? (
                                                                        'Todos los estudiantes'
                                                                    ) : selectedCantidad === 'aprobados' ? (
                                                                        'Porcentaje de estudiantes Aprobados'
                                                                    ) : selectedCantidad === 'reprobados' ? (
                                                                        'Porcentaje de estudiantes Reprobados'
                                                                    ) : selectedCantidad === 'sinNota' ? (
                                                                        'Porcentaje de estudiantes sin Nota'
                                                                    ) : selectedCantidad === 'reprobados0' ? (
                                                                        'Porcentaje de estudiantes Reprobados con 0'
                                                                    ) : (
                                                                        'Inscritos nuevos'
                                                                    )} 
                            />
                            {/* Segunda barra (segundo conjunto de datos) */}
                            <Bar dataKey="inscritos2" fill="#82ca9d" name={
                                                selectedCantidad2 === 'titulados' ? (
                                                    'Estudiantes Titulados'
                                                ) : selectedCantidad2 === 'egresados' ? (
                                                    'Estudiantes Egresados'
                                                ) : selectedCantidad2 === 'inscarreras' ? (
                                                    'Inscritos por carrera'
                                                ) : selectedCantidad2 === 'todos' ? (
                                                    'todos los estudiantes'
                                                ) : selectedCantidad2 === 'retirados' ? (
                                                    'Estudiantes Retirados'
                                                ) : selectedCantidad2 === 'aprobados' ? (
                                                    'Porcentaje de estudiantes Aprobados'
                                                ) : selectedCantidad2 === 'reprobados' ? (
                                                    'Porcentaje de estudiantes Reprobados'
                                                ) : selectedCantidad2 === 'sinNota' ? (
                                                    'Porcentaje de estudiantes sin Nota'
                                                ) : selectedCantidad2 === 'reprobados0' ? (
                                                    'Porcentaje de estudiantes Reprobados con 0'
                                                ) : (
                                                    'Inscritos nuevos'
                                                )
                            } />
                        </BarChart>
                    </ResponsiveContainer>
    
    
                </ChartContainer>
              )}
          </CardContent>
          <CardFooter className="flex-col items-start gap-1">
              <CardDescription>
              En el periodo {selectedPeriod} y en la localidad de {selectedLocation}, se han inscritos{' '}
              <span className="font-medium text-foreground">{totalCount}</span> estudiantes.
              </CardDescription>
          </CardFooter>
          </Card>
          <Card className="" x-chunk="charts-01-chunk-7">
              <CardHeader className="space-y-0 pb-0">
                  <CardDescription>
                  {
                    selectedCantidad === 'titulados' ? (
                        'Estudiantes Titulados'
                    ) : selectedCantidad === 'egresados' ? (
                        'Estudiantes Egresados'
                    ) : selectedCantidad === 'inscarreras' ? (
                        'Inscritos por carrera'
                    ) : selectedCantidad === 'retirados' ? (
                        'Estudiantes Retirados'
                    ) : selectedCantidad === 'todos' ? (
                        'Todos los estudiantes'
                    ) : selectedCantidad === 'aprobados' ? (
                        '%Aprobados'
                    ) : selectedCantidad === 'reprobados' ? (
                        '%Reprobados'
                    ) : selectedCantidad === 'reprobados0' ? (
                        '%Reprobados con 0'
                    ) : selectedCantidad === 'sinNota' ? (
                        '%sin Nota'
                    ) : (
                        'Inscritos nuevos'
                    )
                  }
                  </CardDescription>
                  <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                  {totalCount}
                  <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                      estudiantes
                  </span>
                  </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                  {isLoading?(
                    <SkeletonBarChart />
                  ):(

                    <ChartContainer
                    config={{
                        inscritos: {
                        label: 'Inscritos',
                        color: 'hsl(var(--chart-2))',
                        },
                    }}
                    >
                    <ResponsiveContainer width="100%" height={400}>
                        <AreaChart
                        accessibilityLayer
                        data={allEstadisticas.map((data: any) => ({
                            etiqueta:
                            selectedEtiqueta === 'localidad'
                                ? data.localidad
                                : selectedEtiqueta === 'facultad'
                                ? data.nombre_facultad
                                : selectedEtiqueta === 'periodo'
                                ? data.periodo
                                : data.nombre_carrera,
                            inscritos:
                            selectedCantidad === 'inslocalidad'
                                ? data.inscritos_localidad
                                : selectedCantidad === 'insfacultad'
                                ? data.inscritos_facultad
                                : selectedCantidad === 'inscarreras'
                                ? data.t_ins
                                : data.t_nue,
                        }))}
                        margin={{
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 60,
                        }}
                        >
                        {/* Eje X para mostrar las etiquetas (carreras, localidades, etc.) */}
                        <XAxis
                            dataKey="etiqueta"
                            angle={-45}
                            textAnchor="end"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={4}
                        />
                        <YAxis domain={['dataMin - 5', 'dataMax + 2']} hide />
                        <defs>
                            <linearGradient id="fillInscritos" x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="5%"
                                stopColor="var(--color-inscritos)"
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="95%"
                                stopColor="var(--color-inscritos)"
                                stopOpacity={0.1}
                            />
                            </linearGradient>
                        </defs>
                        {/* Gráfico de área para mostrar los inscritos */}
                        <Area
                            dataKey="inscritos"
                            type="natural"
                            fill="url(#fillInscritos)"
                            fillOpacity={0.4}
                            stroke="var(--color-inscritos)"
                        />
                        {/* Tooltip para mostrar los detalles al hacer hover */}
                        <ChartTooltip
                cursor={false}
                content={
                    <ChartTooltipContent
                    labelFormatter={(label) => `Carrera/Facultad: ${label}`} // Aquí mostramos la etiqueta correcta
                    formatter={(value) => (
                        <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                        Inscritos
                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                            {value}
                            <span className="font-normal text-muted-foreground">
                            estudiantes
                            </span>
                        </div>
                        </div>
                    )}
                    />
                }
                />
                        </AreaChart>
                    </ResponsiveContainer>
                    </ChartContainer>
                )}
              </CardContent>
          </Card>
        </div>
      </div>
    )
  }
  
  export default Charts