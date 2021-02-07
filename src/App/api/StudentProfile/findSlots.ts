import { FindSlotRequest, FindSlotResponse } from '@watcourses/proto/courses';

import { STUDENT_PROFILE, URL_BASE } from "../consts";
import post from "../http/post";

export default function findSlots(
  data: FindSlotRequest
): Promise<FindSlotResponse> {
  return post(
    `${URL_BASE}${STUDENT_PROFILE}/find_slots`,
    FindSlotRequest,
    data,
  );
};
