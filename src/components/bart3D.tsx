// import { Canvas } from '@react-three/fiber';

// function Bar({ position, height }: { position: [number, number, number]; height: number }) {
//   return (
//     <mesh position={position}>
//       <boxGeometry args={[1, height, 1]} />
//       <meshStandardMaterial color="orange" />
//     </mesh>
//   );
// }

// export default function BarChart3D({ data }: { data: number[] }) {
//   return (
//     <Canvas camera={{ position: [0, 10, 10], fov: 50 }}>
//       <ambientLight intensity={0.5} />
//       <pointLight position={[10, 10, 10]} />
//       {data.map((value, index) => (
//         <Bar key={index} position={[index * 1.5, value / 2, 0]} height={value} />
//       ))}
//     </Canvas>
//   );
// }
