/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "com.watcourses.wat_courses.proto";

export enum Term {
  SPRING = 0,
  WINTER = 1,
  FALL = 2,
  UNRECOGNIZED = -1,
}

export function termFromJSON(object: any): Term {
  switch (object) {
    case 0:
    case "SPRING":
      return Term.SPRING;
    case 1:
    case "WINTER":
      return Term.WINTER;
    case 2:
    case "FALL":
      return Term.FALL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Term.UNRECOGNIZED;
  }
}

export function termToJSON(object: Term): string {
  switch (object) {
    case Term.SPRING:
      return "SPRING";
    case Term.WINTER:
      return "WINTER";
    case Term.FALL:
      return "FALL";
    default:
      return "UNKNOWN";
  }
}

export enum ConditionType {
  TRUE = 0,
  FALSE = 1,
  AND = 2,
  OR = 3,
  NOT = 4,
  HAS_COURSE = 5,
  HAS_LABEL = 6,
  SATISFIES_LIST = 7,
  UNRECOGNIZED = -1,
}

export function conditionTypeFromJSON(object: any): ConditionType {
  switch (object) {
    case 0:
    case "TRUE":
      return ConditionType.TRUE;
    case 1:
    case "FALSE":
      return ConditionType.FALSE;
    case 2:
    case "AND":
      return ConditionType.AND;
    case 3:
    case "OR":
      return ConditionType.OR;
    case 4:
    case "NOT":
      return ConditionType.NOT;
    case 5:
    case "HAS_COURSE":
      return ConditionType.HAS_COURSE;
    case 6:
    case "HAS_LABEL":
      return ConditionType.HAS_LABEL;
    case 7:
    case "SATISFIES_LIST":
      return ConditionType.SATISFIES_LIST;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ConditionType.UNRECOGNIZED;
  }
}

export function conditionTypeToJSON(object: ConditionType): string {
  switch (object) {
    case ConditionType.TRUE:
      return "TRUE";
    case ConditionType.FALSE:
      return "FALSE";
    case ConditionType.AND:
      return "AND";
    case ConditionType.OR:
      return "OR";
    case ConditionType.NOT:
      return "NOT";
    case ConditionType.HAS_COURSE:
      return "HAS_COURSE";
    case ConditionType.HAS_LABEL:
      return "HAS_LABEL";
    case ConditionType.SATISFIES_LIST:
      return "SATISFIES_LIST";
    default:
      return "UNKNOWN";
  }
}

export enum CoopStream {
  NO_COOP = 0,
  STREAM_4 = 1,
  STREAM_8 = 2,
  UNRECOGNIZED = -1,
}

export function coopStreamFromJSON(object: any): CoopStream {
  switch (object) {
    case 0:
    case "NO_COOP":
      return CoopStream.NO_COOP;
    case 1:
    case "STREAM_4":
      return CoopStream.STREAM_4;
    case 2:
    case "STREAM_8":
      return CoopStream.STREAM_8;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CoopStream.UNRECOGNIZED;
  }
}

export function coopStreamToJSON(object: CoopStream): string {
  switch (object) {
    case CoopStream.NO_COOP:
      return "NO_COOP";
    case CoopStream.STREAM_4:
      return "STREAM_4";
    case CoopStream.STREAM_8:
      return "STREAM_8";
    default:
      return "UNKNOWN";
  }
}

export interface RuleInfo {
  rawString: string;
  logicString: string;
  fullyResolved: boolean;
  json: string;
}

export interface CourseInfo {
  name: string;
  code: string;
  description: string;
  faculty: string;
  offeringTerms: Term[];
  id: string;
  preRequisite: RuleInfo | undefined;
  coRequisite: RuleInfo | undefined;
  antiRequisite: RuleInfo | undefined;
  liked: number;
  useful: number;
  easy: number;
  commentsCount: number;
  ratingsCount: number;
}

export interface CourseList {
  name: string;
  courses: string[];
}

export interface PaginationInfoRequest {
  zeroBasedPage: number;
  limit: number;
}

export interface PaginationInfoResponse {
  totalPages: number;
  currentPage: number;
  limit: number;
  totalResults: number;
}

export interface Sort {
  sortBy: Sort_SortBy;
  order: Sort_Order;
}

export enum Sort_SortBy {
  TITLE = 1,
  CODE = 2,
  UNRECOGNIZED = -1,
}

export function sort_SortByFromJSON(object: any): Sort_SortBy {
  switch (object) {
    case 1:
    case "TITLE":
      return Sort_SortBy.TITLE;
    case 2:
    case "CODE":
      return Sort_SortBy.CODE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Sort_SortBy.UNRECOGNIZED;
  }
}

export function sort_SortByToJSON(object: Sort_SortBy): string {
  switch (object) {
    case Sort_SortBy.TITLE:
      return "TITLE";
    case Sort_SortBy.CODE:
      return "CODE";
    default:
      return "UNKNOWN";
  }
}

export enum Sort_Order {
  ASC = 1,
  DESC = 2,
  UNRECOGNIZED = -1,
}

export function sort_OrderFromJSON(object: any): Sort_Order {
  switch (object) {
    case 1:
    case "ASC":
      return Sort_Order.ASC;
    case 2:
    case "DESC":
      return Sort_Order.DESC;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Sort_Order.UNRECOGNIZED;
  }
}

export function sort_OrderToJSON(object: Sort_Order): string {
  switch (object) {
    case Sort_Order.ASC:
      return "ASC";
    case Sort_Order.DESC:
      return "DESC";
    default:
      return "UNKNOWN";
  }
}

export interface SearchCourseRequest {
  pagination: PaginationInfoRequest | undefined;
  /** if true, do not return requisite info */
  basicInfoOnly: boolean;
  searchQuery: string;
  sort: Sort | undefined;
}

export interface SearchCourseResponse {
  pagination: PaginationInfoResponse | undefined;
  results: CourseInfo[];
}

export interface Schedule {
  terms: Schedule_TermSchedule[];
}

export interface Schedule_TermSchedule {
  courseCodes: string[];
  /** e.g. 1A, 2B */
  termName: string;
  /** e.g. 2020 */
  year: number;
  /** e.g. Spring */
  term: Term;
}

export interface StudentProfile {
  schedule: Schedule | undefined;
  labels: string[];
  degrees: string[];
  shortList: string[];
  ownerEmail: string;
}

export interface CreateStudentProfileRequest {
  degrees: string[];
  startingYear: number;
  /** not used for now. */
  coopStream: CoopStream;
  schedule: Schedule | undefined;
}

export interface CheckResults {
  issues: CheckResults_Issue[];
  checkedCourses: CourseInfo[];
}

export interface CheckResults_Issue {
  type: CheckResults_Issue_Type;
  /** Either the code of the course or the name of the cond */
  subjectName: string;
  /** Condition that failed in the check (string, logical expression). */
  relatedCond: string;
  /** The raw condition, if applicable */
  relatedCondRaw: string;
  /** courses in the cond. */
  relatedCourse: string[];
  /** course list in the cond. */
  relatedCourseList: string[];
}

