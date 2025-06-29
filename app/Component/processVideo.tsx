import { FFmpegKit } from 'ffmpeg-kit-react-native';

const processVideo = async (inputPath: any, outputPath: any, command: any) => {
  try {
    const session = await FFmpegKit.execute(command);
    const returnCode = await session.getReturnCode();
    
    if (returnCode.isValueSuccess()) {
      return outputPath;
    } else {
      throw new Error('Video processing failed');
    }
  } catch (error) {
    console.error('FFmpeg error:', error);
    throw error;
  }
};

export const applyVideoFilter = async (inputUri: any, filterName: any) => {
  const inputPath = inputUri.startsWith('file://') ? inputUri.substring(7) : inputUri;
  const outputPath = `${inputPath}_${filterName}.mp4`;
  
  let command;
  switch(filterName) {
    case 'sepia':
      command = `-i ${inputPath} -vf "colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131" ${outputPath}`;
      break;
    case 'grayscale':
      command = `-i ${inputPath} -vf "hue=s=0" ${outputPath}`;
      break;
    // Add more filter cases
    default:
      return inputUri;
  }
  
  await processVideo(inputPath, outputPath, command);
  return `file://${outputPath}`;
};

export const trimVideo = async (inputUri: any, startTime: any, endTime: any) => {
  const inputPath = inputUri.startsWith('file://') ? inputUri.substring(7) : inputUri;
  const outputPath = `${inputPath}_trimmed.mp4`;
  
  const command = `-i ${inputPath} -ss ${startTime} -to ${endTime} -c copy ${outputPath}`;
  await processVideo(inputPath, outputPath, command);
  return `file://${outputPath}`;
};