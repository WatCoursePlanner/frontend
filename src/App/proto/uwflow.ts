/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "com.watcourses.wat_courses.proto";

export interface UwFlowCourseRating {
  liked: number;
  easy: number;
  useful: number;
  filledCount: number;
  commentCount: number;
}

export interface UwFlowCourse {
  id: number;
  code: string;
  rating: UwFlowCourseRating | undefined;
}

export interface CoursesResponseData {
  course: UwFlowCourse[];
}

export interface CoursesResponse {
  data: CoursesResponseData | undefined;
}

const baseUwFlowCourseRating: object = {
  liked: 0,
  easy: 0,
  useful: 0,
  filledCount: 0,
  commentCount: 0,
};

export const UwFlowCourseRating = {
  encode(
    message: UwFlowCourseRating,
    writer: Writer = Writer.create()
  ): Writer {
    writer.uint32(9).double(message.liked);
    writer.uint32(17).double(message.easy);
    writer.uint32(25).double(message.useful);
    writer.uint32(32).int32(message.filledCount);
    writer.uint32(40).int32(message.commentCount);
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): UwFlowCourseRating {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUwFlowCourseRating } as UwFlowCourseRating;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.liked = reader.double();
          break;
        case 2:
          message.easy = reader.double();
          break;
        case 3:
          message.useful = reader.double();
          break;
        case 4:
          message.filledCount = reader.int32();
          break;
        case 5:
          message.commentCount = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UwFlowCourseRating {
    const message = { ...baseUwFlowCourseRating } as UwFlowCourseRating;
    if (object.liked !== undefined && object.liked !== null) {
      message.liked = Number(object.liked);
    } else {
      message.liked = 0;
    }
    if (object.easy !== undefined && object.easy !== null) {
      message.easy = Number(object.easy);
    } else {
      message.easy = 0;
    }
    if (object.useful !== undefined && object.useful !== null) {
      message.useful = Number(object.useful);
    } else {
      message.useful = 0;
    }
    if (object.filledCount !== undefined && object.filledCount !== null) {
      message.filledCount = Number(object.filledCount);
    } else {
      message.filledCount = 0;
    }
    if (object.commentCount !== undefined && object.commentCount !== null) {
      message.commentCount = Number(object.commentCount);
    } else {
      message.commentCount = 0;
    }
    return message;
  },

  fromPartial(object: DeepPartial<UwFlowCourseRating>): UwFlowCourseRating {
    const message = { ...baseUwFlowCourseRating } as UwFlowCourseRating;
    if (object.liked !== undefined && object.liked !== null) {
      message.liked = object.liked;
    } else {
      message.liked = 0;
    }
    if (object.easy !== undefined && object.easy !== null) {
      message.easy = object.easy;
    } else {
      message.easy = 0;
    }
    if (object.useful !== undefined && object.useful !== null) {
      message.useful = object.useful;
    } else {
      message.useful = 0;
    }
    if (object.filledCount !== undefined && object.filledCount !== null) {
      message.filledCount = object.filledCount;
    } else {
      message.filledCount = 0;
    }
    if (object.commentCount !== undefined && object.commentCount !== null) {
      message.commentCount = object.commentCount;
    } else {
      message.commentCount = 0;
    }
    return message;
  },

  toJSON(message: UwFlowCourseRating): unknown {
    const obj: any = {};
    message.liked !== undefined && (obj.liked = message.liked);
    message.easy !== undefined && (obj.easy = message.easy);
    message.useful !== undefined && (obj.useful = message.useful);
    message.filledCount !== undefined &&
      (obj.filledCount = message.filledCount);
    message.commentCount !== undefined &&
      (obj.commentCount = message.commentCount);
    return obj;
  },
};

const baseUwFlowCourse: object = { id: 0, code: "" };

