import {RootAction} from "../actions";
import {StudentProfile} from "../../proto/courses_pb";
import {STUDENT_PROFILE_ERROR, STUDENT_PROFILE_INIT, STUDENT_PROFILE_SUCCESS} from "../actions/studentProfile";

export type StudentProfileState = {
  readonly content: StudentProfile.AsObject | null,
  readonly error: string | null,
  readonly loading: boolean,
};

const initialState = {
  content: null,
  error: null,
  loading: false,
};

const studentProfileReducer = (
    state: StudentProfileState = initialState,
    action: RootAction
): StudentProfileState => {

  switch (action.type) {

    case STUDENT_PROFILE_INIT:
      return {...state, loading: true};

    case STUDENT_PROFILE_SUCCESS:
      const studentProfile: StudentProfile.AsObject = action.payload;
      if (studentProfile) {
        return {
          ...state,
          loading: false,
          content: studentProfile,
        };
      }
      return state;

    case STUDENT_PROFILE_ERROR:
      const error: string = action.payload;
      return {
        ...state,
        loading: false,
        error: error,
      };

    default:
      return state;
  }
}

export default studentProfileReducer
