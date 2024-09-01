const vercelDeployHook = process.env.NEXT_PUBLIC_VERCEL_DEPLOY_HOOK;

export const deployVercel = () => {
  if (!vercelDeployHook) {
    console.error("No Vercel deploy hook found");
    return;
  }

  // if (process.env.NODE_ENV !== "production") {
  // console.log("Deploying to Vercel...");

  fetch(vercelDeployHook, {
    method: "POST",
  });
  // }
};