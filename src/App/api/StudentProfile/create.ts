import { CreateStudentProfileRequest, StudentProfile } from '@watcourses/proto/courses';

import { STUDENT_PROFILE, URL_BASE } from "../consts";
import post from "../http/post";

export default function createStudentProfile(
  data: CreateStudentProfileRequest
): Promise<StudentProfile> {
  return post(
    `${URL_BASE}${STUDENT_PROFILE}/create`,
    CreateStudentProfileRequest,
    data,
  );
};
