import { StudentProfile } from "@watcourses/proto/courses";
// @ts-ignore
import jsonurl from 'json-url/dist/browser/json-url';
import 'json-url/dist/browser/json-url-lzstring';
import 'json-url/dist/browser/json-url-msgpack';
import 'json-url/dist/browser/json-url-safe64';
import 'json-url/dist/browser/json-url-vendors~lzma';
import 'json-url/dist/browser/json-url-vendors~msgpack';

import { buildProto } from "./buildProto";

const codec = jsonurl('lzma');

const LOCAL_STORAGE_PROFILE_KEY = "STUDENT_PROFILE";

export function saveStudentProfile(studentProfile: StudentProfile) {
  try {
    localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(studentProfile));
  } catch (error) {
    throw error;
  }
}

export async function loadStudentProfile(): Promise<StudentProfile | undefined> {
  try {
    const params = new URLSearchParams(window.location.search);
    const urlState = params.get("schedule");
    if (urlState !== null) {
      return buildProto<StudentProfile>(await codec.decompress(urlState));
    }
    const serializedState = localStorage.getItem(LOCAL_STORAGE_PROFILE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return buildProto<StudentProfile>(JSON.parse(serializedState));
  } catch (err) {
    return undefined;
  }
}

export function getStatePayloadForUrl(studentProfile: StudentProfile): Promise<string> {
  return codec.compress(studentProfile);
}
