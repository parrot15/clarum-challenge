import React from 'react';

type LoadingSize = 'small' | 'large';

interface LoadingProps {
  size?: LoadingSize;
}

export default function Loading({ size = 'large' }: LoadingProps) {
  const sizeClasses = {
    small: 'h-8 w-8 border-2 border-4 border-blue-200 border-t-blue-500',
    large: 'h-32 w-32 border-t-2 border-b-2 border-blue-500',
  };

  return (
    <div className={`flex justify-center items-center h-full`}>
      <div className={`animate-spin rounded-full ${sizeClasses[size]}`}></div>
    </div>
  );
}
