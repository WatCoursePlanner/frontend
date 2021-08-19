import { StudentProfile } from '@watcourses/proto/courses';

import { STUDENT_PROFILE, URL_BASE } from "../consts";
import get from "../http/get";

export default function getDefaultStudentProfile(
  program: string
): Promise<StudentProfile> {
  return get(
    `${URL_BASE}${STUDENT_PROFILE}/default/${program}`,
    StudentProfile
  );
};
