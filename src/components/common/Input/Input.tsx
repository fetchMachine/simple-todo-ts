import type { FC } from 'react';

interface InputProps {
  value: string;
}

export const Input: FC<InputProps> = (obj) => <input value={ obj.value } />
