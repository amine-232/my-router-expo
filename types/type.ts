export type User = {
  name: string;
  surname: string;
  email: string;
  phoneNumber: number;
};
export type UserData = User & {
  userId: string;
};
export interface TypeGetThu {
  setVideoUri: (e: string) => void;
  setEndTime: (e: number) => void;
  setStartTime: (e: number) => void;
  setThumbnails: (e: any[]) => void;
  setVideoDuration: (e: number) => void;
  vUri: string;
  width: number;
  thumbWidth: number;
}

export interface TypeOverlays {
  id: string;
  type: "text" | "emoji";
  content: string;
}

export interface TypeGetAuduration {
  musicUri: string;
  setMaxAudioDuration: (e: any) => void;
}