export enum CheckResults_Issue_Type {
  PRE_REQUISITE_NOT_MET = 1,
  CO_REQUISITE_NOT_MET = 2,
  ANTI_REQUISITE_NOT_MET = 3,
  DEGREE_REQUIREMENTS_NOT_MET = 4,
  UNRECOGNIZED = -1,
}

export function checkResults_Issue_TypeFromJSON(
  object: any
): CheckResults_Issue_Type {
  switch (object) {
    case 1:
    case "PRE_REQUISITE_NOT_MET":
      return CheckResults_Issue_Type.PRE_REQUISITE_NOT_MET;
    case 2:
    case "CO_REQUISITE_NOT_MET":
      return CheckResults_Issue_Type.CO_REQUISITE_NOT_MET;
    case 3:
    case "ANTI_REQUISITE_NOT_MET":
      return CheckResults_Issue_Type.ANTI_REQUISITE_NOT_MET;
    case 4:
    case "DEGREE_REQUIREMENTS_NOT_MET":
      return CheckResults_Issue_Type.DEGREE_REQUIREMENTS_NOT_MET;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CheckResults_Issue_Type.UNRECOGNIZED;
  }
}

export function checkResults_Issue_TypeToJSON(
  object: CheckResults_Issue_Type
): string {
  switch (object) {
    case CheckResults_Issue_Type.PRE_REQUISITE_NOT_MET:
      return "PRE_REQUISITE_NOT_MET";
    case CheckResults_Issue_Type.CO_REQUISITE_NOT_MET:
      return "CO_REQUISITE_NOT_MET";
    case CheckResults_Issue_Type.ANTI_REQUISITE_NOT_MET:
      return "ANTI_REQUISITE_NOT_MET";
    case CheckResults_Issue_Type.DEGREE_REQUIREMENTS_NOT_MET:
      return "DEGREE_REQUIREMENTS_NOT_MET";
    default:
      return "UNKNOWN";
  }
}

export interface FindSlotRequest {
  profile: StudentProfile | undefined;
  courseCode: string;
}

export interface FindSlotResponse {
  /** The term name and check results of the corresponding slot */
  slot: { [key: string]: CheckResults };
}

export interface FindSlotResponse_SlotEntry {
  key: string;
  value: CheckResults | undefined;
}

export interface BatchGetCourseRequest {
  courseCodes: string[];
}

export interface BatchGetCourseResponse {
  results: CourseInfo[];
}

export interface EventRequest {
  type: string;
  subject: string;
  data: string;
}

const baseRuleInfo: object = {
  rawString: "",
  logicString: "",
  fullyResolved: false,
  json: "",
};

