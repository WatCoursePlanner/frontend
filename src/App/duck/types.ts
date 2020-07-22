import {StudentProfileState} from "./reducers/studentProfile";
import {ProfileCoursesState} from "./reducers/profileCourses";
import {CoursesState} from "./reducers/courses";

export type RootState = {
    readonly studentProfile: StudentProfileState,
    readonly profileCourses: ProfileCoursesState,
    readonly courses: CoursesState,
};