export const UwFlowCourse = {
  encode(message: UwFlowCourse, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.id);
    writer.uint32(18).string(message.code);
    if (message.rating !== undefined && message.rating !== undefined) {
      UwFlowCourseRating.encode(
        message.rating,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): UwFlowCourse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUwFlowCourse } as UwFlowCourse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
          break;
        case 2:
          message.code = reader.string();
          break;
        case 3:
          message.rating = UwFlowCourseRating.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UwFlowCourse {
    const message = { ...baseUwFlowCourse } as UwFlowCourse;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.code !== undefined && object.code !== null) {
      message.code = String(object.code);
    } else {
      message.code = "";
    }
    if (object.rating !== undefined && object.rating !== null) {
      message.rating = UwFlowCourseRating.fromJSON(object.rating);
    } else {
      message.rating = undefined;
    }
    return message;
  },

  fromPartial(object: DeepPartial<UwFlowCourse>): UwFlowCourse {
    const message = { ...baseUwFlowCourse } as UwFlowCourse;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.code !== undefined && object.code !== null) {
      message.code = object.code;
    } else {
      message.code = "";
    }
    if (object.rating !== undefined && object.rating !== null) {
      message.rating = UwFlowCourseRating.fromPartial(object.rating);
    } else {
      message.rating = undefined;
    }
    return message;
  },

  toJSON(message: UwFlowCourse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.code !== undefined && (obj.code = message.code);
    message.rating !== undefined &&
      (obj.rating = message.rating
        ? UwFlowCourseRating.toJSON(message.rating)
        : undefined);
    return obj;
  },
};

const baseCoursesResponseData: object = {};

export const CoursesResponseData = {
  encode(
    message: CoursesResponseData,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.course) {
      UwFlowCourse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CoursesResponseData {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCoursesResponseData } as CoursesResponseData;
    message.course = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.course.push(UwFlowCourse.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CoursesResponseData {
    const message = { ...baseCoursesResponseData } as CoursesResponseData;
    message.course = [];
    if (object.course !== undefined && object.course !== null) {
      for (const e of object.course) {
        message.course.push(UwFlowCourse.fromJSON(e));
      }
    }
    return message;
  },

  fromPartial(object: DeepPartial<CoursesResponseData>): CoursesResponseData {
    const message = { ...baseCoursesResponseData } as CoursesResponseData;
    message.course = [];
    if (object.course !== undefined && object.course !== null) {
      for (const e of object.course) {
        message.course.push(UwFlowCourse.fromPartial(e));
      }
    }
    return message;
  },

  toJSON(message: CoursesResponseData): unknown {
    const obj: any = {};
    if (message.course) {
      obj.course = message.course.map((e) =>
        e ? UwFlowCourse.toJSON(e) : undefined
      );
    } else {
      obj.course = [];
    }
    return obj;
  },
};

const baseCoursesResponse: object = {};

export const CoursesResponse = {
  encode(message: CoursesResponse, writer: Writer = Writer.create()): Writer {
    if (message.data !== undefined && message.data !== undefined) {
      CoursesResponseData.encode(
        message.data,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CoursesResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCoursesResponse } as CoursesResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = CoursesResponseData.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CoursesResponse {
    const message = { ...baseCoursesResponse } as CoursesResponse;
    if (object.data !== undefined && object.data !== null) {
      message.data = CoursesResponseData.fromJSON(object.data);
    } else {
      message.data = undefined;
    }
    return message;
  },

  fromPartial(object: DeepPartial<CoursesResponse>): CoursesResponse {
    const message = { ...baseCoursesResponse } as CoursesResponse;
    if (object.data !== undefined && object.data !== null) {
      message.data = CoursesResponseData.fromPartial(object.data);
    } else {
      message.data = undefined;
    }
    return message;
  },

  toJSON(message: CoursesResponse): unknown {
    const obj: any = {};
    message.data !== undefined &&
      (obj.data = message.data
        ? CoursesResponseData.toJSON(message.data)
        : undefined);
    return obj;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
