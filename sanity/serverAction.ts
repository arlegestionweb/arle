const vercelDeployHook = process.env.NEXT_PUBLIC_VERCEL_DEPLOY_HOOK;

export const deployToVercel = async (): Promise<{ success: boolean; message: string }> => {
  if (!vercelDeployHook) {
    return { success: false, message: "No Vercel deploy hook found" };
  }

  try {
    const response = await fetch(vercelDeployHook, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return { success: true, message: "Deployment triggered successfully" };
  } catch (error) {
    console.error("Deployment failed:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "An unknown error occurred"
    };
  }
};