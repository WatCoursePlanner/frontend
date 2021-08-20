import { CourseInfo } from '@watcourses/proto/courses';

import { COURSE, URL_BASE } from "../consts";
import get from "../http/get";

export default function getCourse(
  code: string,
): Promise<CourseInfo> {
  return get(
    `${URL_BASE}${COURSE}/${code}`,
    CourseInfo,
  );
};