export const RuleInfo = {
  encode(message: RuleInfo, writer: Writer = Writer.create()): Writer {
    if (message.rawString !== "") {
      writer.uint32(10).string(message.rawString);
    }
    if (message.logicString !== "") {
      writer.uint32(18).string(message.logicString);
    }
    if (message.fullyResolved === true) {
      writer.uint32(24).bool(message.fullyResolved);
    }
    if (message.json !== "") {
      writer.uint32(34).string(message.json);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RuleInfo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRuleInfo } as RuleInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rawString = reader.string();
          break;
        case 2:
          message.logicString = reader.string();
          break;
        case 3:
          message.fullyResolved = reader.bool();
          break;
        case 4:
          message.json = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RuleInfo {
    const message = { ...baseRuleInfo } as RuleInfo;
    if (object.rawString !== undefined && object.rawString !== null) {
      message.rawString = String(object.rawString);
    } else {
      message.rawString = "";
    }
    if (object.logicString !== undefined && object.logicString !== null) {
      message.logicString = String(object.logicString);
    } else {
      message.logicString = "";
    }
    if (object.fullyResolved !== undefined && object.fullyResolved !== null) {
      message.fullyResolved = Boolean(object.fullyResolved);
    } else {
      message.fullyResolved = false;
    }
    if (object.json !== undefined && object.json !== null) {
      message.json = String(object.json);
    } else {
      message.json = "";
    }
    return message;
  },

  toJSON(message: RuleInfo): unknown {
    const obj: any = {};
    message.rawString !== undefined && (obj.rawString = message.rawString);
    message.logicString !== undefined &&
      (obj.logicString = message.logicString);
    message.fullyResolved !== undefined &&
      (obj.fullyResolved = message.fullyResolved);
    message.json !== undefined && (obj.json = message.json);
    return obj;
  },

  fromPartial(object: DeepPartial<RuleInfo>): RuleInfo {
    const message = { ...baseRuleInfo } as RuleInfo;
    if (object.rawString !== undefined && object.rawString !== null) {
      message.rawString = object.rawString;
    } else {
      message.rawString = "";
    }
    if (object.logicString !== undefined && object.logicString !== null) {
      message.logicString = object.logicString;
    } else {
      message.logicString = "";
    }
    if (object.fullyResolved !== undefined && object.fullyResolved !== null) {
      message.fullyResolved = object.fullyResolved;
    } else {
      message.fullyResolved = false;
    }
    if (object.json !== undefined && object.json !== null) {
      message.json = object.json;
    } else {
      message.json = "";
    }
    return message;
  },
};

const baseCourseInfo: object = {
  name: "",
  code: "",
  description: "",
  faculty: "",
  offeringTerms: 0,
  id: "",
  liked: 0,
  useful: 0,
  easy: 0,
  commentsCount: 0,
  ratingsCount: 0,
};

export const CourseInfo = {
  encode(message: CourseInfo, writer: Writer = Writer.create()): Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.code !== "") {
      writer.uint32(18).string(message.code);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.faculty !== "") {
      writer.uint32(34).string(message.faculty);
    }
    writer.uint32(42).fork();
    for (const v of message.offeringTerms) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.id !== "") {
      writer.uint32(50).string(message.id);
    }
    if (message.preRequisite !== undefined) {
      RuleInfo.encode(message.preRequisite, writer.uint32(58).fork()).ldelim();
    }
    if (message.coRequisite !== undefined) {
      RuleInfo.encode(message.coRequisite, writer.uint32(66).fork()).ldelim();
    }
    if (message.antiRequisite !== undefined) {
      RuleInfo.encode(message.antiRequisite, writer.uint32(74).fork()).ldelim();
    }
    if (message.liked !== 0) {
      writer.uint32(81).double(message.liked);
    }
    if (message.useful !== 0) {
      writer.uint32(89).double(message.useful);
    }
    if (message.easy !== 0) {
      writer.uint32(97).double(message.easy);
    }
    if (message.commentsCount !== 0) {
      writer.uint32(104).int32(message.commentsCount);
    }
    if (message.ratingsCount !== 0) {
      writer.uint32(112).int32(message.ratingsCount);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CourseInfo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCourseInfo } as CourseInfo;
    message.offeringTerms = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.code = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        case 4:
          message.faculty = reader.string();
          break;
        case 5:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.offeringTerms.push(reader.int32() as any);
            }
          } else {
            message.offeringTerms.push(reader.int32() as any);
          }
          break;
        case 6:
          message.id = reader.string();
          break;
        case 7:
          message.preRequisite = RuleInfo.decode(reader, reader.uint32());
          break;
        case 8:
          message.coRequisite = RuleInfo.decode(reader, reader.uint32());
          break;
        case 9:
          message.antiRequisite = RuleInfo.decode(reader, reader.uint32());
          break;
        case 10:
          message.liked = reader.double();
          break;
        case 11:
          message.useful = reader.double();
          break;
        case 12:
          message.easy = reader.double();
          break;
        case 13:
          message.commentsCount = reader.int32();
          break;
        case 14:
          message.ratingsCount = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CourseInfo {
    const message = { ...baseCourseInfo } as CourseInfo;
    message.offeringTerms = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.code !== undefined && object.code !== null) {
      message.code = String(object.code);
    } else {
      message.code = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.faculty !== undefined && object.faculty !== null) {
      message.faculty = String(object.faculty);
    } else {
      message.faculty = "";
    }
    if (object.offeringTerms !== undefined && object.offeringTerms !== null) {
      for (const e of object.offeringTerms) {
        message.offeringTerms.push(termFromJSON(e));
      }
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.preRequisite !== undefined && object.preRequisite !== null) {
      message.preRequisite = RuleInfo.fromJSON(object.preRequisite);
    } else {
      message.preRequisite = undefined;
    }
    if (object.coRequisite !== undefined && object.coRequisite !== null) {
      message.coRequisite = RuleInfo.fromJSON(object.coRequisite);
    } else {
      message.coRequisite = undefined;
    }
    if (object.antiRequisite !== undefined && object.antiRequisite !== null) {
      message.antiRequisite = RuleInfo.fromJSON(object.antiRequisite);
    } else {
      message.antiRequisite = undefined;
    }
    if (object.liked !== undefined && object.liked !== null) {
      message.liked = Number(object.liked);
    } else {
      message.liked = 0;
    }
    if (object.useful !== undefined && object.useful !== null) {
      message.useful = Number(object.useful);
    } else {
      message.useful = 0;
    }
    if (object.easy !== undefined && object.easy !== null) {
      message.easy = Number(object.easy);
    } else {
      message.easy = 0;
    }
    if (object.commentsCount !== undefined && object.commentsCount !== null) {
      message.commentsCount = Number(object.commentsCount);
    } else {
      message.commentsCount = 0;
    }
    if (object.ratingsCount !== undefined && object.ratingsCount !== null) {
      message.ratingsCount = Number(object.ratingsCount);
    } else {
      message.ratingsCount = 0;
    }
    return message;
  },

  toJSON(message: CourseInfo): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.code !== undefined && (obj.code = message.code);
    message.description !== undefined &&
      (obj.description = message.description);
    message.faculty !== undefined && (obj.faculty = message.faculty);
    if (message.offeringTerms) {
      obj.offeringTerms = message.offeringTerms.map((e) => termToJSON(e));
    } else {
      obj.offeringTerms = [];
    }
    message.id !== undefined && (obj.id = message.id);
    message.preRequisite !== undefined &&
      (obj.preRequisite = message.preRequisite
        ? RuleInfo.toJSON(message.preRequisite)
        : undefined);
    message.coRequisite !== undefined &&
      (obj.coRequisite = message.coRequisite
        ? RuleInfo.toJSON(message.coRequisite)
        : undefined);
    message.antiRequisite !== undefined &&
      (obj.antiRequisite = message.antiRequisite
        ? RuleInfo.toJSON(message.antiRequisite)
        : undefined);
    message.liked !== undefined && (obj.liked = message.liked);
    message.useful !== undefined && (obj.useful = message.useful);
    message.easy !== undefined && (obj.easy = message.easy);
    message.commentsCount !== undefined &&
      (obj.commentsCount = message.commentsCount);
    message.ratingsCount !== undefined &&
      (obj.ratingsCount = message.ratingsCount);
    return obj;
  },

  fromPartial(object: DeepPartial<CourseInfo>): CourseInfo {
    const message = { ...baseCourseInfo } as CourseInfo;
    message.offeringTerms = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.code !== undefined && object.code !== null) {
      message.code = object.code;
    } else {
      message.code = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.faculty !== undefined && object.faculty !== null) {
      message.faculty = object.faculty;
    } else {
      message.faculty = "";
    }
    if (object.offeringTerms !== undefined && object.offeringTerms !== null) {
      for (const e of object.offeringTerms) {
        message.offeringTerms.push(e);
      }
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.preRequisite !== undefined && object.preRequisite !== null) {
      message.preRequisite = RuleInfo.fromPartial(object.preRequisite);
    } else {
      message.preRequisite = undefined;
    }
    if (object.coRequisite !== undefined && object.coRequisite !== null) {
      message.coRequisite = RuleInfo.fromPartial(object.coRequisite);
    } else {
      message.coRequisite = undefined;
    }
    if (object.antiRequisite !== undefined && object.antiRequisite !== null) {
      message.antiRequisite = RuleInfo.fromPartial(object.antiRequisite);
    } else {
      message.antiRequisite = undefined;
    }
    if (object.liked !== undefined && object.liked !== null) {
      message.liked = object.liked;
    } else {
      message.liked = 0;
    }
    if (object.useful !== undefined && object.useful !== null) {
      message.useful = object.useful;
    } else {
      message.useful = 0;
    }
    if (object.easy !== undefined && object.easy !== null) {
      message.easy = object.easy;
    } else {
      message.easy = 0;
    }
    if (object.commentsCount !== undefined && object.commentsCount !== null) {
      message.commentsCount = object.commentsCount;
    } else {
      message.commentsCount = 0;
    }
    if (object.ratingsCount !== undefined && object.ratingsCount !== null) {
      message.ratingsCount = object.ratingsCount;
    } else {
      message.ratingsCount = 0;
    }
    return message;
  },
};

const baseCourseList: object = { name: "", courses: "" };

export const CourseList = {
  encode(message: CourseList, writer: Writer = Writer.create()): Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    for (const v of message.courses) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CourseList {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCourseList } as CourseList;
    message.courses = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.courses.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CourseList {
    const message = { ...baseCourseList } as CourseList;
    message.courses = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.courses !== undefined && object.courses !== null) {
      for (const e of object.courses) {
        message.courses.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: CourseList): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    if (message.courses) {
      obj.courses = message.courses.map((e) => e);
    } else {
      obj.courses = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<CourseList>): CourseList {
    const message = { ...baseCourseList } as CourseList;
    message.courses = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.courses !== undefined && object.courses !== null) {
      for (const e of object.courses) {
        message.courses.push(e);
      }
    }
    return message;
  },
};

const basePaginationInfoRequest: object = { zeroBasedPage: 0, limit: 0 };

