"use client";

import Spinner from '@/app/_components/Spinner';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ContentLoader = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
      
    useEffect(() => {
      // Inicia el estado de carga al cambiar la ruta
      setLoading(true);
  
      // Simula el tiempo de carga con un timeout para representar la carga de datos
      const timer = setTimeout(() => {
        setLoading(false); // Detiene la carga después del tiempo simulado
      }, 500); // Ajusta el tiempo según tus necesidades
  
      // Cleanup timer on component unmount or route change
      return () => clearTimeout(timer);
    }, [searchParams]); // Depende de la ruta actual
  
    if (loading) {
      return <Spinner />;
    }
  
    return <>{children}</>;
  };

export default ContentLoader;