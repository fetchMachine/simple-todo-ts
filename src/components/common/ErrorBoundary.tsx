import React, { ReactNode } from 'react';

interface ErrorBoundaryProps {
  fallback: ReactNode;
}

export class ErrorBoundary extends React.Component<React.PropsWithChildren<ErrorBoundaryProps>> {
  state = {
    isError: false,
  };

  static getDerivedStateFromError = () => {
    return { isError: true };
  }

  render () {
    return this.state.isError ? this.props.fallback : this.props.children;
  }
}
