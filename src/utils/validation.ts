/**
 * Input validation utilities
 * Provides consistent validation across the application
 */

export const validateMessage = (content: string): boolean => {
  return content.trim().length > 0 && content.length <= 1000;
};

export const validateUser = (user: any): boolean => {
  return (
    user &&
    typeof user.id === 'string' &&
    typeof user.name === 'string' &&
    typeof user.avatar === 'string' &&
    ['online', 'offline', 'away'].includes(user.status)
  );
};

export const validateFileSize = (file: File, maxSizeMB: number = 10): boolean => {
  return file.size <= maxSizeMB * 1024 * 1024;
};

export const validateImageFile = (file: File): boolean => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  return allowedTypes.includes(file.type) && validateFileSize(file, 5);
};

export const validateDocumentFile = (file: File): boolean => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'application/zip',
    'application/x-rar-compressed'
  ];
  return allowedTypes.includes(file.type) && validateFileSize(file, 10);
};