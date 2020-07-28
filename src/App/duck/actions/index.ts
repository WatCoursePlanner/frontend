import {StudentProfileTypes} from './studentProfile';
import {CourseTypes} from "./courses";
import {ProfileCourseTypes} from "./profileCourses";
import {SearchTypes} from "./search";

export type RootAction =
    | StudentProfileTypes
    | CourseTypes
    | ProfileCourseTypes
    | SearchTypes;
