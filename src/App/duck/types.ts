import {StudentProfileState} from "./reducers/studentProfile";
import {CoursesState} from "./reducers/courses";

export type RootState = {
    readonly studentProfile: StudentProfileState,
    readonly courses: CoursesState,
};
