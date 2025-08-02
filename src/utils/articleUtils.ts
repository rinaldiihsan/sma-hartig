import imageCompression from "browser-image-compression";

export const createSlug = (title: string) =>
  title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

export const compressImage = async (file: File): Promise<File> => {
  const compressedBlob = await imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    fileType: 'image/webp',
    initialQuality: 0.85,
    useWebWorker: true,
  });

  const originalName = file.name.replace(/\.[^/.]+$/, '');
  return new File([compressedBlob], `${originalName}.webp`, {
    type: 'image/webp',
  });
};
