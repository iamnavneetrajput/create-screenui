import React from 'react';

interface ErrorPageProps {
  code: string | number;
  message: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ code, message }) => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex items-center">
        <div className="text-6xl font-semibold text-white">{code}</div>
        <div className="ml-6 pl-6 border-l border-gray-700">
          <p className="text-gray-300">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;