export const PaginationInfoRequest = {
  encode(
    message: PaginationInfoRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.zeroBasedPage !== 0) {
      writer.uint32(8).int32(message.zeroBasedPage);
    }
    if (message.limit !== 0) {
      writer.uint32(16).int32(message.limit);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): PaginationInfoRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePaginationInfoRequest } as PaginationInfoRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.zeroBasedPage = reader.int32();
          break;
        case 2:
          message.limit = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PaginationInfoRequest {
    const message = { ...basePaginationInfoRequest } as PaginationInfoRequest;
    if (object.zeroBasedPage !== undefined && object.zeroBasedPage !== null) {
      message.zeroBasedPage = Number(object.zeroBasedPage);
    } else {
      message.zeroBasedPage = 0;
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = Number(object.limit);
    } else {
      message.limit = 0;
    }
    return message;
  },

  toJSON(message: PaginationInfoRequest): unknown {
    const obj: any = {};
    message.zeroBasedPage !== undefined &&
      (obj.zeroBasedPage = message.zeroBasedPage);
    message.limit !== undefined && (obj.limit = message.limit);
    return obj;
  },

  fromPartial(
    object: DeepPartial<PaginationInfoRequest>
  ): PaginationInfoRequest {
    const message = { ...basePaginationInfoRequest } as PaginationInfoRequest;
    if (object.zeroBasedPage !== undefined && object.zeroBasedPage !== null) {
      message.zeroBasedPage = object.zeroBasedPage;
    } else {
      message.zeroBasedPage = 0;
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = object.limit;
    } else {
      message.limit = 0;
    }
    return message;
  },
};

const basePaginationInfoResponse: object = {
  totalPages: 0,
  currentPage: 0,
  limit: 0,
  totalResults: 0,
};

export const PaginationInfoResponse = {
  encode(
    message: PaginationInfoResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.totalPages !== 0) {
      writer.uint32(8).int32(message.totalPages);
    }
    if (message.currentPage !== 0) {
      writer.uint32(16).int32(message.currentPage);
    }
    if (message.limit !== 0) {
      writer.uint32(24).int32(message.limit);
    }
    if (message.totalResults !== 0) {
      writer.uint32(32).int32(message.totalResults);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): PaginationInfoResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePaginationInfoResponse } as PaginationInfoResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.totalPages = reader.int32();
          break;
        case 2:
          message.currentPage = reader.int32();
          break;
        case 3:
          message.limit = reader.int32();
          break;
        case 4:
          message.totalResults = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PaginationInfoResponse {
    const message = { ...basePaginationInfoResponse } as PaginationInfoResponse;
    if (object.totalPages !== undefined && object.totalPages !== null) {
      message.totalPages = Number(object.totalPages);
    } else {
      message.totalPages = 0;
    }
    if (object.currentPage !== undefined && object.currentPage !== null) {
      message.currentPage = Number(object.currentPage);
    } else {
      message.currentPage = 0;
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = Number(object.limit);
    } else {
      message.limit = 0;
    }
    if (object.totalResults !== undefined && object.totalResults !== null) {
      message.totalResults = Number(object.totalResults);
    } else {
      message.totalResults = 0;
    }
    return message;
  },

  toJSON(message: PaginationInfoResponse): unknown {
    const obj: any = {};
    message.totalPages !== undefined && (obj.totalPages = message.totalPages);
    message.currentPage !== undefined &&
      (obj.currentPage = message.currentPage);
    message.limit !== undefined && (obj.limit = message.limit);
    message.totalResults !== undefined &&
      (obj.totalResults = message.totalResults);
    return obj;
  },

  fromPartial(
    object: DeepPartial<PaginationInfoResponse>
  ): PaginationInfoResponse {
    const message = { ...basePaginationInfoResponse } as PaginationInfoResponse;
    if (object.totalPages !== undefined && object.totalPages !== null) {
      message.totalPages = object.totalPages;
    } else {
      message.totalPages = 0;
    }
    if (object.currentPage !== undefined && object.currentPage !== null) {
      message.currentPage = object.currentPage;
    } else {
      message.currentPage = 0;
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = object.limit;
    } else {
      message.limit = 0;
    }
    if (object.totalResults !== undefined && object.totalResults !== null) {
      message.totalResults = object.totalResults;
    } else {
      message.totalResults = 0;
    }
    return message;
  },
};

const baseSort: object = { sortBy: 1, order: 1 };

