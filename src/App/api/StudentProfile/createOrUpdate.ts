import { StudentProfile } from '@watcourses/proto/courses';

import { STUDENT_PROFILE, URL_BASE } from "../consts";
import post from "../http/post";

export default function createOrUpdateStudentProfile(
  data: StudentProfile
): Promise<StudentProfile> {
  return post(
    `${URL_BASE}${STUDENT_PROFILE}/create-or-update`,
    data,
    StudentProfile,
    StudentProfile,
  );
};
