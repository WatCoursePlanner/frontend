import { RootState } from "@watcourses/redux/store";
// @ts-ignore
import jsonurl from 'json-url/dist/browser/json-url';
import 'json-url/dist/browser/json-url-lzstring';
import 'json-url/dist/browser/json-url-msgpack';
import 'json-url/dist/browser/json-url-safe64';
import 'json-url/dist/browser/json-url-vendors~lzma';
import 'json-url/dist/browser/json-url-vendors~msgpack';

const codec = jsonurl('lzma')

export function saveState(state: RootState) {
    try {
        localStorage.setItem('state', JSON.stringify(state.studentProfile));
    } catch {
    }
}

// Use `any` here to avoid cyclic reference
export async function loadState(): Promise<any> {
    try {
        const params = new URLSearchParams(window.location.search)
        const urlState = params.get("schedule")
        if (urlState !== null) {
            return {studentProfile: await codec.decompress(urlState)} as RootState
        }
        const serializedState = await localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return {studentProfile: JSON.parse(serializedState)} as RootState;
    } catch (err) {
        return undefined;
    }
}

export function getStatePayloadForUrl(state: RootState): Promise<string> {
    return codec.compress(state.studentProfile)
}
