
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { Spinner } from './components/Spinner';
import { generateHuggingImage } from './services/geminiService';
import { fileToDataUrl, parseDataUrl } from './utils/fileUtils';
import { ImageData } from './types';

const App: React.FC = () => {
  const [image1DataUrl, setImage1DataUrl] = useState<string | null>(null);
  const [image2DataUrl, setImage2DataUrl] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback(async (file: File, setImageDataUrl: React.Dispatch<React.SetStateAction<string | null>>) => {
    setError(null);
    try {
      const dataUrl = await fileToDataUrl(file);
      setImageDataUrl(dataUrl);
    } catch (err) {
      console.error("Error reading file:", err);
      setError("Failed to load image. Please try another file.");
    }
  }, []);

  const handleGenerate = async () => {
    if (!image1DataUrl || !image2DataUrl) {
      setError("Please upload both images before generating.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const image1Parsed = parseDataUrl(image1DataUrl);
      const image2Parsed = parseDataUrl(image2DataUrl);

      if (!image1Parsed || !image2Parsed) {
        throw new Error("Could not parse image data.");
      }

      const resultUrl = await generateHuggingImage(image1Parsed, image2Parsed);
      setGeneratedImage(resultUrl);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      console.error("Generation failed:", err);
      setError(`Generation failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <ImageUploader
              id="image1"
              imageSrc={image1DataUrl}
              onImageUpload={(file) => handleImageUpload(file, setImage1DataUrl)}
              title="First Person"
            />
            <ImageUploader
              id="image2"
              imageSrc={image2DataUrl}
              onImageUpload={(file) => handleImageUpload(file, setImage2DataUrl)}
              title="Second Person"
            />
          </div>

          <div className="text-center mb-8">
            <button
              onClick={handleGenerate}
              disabled={!image1DataUrl || !image2DataUrl || isLoading}
              className="bg-pink-600 hover:bg-pink-700 disabled:bg-pink-900 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center justify-center mx-auto"
            >
              {isLoading ? (
                <>
                  <Spinner />
                  <span className="ml-2">Generating...</span>
                </>
              ) : (
                <>
                  <HeartIcon />
                  <span className="ml-2 text-lg">Generate Hug Image</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-gray-800 border-2 border-dashed border-gray-600 rounded-2xl p-4 md:p-8 min-h-[30rem] flex items-center justify-center">
            {isLoading && (
              <div className="text-center">
                <Spinner large={true} />
                <p className="mt-4 text-lg text-gray-300">AI is working its magic... Please wait.</p>
              </div>
            )}
            {error && (
              <div className="text-center text-red-400">
                <p className="font-bold">An Error Occurred</p>
                <p>{error}</p>
              </div>
            )}
            {!isLoading && !error && generatedImage && (
              <img
                src={generatedImage}
                alt="Generated result"
                className="max-w-full max-h-[80vh] rounded-xl object-contain shadow-2xl"
              />
            )}
            {!isLoading && !error && !generatedImage && (
              <div className="text-center text-gray-500">
                <p className="text-xl">Your generated image will appear here.</p>
                <p>Upload two images and click the generate button to start.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
