import { NavbarProps } from "sanity";
import { useCurrentUser } from "sanity";
import { Box, Button, Flex, useToast } from "@sanity/ui";
import { deployToVercel } from "../serverAction";
import { useCallback, useState } from "react";


export function CustomNavbar(props: NavbarProps) {
  const { renderDefault } = props;
  const currentUser = useCurrentUser();
  const toast = useToast();
  const [isDeploying, setIsDeploying] = useState(false);

  const handleDeploy = useCallback(async () => {
    setIsDeploying(true);
    try {
      await deployToVercel();
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
    } finally {
      // Re-enable the button after 1 minute
      setTimeout(() => {
        setIsDeploying(false);
      }, 60000); // 60000 ms = 1 minute
    }
  }, [toast]);

  return (
    <Flex align="center">
      <Box flex={1}>
        {renderDefault(props)}
      </Box>
      {currentUser && (
        <Button
          onClick={handleDeploy}
          tone="positive"
          mode="ghost"
          // className="font-bold"
          disabled={isDeploying}
          style={{
            margin: 0,
            height: "100%",
            border: "none",
            padding: 0,
            borderRadius: 0,
            fontWeight: "bold",
            // backgroundColor: sanity.color.base.border,
            // color: sanity.color.base.fg,
          }}
        >
          {isDeploying ? 'Actualizando...' : 'Actualizar Página'}
        </Button>
      )}
    </Flex>
  );
}  