export const Sort = {
  encode(message: Sort, writer: Writer = Writer.create()): Writer {
    if (message.sortBy !== 1) {
      writer.uint32(8).int32(message.sortBy);
    }
    if (message.order !== 1) {
      writer.uint32(16).int32(message.order);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Sort {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSort } as Sort;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sortBy = reader.int32() as any;
          break;
        case 2:
          message.order = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Sort {
    const message = { ...baseSort } as Sort;
    if (object.sortBy !== undefined && object.sortBy !== null) {
      message.sortBy = sort_SortByFromJSON(object.sortBy);
    } else {
      message.sortBy = 1;
    }
    if (object.order !== undefined && object.order !== null) {
      message.order = sort_OrderFromJSON(object.order);
    } else {
      message.order = 1;
    }
    return message;
  },

  toJSON(message: Sort): unknown {
    const obj: any = {};
    message.sortBy !== undefined &&
      (obj.sortBy = sort_SortByToJSON(message.sortBy));
    message.order !== undefined &&
      (obj.order = sort_OrderToJSON(message.order));
    return obj;
  },

  fromPartial(object: DeepPartial<Sort>): Sort {
    const message = { ...baseSort } as Sort;
    if (object.sortBy !== undefined && object.sortBy !== null) {
      message.sortBy = object.sortBy;
    } else {
      message.sortBy = 1;
    }
    if (object.order !== undefined && object.order !== null) {
      message.order = object.order;
    } else {
      message.order = 1;
    }
    return message;
  },
};

const baseSearchCourseRequest: object = {
  basicInfoOnly: false,
  searchQuery: "",
};

export const SearchCourseRequest = {
  encode(
    message: SearchCourseRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PaginationInfoRequest.encode(
        message.pagination,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.basicInfoOnly === true) {
      writer.uint32(16).bool(message.basicInfoOnly);
    }
    if (message.searchQuery !== "") {
      writer.uint32(26).string(message.searchQuery);
    }
    if (message.sort !== undefined) {
      Sort.encode(message.sort, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SearchCourseRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSearchCourseRequest } as SearchCourseRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PaginationInfoRequest.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.basicInfoOnly = reader.bool();
          break;
        case 3:
          message.searchQuery = reader.string();
          break;
        case 4:
          message.sort = Sort.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SearchCourseRequest {
    const message = { ...baseSearchCourseRequest } as SearchCourseRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PaginationInfoRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    if (object.basicInfoOnly !== undefined && object.basicInfoOnly !== null) {
      message.basicInfoOnly = Boolean(object.basicInfoOnly);
    } else {
      message.basicInfoOnly = false;
    }
    if (object.searchQuery !== undefined && object.searchQuery !== null) {
      message.searchQuery = String(object.searchQuery);
    } else {
      message.searchQuery = "";
    }
    if (object.sort !== undefined && object.sort !== null) {
      message.sort = Sort.fromJSON(object.sort);
    } else {
      message.sort = undefined;
    }
    return message;
  },

  toJSON(message: SearchCourseRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PaginationInfoRequest.toJSON(message.pagination)
        : undefined);
    message.basicInfoOnly !== undefined &&
      (obj.basicInfoOnly = message.basicInfoOnly);
    message.searchQuery !== undefined &&
      (obj.searchQuery = message.searchQuery);
    message.sort !== undefined &&
      (obj.sort = message.sort ? Sort.toJSON(message.sort) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<SearchCourseRequest>): SearchCourseRequest {
    const message = { ...baseSearchCourseRequest } as SearchCourseRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PaginationInfoRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    if (object.basicInfoOnly !== undefined && object.basicInfoOnly !== null) {
      message.basicInfoOnly = object.basicInfoOnly;
    } else {
      message.basicInfoOnly = false;
    }
    if (object.searchQuery !== undefined && object.searchQuery !== null) {
      message.searchQuery = object.searchQuery;
    } else {
      message.searchQuery = "";
    }
    if (object.sort !== undefined && object.sort !== null) {
      message.sort = Sort.fromPartial(object.sort);
    } else {
      message.sort = undefined;
    }
    return message;
  },
};

const baseSearchCourseResponse: object = {};

export const SearchCourseResponse = {
  encode(
    message: SearchCourseResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PaginationInfoResponse.encode(
        message.pagination,
        writer.uint32(10).fork()
      ).ldelim();
    }
    for (const v of message.results) {
      CourseInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SearchCourseResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSearchCourseResponse } as SearchCourseResponse;
    message.results = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PaginationInfoResponse.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.results.push(CourseInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SearchCourseResponse {
    const message = { ...baseSearchCourseResponse } as SearchCourseResponse;
    message.results = [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PaginationInfoResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    if (object.results !== undefined && object.results !== null) {
      for (const e of object.results) {
        message.results.push(CourseInfo.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: SearchCourseResponse): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PaginationInfoResponse.toJSON(message.pagination)
        : undefined);
    if (message.results) {
      obj.results = message.results.map((e) =>
        e ? CourseInfo.toJSON(e) : undefined
      );
    } else {
      obj.results = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<SearchCourseResponse>): SearchCourseResponse {
    const message = { ...baseSearchCourseResponse } as SearchCourseResponse;
    message.results = [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PaginationInfoResponse.fromPartial(
        object.pagination
      );
    } else {
      message.pagination = undefined;
    }
    if (object.results !== undefined && object.results !== null) {
      for (const e of object.results) {
        message.results.push(CourseInfo.fromPartial(e));
      }
    }
    return message;
  },
};

const baseSchedule: object = {};

export const Schedule = {
  encode(message: Schedule, writer: Writer = Writer.create()): Writer {
    for (const v of message.terms) {
      Schedule_TermSchedule.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Schedule {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSchedule } as Schedule;
    message.terms = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.terms.push(
            Schedule_TermSchedule.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Schedule {
    const message = { ...baseSchedule } as Schedule;
    message.terms = [];
    if (object.terms !== undefined && object.terms !== null) {
      for (const e of object.terms) {
        message.terms.push(Schedule_TermSchedule.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: Schedule): unknown {
    const obj: any = {};
    if (message.terms) {
      obj.terms = message.terms.map((e) =>
        e ? Schedule_TermSchedule.toJSON(e) : undefined
      );
    } else {
      obj.terms = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Schedule>): Schedule {
    const message = { ...baseSchedule } as Schedule;
    message.terms = [];
    if (object.terms !== undefined && object.terms !== null) {
      for (const e of object.terms) {
        message.terms.push(Schedule_TermSchedule.fromPartial(e));
      }
    }
    return message;
  },
};

const baseSchedule_TermSchedule: object = {
  courseCodes: "",
  termName: "",
  year: 0,
  term: 0,
};

export const Schedule_TermSchedule = {
  encode(
    message: Schedule_TermSchedule,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.courseCodes) {
      writer.uint32(10).string(v!);
    }
    if (message.termName !== "") {
      writer.uint32(18).string(message.termName);
    }
    if (message.year !== 0) {
      writer.uint32(24).int32(message.year);
    }
    if (message.term !== 0) {
      writer.uint32(32).int32(message.term);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Schedule_TermSchedule {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSchedule_TermSchedule } as Schedule_TermSchedule;
    message.courseCodes = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.courseCodes.push(reader.string());
          break;
        case 2:
          message.termName = reader.string();
          break;
        case 3:
          message.year = reader.int32();
          break;
        case 4:
          message.term = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Schedule_TermSchedule {
    const message = { ...baseSchedule_TermSchedule } as Schedule_TermSchedule;
    message.courseCodes = [];
    if (object.courseCodes !== undefined && object.courseCodes !== null) {
      for (const e of object.courseCodes) {
        message.courseCodes.push(String(e));
      }
    }
    if (object.termName !== undefined && object.termName !== null) {
      message.termName = String(object.termName);
    } else {
      message.termName = "";
    }
    if (object.year !== undefined && object.year !== null) {
      message.year = Number(object.year);
    } else {
      message.year = 0;
    }
    if (object.term !== undefined && object.term !== null) {
      message.term = termFromJSON(object.term);
    } else {
      message.term = 0;
    }
    return message;
  },

  toJSON(message: Schedule_TermSchedule): unknown {
    const obj: any = {};
    if (message.courseCodes) {
      obj.courseCodes = message.courseCodes.map((e) => e);
    } else {
      obj.courseCodes = [];
    }
    message.termName !== undefined && (obj.termName = message.termName);
    message.year !== undefined && (obj.year = message.year);
    message.term !== undefined && (obj.term = termToJSON(message.term));
    return obj;
  },

  fromPartial(
    object: DeepPartial<Schedule_TermSchedule>
  ): Schedule_TermSchedule {
    const message = { ...baseSchedule_TermSchedule } as Schedule_TermSchedule;
    message.courseCodes = [];
    if (object.courseCodes !== undefined && object.courseCodes !== null) {
      for (const e of object.courseCodes) {
        message.courseCodes.push(e);
      }
    }
    if (object.termName !== undefined && object.termName !== null) {
      message.termName = object.termName;
    } else {
      message.termName = "";
    }
    if (object.year !== undefined && object.year !== null) {
      message.year = object.year;
    } else {
      message.year = 0;
    }
    if (object.term !== undefined && object.term !== null) {
      message.term = object.term;
    } else {
      message.term = 0;
    }
    return message;
  },
};

const baseStudentProfile: object = {
  labels: "",
  degrees: "",
  shortList: "",
  ownerEmail: "",
};

export const StudentProfile = {
  encode(message: StudentProfile, writer: Writer = Writer.create()): Writer {
    if (message.schedule !== undefined) {
      Schedule.encode(message.schedule, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.labels) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.degrees) {
      writer.uint32(26).string(v!);
    }
    for (const v of message.shortList) {
      writer.uint32(34).string(v!);
    }
    if (message.ownerEmail !== "") {
      writer.uint32(42).string(message.ownerEmail);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): StudentProfile {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStudentProfile } as StudentProfile;
    message.labels = [];
    message.degrees = [];
    message.shortList = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.schedule = Schedule.decode(reader, reader.uint32());
          break;
        case 2:
          message.labels.push(reader.string());
          break;
        case 3:
          message.degrees.push(reader.string());
          break;
        case 4:
          message.shortList.push(reader.string());
          break;
        case 5:
          message.ownerEmail = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StudentProfile {
    const message = { ...baseStudentProfile } as StudentProfile;
    message.labels = [];
    message.degrees = [];
    message.shortList = [];
    if (object.schedule !== undefined && object.schedule !== null) {
      message.schedule = Schedule.fromJSON(object.schedule);
    } else {
      message.schedule = undefined;
    }
    if (object.labels !== undefined && object.labels !== null) {
      for (const e of object.labels) {
        message.labels.push(String(e));
      }
    }
    if (object.degrees !== undefined && object.degrees !== null) {
      for (const e of object.degrees) {
        message.degrees.push(String(e));
      }
    }
    if (object.shortList !== undefined && object.shortList !== null) {
      for (const e of object.shortList) {
        message.shortList.push(String(e));
      }
    }
    if (object.ownerEmail !== undefined && object.ownerEmail !== null) {
      message.ownerEmail = String(object.ownerEmail);
    } else {
      message.ownerEmail = "";
    }
    return message;
  },

  toJSON(message: StudentProfile): unknown {
    const obj: any = {};
    message.schedule !== undefined &&
      (obj.schedule = message.schedule
        ? Schedule.toJSON(message.schedule)
        : undefined);
    if (message.labels) {
      obj.labels = message.labels.map((e) => e);
    } else {
      obj.labels = [];
    }
    if (message.degrees) {
      obj.degrees = message.degrees.map((e) => e);
    } else {
      obj.degrees = [];
    }
    if (message.shortList) {
      obj.shortList = message.shortList.map((e) => e);
    } else {
      obj.shortList = [];
    }
    message.ownerEmail !== undefined && (obj.ownerEmail = message.ownerEmail);
    return obj;
  },

  fromPartial(object: DeepPartial<StudentProfile>): StudentProfile {
    const message = { ...baseStudentProfile } as StudentProfile;
    message.labels = [];
    message.degrees = [];
    message.shortList = [];
    if (object.schedule !== undefined && object.schedule !== null) {
      message.schedule = Schedule.fromPartial(object.schedule);
    } else {
      message.schedule = undefined;
    }
    if (object.labels !== undefined && object.labels !== null) {
      for (const e of object.labels) {
        message.labels.push(e);
      }
    }
    if (object.degrees !== undefined && object.degrees !== null) {
      for (const e of object.degrees) {
        message.degrees.push(e);
      }
    }
    if (object.shortList !== undefined && object.shortList !== null) {
      for (const e of object.shortList) {
        message.shortList.push(e);
      }
    }
    if (object.ownerEmail !== undefined && object.ownerEmail !== null) {
      message.ownerEmail = object.ownerEmail;
    } else {
      message.ownerEmail = "";
    }
    return message;
  },
};

const baseCreateStudentProfileRequest: object = {
  degrees: "",
  startingYear: 0,
  coopStream: 0,
};

export const CreateStudentProfileRequest = {
  encode(
    message: CreateStudentProfileRequest,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.degrees) {
      writer.uint32(10).string(v!);
    }
    if (message.startingYear !== 0) {
      writer.uint32(16).int32(message.startingYear);
    }
    if (message.coopStream !== 0) {
      writer.uint32(24).int32(message.coopStream);
    }
    if (message.schedule !== undefined) {
      Schedule.encode(message.schedule, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): CreateStudentProfileRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseCreateStudentProfileRequest,
    } as CreateStudentProfileRequest;
    message.degrees = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.degrees.push(reader.string());
          break;
        case 2:
          message.startingYear = reader.int32();
          break;
        case 3:
          message.coopStream = reader.int32() as any;
          break;
        case 4:
          message.schedule = Schedule.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateStudentProfileRequest {
    const message = {
      ...baseCreateStudentProfileRequest,
    } as CreateStudentProfileRequest;
    message.degrees = [];
    if (object.degrees !== undefined && object.degrees !== null) {
      for (const e of object.degrees) {
        message.degrees.push(String(e));
      }
    }
    if (object.startingYear !== undefined && object.startingYear !== null) {
      message.startingYear = Number(object.startingYear);
    } else {
      message.startingYear = 0;
    }
    if (object.coopStream !== undefined && object.coopStream !== null) {
      message.coopStream = coopStreamFromJSON(object.coopStream);
    } else {
      message.coopStream = 0;
    }
    if (object.schedule !== undefined && object.schedule !== null) {
      message.schedule = Schedule.fromJSON(object.schedule);
    } else {
      message.schedule = undefined;
    }
    return message;
  },

  toJSON(message: CreateStudentProfileRequest): unknown {
    const obj: any = {};
    if (message.degrees) {
      obj.degrees = message.degrees.map((e) => e);
    } else {
      obj.degrees = [];
    }
    message.startingYear !== undefined &&
      (obj.startingYear = message.startingYear);
    message.coopStream !== undefined &&
      (obj.coopStream = coopStreamToJSON(message.coopStream));
    message.schedule !== undefined &&
      (obj.schedule = message.schedule
        ? Schedule.toJSON(message.schedule)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<CreateStudentProfileRequest>
  ): CreateStudentProfileRequest {
    const message = {
      ...baseCreateStudentProfileRequest,
    } as CreateStudentProfileRequest;
    message.degrees = [];
    if (object.degrees !== undefined && object.degrees !== null) {
      for (const e of object.degrees) {
        message.degrees.push(e);
      }
    }
    if (object.startingYear !== undefined && object.startingYear !== null) {
      message.startingYear = object.startingYear;
    } else {
      message.startingYear = 0;
    }
    if (object.coopStream !== undefined && object.coopStream !== null) {
      message.coopStream = object.coopStream;
    } else {
      message.coopStream = 0;
    }
    if (object.schedule !== undefined && object.schedule !== null) {
      message.schedule = Schedule.fromPartial(object.schedule);
    } else {
      message.schedule = undefined;
    }
    return message;
  },
};

const baseCheckResults: object = {};

export const CheckResults = {
  encode(message: CheckResults, writer: Writer = Writer.create()): Writer {
    for (const v of message.issues) {
      CheckResults_Issue.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.checkedCourses) {
      CourseInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CheckResults {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCheckResults } as CheckResults;
    message.issues = [];
    message.checkedCourses = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.issues.push(
            CheckResults_Issue.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.checkedCourses.push(
            CourseInfo.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CheckResults {
    const message = { ...baseCheckResults } as CheckResults;
    message.issues = [];
    message.checkedCourses = [];
    if (object.issues !== undefined && object.issues !== null) {
      for (const e of object.issues) {
        message.issues.push(CheckResults_Issue.fromJSON(e));
      }
    }
    if (object.checkedCourses !== undefined && object.checkedCourses !== null) {
      for (const e of object.checkedCourses) {
        message.checkedCourses.push(CourseInfo.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: CheckResults): unknown {
    const obj: any = {};
    if (message.issues) {
      obj.issues = message.issues.map((e) =>
        e ? CheckResults_Issue.toJSON(e) : undefined
      );
    } else {
      obj.issues = [];
    }
    if (message.checkedCourses) {
      obj.checkedCourses = message.checkedCourses.map((e) =>
        e ? CourseInfo.toJSON(e) : undefined
      );
    } else {
      obj.checkedCourses = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<CheckResults>): CheckResults {
    const message = { ...baseCheckResults } as CheckResults;
    message.issues = [];
    message.checkedCourses = [];
    if (object.issues !== undefined && object.issues !== null) {
      for (const e of object.issues) {
        message.issues.push(CheckResults_Issue.fromPartial(e));
      }
    }
    if (object.checkedCourses !== undefined && object.checkedCourses !== null) {
      for (const e of object.checkedCourses) {
        message.checkedCourses.push(CourseInfo.fromPartial(e));
      }
    }
    return message;
  },
};

const baseCheckResults_Issue: object = {
  type: 1,
  subjectName: "",
  relatedCond: "",
  relatedCondRaw: "",
  relatedCourse: "",
  relatedCourseList: "",
};

export const CheckResults_Issue = {
  encode(
    message: CheckResults_Issue,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.type !== 1) {
      writer.uint32(8).int32(message.type);
    }
    if (message.subjectName !== "") {
      writer.uint32(18).string(message.subjectName);
    }
    if (message.relatedCond !== "") {
      writer.uint32(26).string(message.relatedCond);
    }
    if (message.relatedCondRaw !== "") {
      writer.uint32(34).string(message.relatedCondRaw);
    }
    for (const v of message.relatedCourse) {
      writer.uint32(42).string(v!);
    }
    for (const v of message.relatedCourseList) {
      writer.uint32(50).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CheckResults_Issue {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCheckResults_Issue } as CheckResults_Issue;
    message.relatedCourse = [];
    message.relatedCourseList = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.subjectName = reader.string();
          break;
        case 3:
          message.relatedCond = reader.string();
          break;
        case 4:
          message.relatedCondRaw = reader.string();
          break;
        case 5:
          message.relatedCourse.push(reader.string());
          break;
        case 6:
          message.relatedCourseList.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CheckResults_Issue {
    const message = { ...baseCheckResults_Issue } as CheckResults_Issue;
    message.relatedCourse = [];
    message.relatedCourseList = [];
    if (object.type !== undefined && object.type !== null) {
      message.type = checkResults_Issue_TypeFromJSON(object.type);
    } else {
      message.type = 1;
    }
    if (object.subjectName !== undefined && object.subjectName !== null) {
      message.subjectName = String(object.subjectName);
    } else {
      message.subjectName = "";
    }
    if (object.relatedCond !== undefined && object.relatedCond !== null) {
      message.relatedCond = String(object.relatedCond);
    } else {
      message.relatedCond = "";
    }
    if (object.relatedCondRaw !== undefined && object.relatedCondRaw !== null) {
      message.relatedCondRaw = String(object.relatedCondRaw);
    } else {
      message.relatedCondRaw = "";
    }
    if (object.relatedCourse !== undefined && object.relatedCourse !== null) {
      for (const e of object.relatedCourse) {
        message.relatedCourse.push(String(e));
      }
    }
    if (
      object.relatedCourseList !== undefined &&
      object.relatedCourseList !== null
    ) {
      for (const e of object.relatedCourseList) {
        message.relatedCourseList.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: CheckResults_Issue): unknown {
    const obj: any = {};
    message.type !== undefined &&
      (obj.type = checkResults_Issue_TypeToJSON(message.type));
    message.subjectName !== undefined &&
      (obj.subjectName = message.subjectName);
    message.relatedCond !== undefined &&
      (obj.relatedCond = message.relatedCond);
    message.relatedCondRaw !== undefined &&
      (obj.relatedCondRaw = message.relatedCondRaw);
    if (message.relatedCourse) {
      obj.relatedCourse = message.relatedCourse.map((e) => e);
    } else {
      obj.relatedCourse = [];
    }
    if (message.relatedCourseList) {
      obj.relatedCourseList = message.relatedCourseList.map((e) => e);
    } else {
      obj.relatedCourseList = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<CheckResults_Issue>): CheckResults_Issue {
    const message = { ...baseCheckResults_Issue } as CheckResults_Issue;
    message.relatedCourse = [];
    message.relatedCourseList = [];
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = 1;
    }
    if (object.subjectName !== undefined && object.subjectName !== null) {
      message.subjectName = object.subjectName;
    } else {
      message.subjectName = "";
    }
    if (object.relatedCond !== undefined && object.relatedCond !== null) {
      message.relatedCond = object.relatedCond;
    } else {
      message.relatedCond = "";
    }
    if (object.relatedCondRaw !== undefined && object.relatedCondRaw !== null) {
      message.relatedCondRaw = object.relatedCondRaw;
    } else {
      message.relatedCondRaw = "";
    }
    if (object.relatedCourse !== undefined && object.relatedCourse !== null) {
      for (const e of object.relatedCourse) {
        message.relatedCourse.push(e);
      }
    }
    if (
      object.relatedCourseList !== undefined &&
      object.relatedCourseList !== null
    ) {
      for (const e of object.relatedCourseList) {
        message.relatedCourseList.push(e);
      }
    }
    return message;
  },
};

const baseFindSlotRequest: object = { courseCode: "" };

export const FindSlotRequest = {
  encode(message: FindSlotRequest, writer: Writer = Writer.create()): Writer {
    if (message.profile !== undefined) {
      StudentProfile.encode(message.profile, writer.uint32(10).fork()).ldelim();
    }
    if (message.courseCode !== "") {
      writer.uint32(18).string(message.courseCode);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): FindSlotRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFindSlotRequest } as FindSlotRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.profile = StudentProfile.decode(reader, reader.uint32());
          break;
        case 2:
          message.courseCode = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FindSlotRequest {
    const message = { ...baseFindSlotRequest } as FindSlotRequest;
    if (object.profile !== undefined && object.profile !== null) {
      message.profile = StudentProfile.fromJSON(object.profile);
    } else {
      message.profile = undefined;
    }
    if (object.courseCode !== undefined && object.courseCode !== null) {
      message.courseCode = String(object.courseCode);
    } else {
      message.courseCode = "";
    }
    return message;
  },

  toJSON(message: FindSlotRequest): unknown {
    const obj: any = {};
    message.profile !== undefined &&
      (obj.profile = message.profile
        ? StudentProfile.toJSON(message.profile)
        : undefined);
    message.courseCode !== undefined && (obj.courseCode = message.courseCode);
    return obj;
  },

  fromPartial(object: DeepPartial<FindSlotRequest>): FindSlotRequest {
    const message = { ...baseFindSlotRequest } as FindSlotRequest;
    if (object.profile !== undefined && object.profile !== null) {
      message.profile = StudentProfile.fromPartial(object.profile);
    } else {
      message.profile = undefined;
    }
    if (object.courseCode !== undefined && object.courseCode !== null) {
      message.courseCode = object.courseCode;
    } else {
      message.courseCode = "";
    }
    return message;
  },
};

const baseFindSlotResponse: object = {};

export const FindSlotResponse = {
  encode(message: FindSlotResponse, writer: Writer = Writer.create()): Writer {
    Object.entries(message.slot).forEach(([key, value]) => {
      FindSlotResponse_SlotEntry.encode(
        { key: key as any, value },
        writer.uint32(10).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): FindSlotResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFindSlotResponse } as FindSlotResponse;
    message.slot = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = FindSlotResponse_SlotEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry1.value !== undefined) {
            message.slot[entry1.key] = entry1.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FindSlotResponse {
    const message = { ...baseFindSlotResponse } as FindSlotResponse;
    message.slot = {};
    if (object.slot !== undefined && object.slot !== null) {
      Object.entries(object.slot).forEach(([key, value]) => {
        message.slot[key] = CheckResults.fromJSON(value);
      });
    }
    return message;
  },

  toJSON(message: FindSlotResponse): unknown {
    const obj: any = {};
    obj.slot = {};
    if (message.slot) {
      Object.entries(message.slot).forEach(([k, v]) => {
        obj.slot[k] = CheckResults.toJSON(v);
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<FindSlotResponse>): FindSlotResponse {
    const message = { ...baseFindSlotResponse } as FindSlotResponse;
    message.slot = {};
    if (object.slot !== undefined && object.slot !== null) {
      Object.entries(object.slot).forEach(([key, value]) => {
        if (value !== undefined) {
          message.slot[key] = CheckResults.fromPartial(value);
        }
      });
    }
    return message;
  },
};

const baseFindSlotResponse_SlotEntry: object = { key: "" };

export const FindSlotResponse_SlotEntry = {
  encode(
    message: FindSlotResponse_SlotEntry,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      CheckResults.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): FindSlotResponse_SlotEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseFindSlotResponse_SlotEntry,
    } as FindSlotResponse_SlotEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = CheckResults.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FindSlotResponse_SlotEntry {
    const message = {
      ...baseFindSlotResponse_SlotEntry,
    } as FindSlotResponse_SlotEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = CheckResults.fromJSON(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },

  toJSON(message: FindSlotResponse_SlotEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value
        ? CheckResults.toJSON(message.value)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<FindSlotResponse_SlotEntry>
  ): FindSlotResponse_SlotEntry {
    const message = {
      ...baseFindSlotResponse_SlotEntry,
    } as FindSlotResponse_SlotEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = CheckResults.fromPartial(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },
};

const baseBatchGetCourseRequest: object = { courseCodes: "" };

export const BatchGetCourseRequest = {
  encode(
    message: BatchGetCourseRequest,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.courseCodes) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): BatchGetCourseRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseBatchGetCourseRequest } as BatchGetCourseRequest;
    message.courseCodes = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.courseCodes.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BatchGetCourseRequest {
    const message = { ...baseBatchGetCourseRequest } as BatchGetCourseRequest;
    message.courseCodes = [];
    if (object.courseCodes !== undefined && object.courseCodes !== null) {
      for (const e of object.courseCodes) {
        message.courseCodes.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: BatchGetCourseRequest): unknown {
    const obj: any = {};
    if (message.courseCodes) {
      obj.courseCodes = message.courseCodes.map((e) => e);
    } else {
      obj.courseCodes = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<BatchGetCourseRequest>
  ): BatchGetCourseRequest {
    const message = { ...baseBatchGetCourseRequest } as BatchGetCourseRequest;
    message.courseCodes = [];
    if (object.courseCodes !== undefined && object.courseCodes !== null) {
      for (const e of object.courseCodes) {
        message.courseCodes.push(e);
      }
    }
    return message;
  },
};

const baseBatchGetCourseResponse: object = {};

export const BatchGetCourseResponse = {
  encode(
    message: BatchGetCourseResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.results) {
      CourseInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): BatchGetCourseResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseBatchGetCourseResponse } as BatchGetCourseResponse;
    message.results = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.results.push(CourseInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BatchGetCourseResponse {
    const message = { ...baseBatchGetCourseResponse } as BatchGetCourseResponse;
    message.results = [];
    if (object.results !== undefined && object.results !== null) {
      for (const e of object.results) {
        message.results.push(CourseInfo.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: BatchGetCourseResponse): unknown {
    const obj: any = {};
    if (message.results) {
      obj.results = message.results.map((e) =>
        e ? CourseInfo.toJSON(e) : undefined
      );
    } else {
      obj.results = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<BatchGetCourseResponse>
  ): BatchGetCourseResponse {
    const message = { ...baseBatchGetCourseResponse } as BatchGetCourseResponse;
    message.results = [];
    if (object.results !== undefined && object.results !== null) {
      for (const e of object.results) {
        message.results.push(CourseInfo.fromPartial(e));
      }
    }
    return message;
  },
};

const baseEventRequest: object = { type: "", subject: "", data: "" };

export const EventRequest = {
  encode(message: EventRequest, writer: Writer = Writer.create()): Writer {
    if (message.type !== "") {
      writer.uint32(10).string(message.type);
    }
    if (message.subject !== "") {
      writer.uint32(18).string(message.subject);
    }
    if (message.data !== "") {
      writer.uint32(26).string(message.data);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EventRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEventRequest } as EventRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.string();
          break;
        case 2:
          message.subject = reader.string();
          break;
        case 3:
          message.data = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventRequest {
    const message = { ...baseEventRequest } as EventRequest;
    if (object.type !== undefined && object.type !== null) {
      message.type = String(object.type);
    } else {
      message.type = "";
    }
    if (object.subject !== undefined && object.subject !== null) {
      message.subject = String(object.subject);
    } else {
      message.subject = "";
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = String(object.data);
    } else {
      message.data = "";
    }
    return message;
  },

  toJSON(message: EventRequest): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = message.type);
    message.subject !== undefined && (obj.subject = message.subject);
    message.data !== undefined && (obj.data = message.data);
    return obj;
  },

  fromPartial(object: DeepPartial<EventRequest>): EventRequest {
    const message = { ...baseEventRequest } as EventRequest;
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = "";
    }
    if (object.subject !== undefined && object.subject !== null) {
      message.subject = object.subject;
    } else {
      message.subject = "";
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = object.data;
    } else {
      message.data = "";
    }
    return message;
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
