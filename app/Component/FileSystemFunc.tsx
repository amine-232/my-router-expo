// fileSystemUtils.ts
import * as FileSystem from 'expo-file-system';

interface VideoFileInfo {
  exists: boolean;
  uri: string;
}

export const getVideoFileInfo = async (uri: string): Promise<VideoFileInfo> => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(uri);
    return {
      exists: fileInfo.exists,
      uri: fileInfo.uri,
    };
  } catch (error) {
    console.error('Error getting file info:', error);
    return {
      exists: false,
      uri: uri
    };
  }
};

export const ensureDirectoryExists = async (dirUri: string): Promise<void> => {
  const dirInfo = await FileSystem.getInfoAsync(dirUri);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(dirUri, { intermediates: true });
  }
};

export const generateOutputPath = async (extension: string = 'mp4'): Promise<string> => {
  const cacheDir = FileSystem.cacheDirectory;
  if (!cacheDir) {
    throw new Error('Cache directory not available');
  }
  
  await ensureDirectoryExists(cacheDir);
  return `${cacheDir}video_${Date.now()}.${extension}`;
};

export const cleanUri = (uri: string): string => {
  return uri.startsWith('file://') ? uri.substring(7) : uri;
};