import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonBarChart() {
  return (
    <div className="h-[400px] w-full flex flex-col items-center space-y-4">
      {/* Contenedor del gráfico */}
      <div className="flex justify-center items-end h-full w-full px-6 space-x-2">
        {/* Simulación de barras del gráfico */}
        {Array.from({ length: 12 }).map((_, index) => {
            // Generar una altura aleatoria entre 160px y 320px
            const randomHeight = Math.floor(Math.random() * (340 - 160 + 1)) + 160;

            return (
                <div key={index} className="">
                <Skeleton
                    className={`w-9`}
                    style={{ height: `${randomHeight}px` }} // Aplicar la altura calculada
                />
                </div>
            );
        })}
      </div>
      {/* Texto que puede estar debajo del gráfico */}
      <Skeleton className="h-8 w-3/4" />
    </div>
  );
}
