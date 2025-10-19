
import { ImageData } from '../types';

export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      return reject(new Error('File is not an image.'));
    }
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const parseDataUrl = (dataUrl: string): ImageData | null => {
  const match = dataUrl.match(/^data:(.+);base64,(.+)$/);
  if (!match) {
    console.error("Invalid data URL format");
    return null;
  }
  return {
    mimeType: match[1],
    data: match[2],
  };
};
