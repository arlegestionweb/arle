"use server";

const vercelDeployHook = process.env.VERCEL_DEPLOY_HOOK;

export const deployVercel = () => {
  if (!vercelDeployHook) {
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    fetch(vercelDeployHook, {
      method: "POST",
    });
  }
};
