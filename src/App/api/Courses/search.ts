import { SearchCourseRequest, SearchCourseResponse } from '@watcourses/proto/courses';

import { COURSES, URL_BASE } from "../consts";
import post from "../http/post";

export default function searchCourses(
  data: SearchCourseRequest
): Promise<SearchCourseResponse> {
  return post(
    `${URL_BASE}${COURSES}/search`,
    SearchCourseRequest,
    data,
  );
};
