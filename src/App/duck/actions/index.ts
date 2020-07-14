import {StudentProfileTypes} from './studentProfile';
import {CourseTypes} from "./courses";

export type RootAction =
    | StudentProfileTypes
    | CourseTypes;
