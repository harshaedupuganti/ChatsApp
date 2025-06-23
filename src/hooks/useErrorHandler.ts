import { useState, useCallback } from 'react';
import { AppError } from '../types';

/**
 * Custom hook for centralized error handling
 * Provides consistent error management across the application
 */
export const useErrorHandler = () => {
  const [errors, setErrors] = useState<AppError[]>([]);

  const addError = useCallback((code: string, message: string) => {
    const error: AppError = {
      code,
      message,
      timestamp: new Date()
    };
    
    setErrors(prev => [...prev, error]);
    
    // Auto-remove error after 5 seconds
    setTimeout(() => {
      setErrors(prev => prev.filter(e => e.timestamp !== error.timestamp));
    }, 5000);
    
    // Log error for debugging
    console.error(`[${code}] ${message}`, error);
  }, []);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const removeError = useCallback((timestamp: Date) => {
    setErrors(prev => prev.filter(e => e.timestamp !== timestamp));
  }, []);

  return {
    errors,
    addError,
    clearErrors,
    removeError
  };
};