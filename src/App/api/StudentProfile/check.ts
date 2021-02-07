import { CheckResults, StudentProfile } from '@watcourses/proto/courses';

import { STUDENT_PROFILE, URL_BASE } from "../consts";
import post from "../http/post";

export default function checkStudentProfile(
  data: StudentProfile,
): Promise<CheckResults> {
  return post(
    `${URL_BASE}${STUDENT_PROFILE}/check`,
    StudentProfile,
    data,
  );
};
