import React from "react";

type DrawerProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

function Drawer({isOpen, onClose}:DrawerProps) {
  return (
    <div className="fixed z-40 animate-slide-in lg:animate-slide-in-right top-0 left-0 w-screen h-screen bg-white">
      
    </div>
  );
}

export default Drawer;
