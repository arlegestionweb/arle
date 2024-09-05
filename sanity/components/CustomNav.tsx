import { Box, Button, Flex, useToast } from "@sanity/ui";
import { useState } from "react";
import { NavbarProps } from "sanity";

const vercelDeployHook = process.env.NEXT_PUBLIC_VERCEL_DEPLOY_HOOK;
export function CustomNavbar(props: NavbarProps) {
  const { renderDefault } = props;
  const toast = useToast();
  const [isDeploying, setIsDeploying] = useState(false);

  const deploySite = async () => {
    if (!vercelDeployHook) {
      toast.push({
        status: 'error',
        title: 'Actualización fallida',
        description: 'Ocurrió un error desconocido',
      });
      return;
    }
    try {
      const response = await fetch(vercelDeployHook, {
        method: 'POST',
      });

      toast.push({
        status: 'success',
        title: 'Página se está actualizando',
        description: 'La página se está actualizando. Por favor espere unos minutos.',
      });
    } catch (error) {
      console.error('Deployment failed:', error);
      toast.push({
        status: 'error',
        title: 'Actualización fallida',
        description: 'Ocurrió un error desconocido',
      });
    }
  };
  const handleDeploy = async () => {
    setIsDeploying(true);
    await deploySite();
    // Re-enable the button after 1 minute
    setTimeout(() => {
      setIsDeploying(false);
    }, 60000); // 60000 ms = 1 minute
  };

  return (
    <Flex align="center">
      <Box flex={1}>
        {renderDefault(props)}
      </Box>
      <Button
        onClick={handleDeploy}
        disabled={isDeploying}

        tone="positive"
        mode="ghost"
        style={{
          height: "100%",
          borderRadius: 0,
        }}
      >
        {isDeploying ? 'Actualizando...' : 'Actualizar Página'}

      </Button>
    </Flex>
  )
}

