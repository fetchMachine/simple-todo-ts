import React, { FC, PropsWithChildren } from 'react';
import css from './styles.module.css';
import cn from 'classnames';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = React.memo(({
  children, onClick, disabled, className
}) => {
  return <button className={ cn(css.btn, className) } onClick={ onClick } disabled={ disabled }>{ children }</button>
})
