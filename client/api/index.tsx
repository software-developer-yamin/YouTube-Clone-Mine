import axios from "axios";
import { Video } from "../types";

const base = process.env.NEXT_PUBLIC_API_ENDPOINT;

const userBase = `${base}/api/users`;
const authBase = `${base}/api/auth`;
const videosBase = `${base}/api/videos`;

export async function registerUser(payload: {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
}) {
  const res = await axios.post(userBase, payload);
  return res.data;
}

export async function login(payload: { email: string; password: string }) {
  const res = await axios.post(authBase, payload, {
    withCredentials: true,
  });
  return res.data;
}

export async function getMe() {
  try {
    const res = await axios.get(userBase, {
      withCredentials: true,
    });
    return res.data;
  } catch {
    return null;
  }
}

export async function uploadVideo({
  formData,
  config,
}: {
  formData: FormData;
  config: { onUploadProgress: (progressEvent: any) => void };
}) {
  const res = await axios.post(videosBase, formData, {
    withCredentials: true,
    ...config,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

export function updateVideo({
  videoId,
  ...payload
}: {
  videoId: string;
  title: string;
  description: string;
  published: boolean;
}) {
  return axios.patch<Video>(`${videosBase}/${videoId}`, payload, {
    withCredentials: true,
  });
}

export async function getVideos() {
  const res = await axios.get(videosBase);
  return res.data;
}
