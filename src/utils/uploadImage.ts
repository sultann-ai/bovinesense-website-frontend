import { uploadService } from '../services/uploadService';

export const uploadImage = async (file: File): Promise<string> => {
  try {
    const imageUrl = await uploadService.uploadImage(file);
    return imageUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};