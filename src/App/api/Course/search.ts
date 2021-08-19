import { SearchCourseRequest, SearchCourseResponse } from '@watcourses/proto/courses';

import { COURSE, URL_BASE } from "../consts";
import post from "../http/post";

export default function searchCourses(
  data: SearchCourseRequest
): Promise<SearchCourseResponse> {
  return post(
    `${URL_BASE}${COURSE}/search`,
    data,
    SearchCourseRequest,
    SearchCourseResponse,
  );
};
