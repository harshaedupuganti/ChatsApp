import React, { useEffect } from 'react';
import { X, Download, ZoomIn, ZoomOut } from 'lucide-react';

interface ImageViewerProps {
  imageUrl: string;
  onClose: () => void;
}

/**
 * ImageViewer Component
 * Full-screen image viewer with zoom and download functionality
 */
const ImageViewer: React.FC<ImageViewerProps> = ({ imageUrl, onClose }) => {
  const [zoom, setZoom] = React.useState(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  return (
    <div
      className="image-viewer fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      {/* Controls */}
      <div className="absolute top-4 right-4 flex space-x-2 z-10">
        <button
          onClick={handleZoomOut}
          className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={handleZoomIn}
          className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={handleDownload}
          className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
          aria-label="Download image"
        >
          <Download className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={onClose}
          className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Image */}
      <img
        src={imageUrl}
        alt="Full size view"
        className="max-w-full max-h-full object-contain transition-transform duration-200"
        style={{ transform: `scale(${zoom})` }}
      />

      {/* Zoom indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-20 rounded-full px-3 py-1">
        <span className="text-white text-sm">{Math.round(zoom * 100)}%</span>
      </div>
    </div>
  );
};

export default ImageViewer;