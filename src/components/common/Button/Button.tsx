import type { FC, PropsWithChildren } from 'react';
import css from './styles.module.css';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  type?: 'alert' | 'submit';
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children, onClick, disabled, type = 'submit'
}) => <button className={ css[type] } onClick={ onClick } disabled={ disabled }>{ children }</button>
