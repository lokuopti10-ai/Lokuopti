
import React, { useRef } from 'react';

interface ImageUploaderProps {
  id: string;
  imageSrc: string | null;
  onImageUpload: (file: File) => void;
  title: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ id, imageSrc, onImageUpload, title }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4 text-gray-300">{title}</h2>
      <div
        onClick={handleClick}
        className="w-full h-80 bg-gray-800 rounded-2xl border-2 border-dashed border-gray-600 flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-pink-500 hover:bg-gray-700 overflow-hidden relative group"
      >
        <input
          type="file"
          id={id}
          ref={inputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
        />
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Upload preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2">Click to upload image</p>
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-lg font-bold">{imageSrc ? 'Change Image' : 'Upload Image'}</span>
        </div>
      </div>
    </div>
  );
};
