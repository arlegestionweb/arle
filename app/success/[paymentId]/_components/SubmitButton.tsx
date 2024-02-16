"use client"
import { useFormStatus } from 'react-dom'
import { create } from 'zustand'
import { DateTime } from 'luxon';

// const 
type TEmailStoreState = {
  lastEmailSent: number | null;
}

type TEmailStoreActions = {
  setLastEmailSent: () => void;
  canClick: () => boolean;
}

type TEmailStore = TEmailStoreState & TEmailStoreActions;


const useEmailSentStore = create<TEmailStore>((set, get) => ({
  lastEmailSent: Number(localStorage.getItem('lastEmailSent')) || null,
  setLastEmailSent: () => set(() => {
    const now = DateTime.local().toMillis();
    localStorage.setItem('lastEmailSent', now.toString());
    return { lastEmailSent: now };
  }),
  canClick: () => {
    const lastEmailSent = localStorage.getItem('lastEmailSent');
    if (!lastEmailSent) return true;
    const diff = DateTime.local().toMillis() - Number(lastEmailSent);
    return diff > 24 * 60 * 60 * 1000; // 24 hours
  },
}));


const SubmitButton = ({ children }: {
  children: React.ReactNode
}) => {
  const { pending, data } = useFormStatus();
  console.log("in button", { pending, data })
  return (
    <button type="submit" aria-disabled={pending || !!data} className='disabled:bg-red-800 disabled:text-yellow-300'>
      {children}
    </button>
  );
}

export default SubmitButton;