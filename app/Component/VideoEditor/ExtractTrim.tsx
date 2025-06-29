// import { FFmpegKit } from 'ffmpeg-kit-react-native';
// import * as FileSystem from 'expo-file-system';

// async function exportTrimmedVideo({
//   videoUri,
//   musicUri,
//   startTime,
//   endTime,
//   musicStartTime,
//   musicEndTime,
// }: {
//   videoUri: string;
//   musicUri: any;
//   startTime: number;
//   endTime: number;
//   musicStartTime: number;
//   musicEndTime: number;
// }) {
//   const outputPath = `${FileSystem.cacheDirectory}final_output.mp4`;
//   const videoDuration = endTime - startTime;
//   const audioDuration = musicEndTime - musicStartTime;

//   const command = `
//     -ss ${startTime} -t ${videoDuration} -i "${videoUri}" 
//     -ss ${musicStartTime} -t ${audioDuration} -i "${musicUri}" 
//     -map 0:v:0 -map 1:a:0 
//     -c:v copy -c:a aac -shortest "${outputPath}"
//   `;

//   await FFmpegKit.executeAsync(command, async (session) => {
//     const returnCode = await session.getReturnCode();

//     if (returnCode.isValueSuccess()) {
//       console.log("✅ Export successful:", outputPath);
//       // share or save
//     } else {
//       console.error("❌ Export failed", await session.getAllLogsAsString());
//     }
//   });
// }
// export default exportTrimmedVideo;