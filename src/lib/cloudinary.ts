import { Cloudinary } from "@cloudinary/url-gen";

export interface MemeMetadata {
  title: string;
  description: string;
  creator: string;
  timestamp: number;
  imageUrl: string;
  publicId: string;
}

const STORAGE_KEY = 'meme_warrior_memes';

// Create a Cloudinary instance
export const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  },
  url: {
    secure: true
  }
});

export const uploadToServer = async (
  file: File,
  metadata: Omit<MemeMetadata, 'imageUrl' | 'publicId' | 'timestamp'>
): Promise<MemeMetadata> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '');

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error('Upload failed');
  }

  const data = await response.json();
  const memeData: MemeMetadata = {
    ...metadata,
    timestamp: Date.now(),
    imageUrl: data.secure_url,
    publicId: data.public_id
  };

  const existingMemes = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existingMemes, memeData]));

  return memeData;
};

export const getMemes = (): MemeMetadata[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}; 