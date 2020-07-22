import {StudentProfileTypes} from './studentProfile';
import {CourseTypes} from "./courses";
import {ProfileCourseTypes} from "./profileCourses";

export type RootAction =
    | StudentProfileTypes
    | CourseTypes
    | ProfileCourseTypes;
