"use client"
import { useFormStatus } from 'react-dom'


const SubmitButton = ({children}: {
  children: React.ReactNode
}) => {
  const { pending } = useFormStatus();
  console.log({pending})
  return (
    <button type="submit" aria-disabled={pending} className='disabled:bg-red-800 disabled:text-yellow-300'>
      {children}
    </button>
  );
}

export default SubmitButton;