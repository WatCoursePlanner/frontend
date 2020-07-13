/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface CourseInfo {
  name: string;
  code: string;
  description: string;
  faculty: string;
  offeringTerms: Term[];
  id: string;
  preRequisiteLogicStr: string;
  coRequisiteLogicStr: string;
  antiRequisiteLogicStr: string;
  preRequisite: string;
  coRequisite: string;
  antiRequisite: string;
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
}

export interface SearchCourseRequest {
  pagination: PaginationInfoRequest | undefined;
}

export interface SearchCourseResponse {
  pagination: PaginationInfoResponse | undefined;
  results: CourseInfo[];
}

export interface ReParseConditionsResponse {
  total: number;
  success: number;
  succeedResults: { [key: string]: string };
  failedResults: { [key: string]: string };
  dryRun: boolean;
}

export interface ReParseConditionsResponse_SucceedResultsEntry {
  key: string;
  value: string;
}

export interface ReParseConditionsResponse_FailedResultsEntry {
  key: string;
  value: string;
}

export interface Schedule {
  terms: Schedule_TermSchedule[];
}

export interface Schedule_TermSchedule {
  courseCodes: string[];
  /**
   *  e.g. 1A, 2B
   */
  termName: string;
}

export interface StudentProfile {
  schedule: Schedule | undefined;
  labels: string[];
  degrees: string[];
}

export interface CheckResults {
  issues: CheckResults_Issue[];
}

export interface CheckResults_Issue {
  type: CheckResults_Issue_Type;
  /**
   *  Either the code of the course or the name of the cond
   */
  subjectName: string;
  /**
   *  Condition that failed in the check (string, logical expression).
   */
  relatedCond: string;
  /**
   *  The raw condition, if applicable
   */
  relatedCondRaw: string;
  /**
   *  courses in the cond.
   */
  relatedCourse: string[];
  /**
   *  course list in the cond.
   */
  relatedCourseList: string[];
}

export interface ReservedEnrolInfo {
  reserve: string;
  cap: number;
  total: number;
}

export interface CourseSection {
  section: string;
  location: string;
  enrolCap: number;
  enrolTotal: number;
  time: string[];
  room: string;
  instructor: string;
  sectionId: number;
  reservedEnrolInfo: ReservedEnrolInfo[];
}

const baseCourseInfo: object = {
  name: "",
  code: "",
  description: "",
  faculty: "",
  offeringTerms: 0,
  id: "",
  preRequisiteLogicStr: "",
  coRequisiteLogicStr: "",
  antiRequisiteLogicStr: "",
  preRequisite: "",
  coRequisite: "",
  antiRequisite: "",
};

const baseCourseList: object = {
  name: "",
  courses: "",
};

const basePaginationInfoRequest: object = {
  zeroBasedPage: 0,
  limit: 0,
};

const basePaginationInfoResponse: object = {
  totalPages: 0,
  currentPage: 0,
  limit: 0,
};

const baseSearchCourseRequest: object = {
};

const baseSearchCourseResponse: object = {
};

const baseReParseConditionsResponse: object = {
  total: 0,
  success: 0,
  dryRun: false,
};

const baseReParseConditionsResponse_SucceedResultsEntry: object = {
  key: "",
  value: "",
};

const baseReParseConditionsResponse_FailedResultsEntry: object = {
  key: "",
  value: "",
};

const baseSchedule: object = {
};

const baseSchedule_TermSchedule: object = {
  courseCodes: "",
  termName: "",
};

const baseStudentProfile: object = {
  labels: "",
  degrees: "",
};

const baseCheckResults: object = {
};

const baseCheckResults_Issue: object = {
  type: 1,
  subjectName: "",
  relatedCond: "",
  relatedCondRaw: "",
  relatedCourse: "",
  relatedCourseList: "",
};

const baseReservedEnrolInfo: object = {
  reserve: "",
  cap: 0,
  total: 0,
};

const baseCourseSection: object = {
  section: "",
  location: "",
  enrolCap: 0,
  enrolTotal: 0,
  time: "",
  room: "",
  instructor: "",
  sectionId: 0,
};

export const Term = {
  SPRING: 0 as const,
  WINTER: 1 as const,
  FALL: 2 as const,
  UNRECOGNIZED: -1 as const,
  fromJSON(object: any): Term {
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
  },
  toJSON(object: Term): string {
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
  },
}

export type Term = 0 | 1 | 2 | -1;

export const ConditionType = {
  TRUE: 0 as const,
  FALSE: 1 as const,
  AND: 2 as const,
  OR: 3 as const,
  NOT: 4 as const,
  HAS_COURSE: 5 as const,
  HAS_LABEL: 6 as const,
  SATISFIES_LIST: 7 as const,
  UNRECOGNIZED: -1 as const,
  fromJSON(object: any): ConditionType {
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
  },
  toJSON(object: ConditionType): string {
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
  },
}

export type ConditionType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | -1;

export const CheckResults_Issue_Type = {
  PRE_REQUISITE_NOT_MET: 1 as const,
  CO_REQUISITE_NOT_MET: 2 as const,
  ANTI_REQUISITE_NOT_MET: 3 as const,
  DEGREE_REQUIREMENTS_NOT_MET: 4 as const,
  UNRECOGNIZED: -1 as const,
  fromJSON(object: any): CheckResults_Issue_Type {
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
  },
  toJSON(object: CheckResults_Issue_Type): string {
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
  },
}

export type CheckResults_Issue_Type = 1 | 2 | 3 | 4 | -1;

export const CourseInfo = {
  encode(message: CourseInfo, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    writer.uint32(18).string(message.code);
    writer.uint32(26).string(message.description);
    writer.uint32(34).string(message.faculty);
    writer.uint32(42).fork();
    for (const v of message.offeringTerms) {
      writer.int32(v);
    }
    writer.ldelim();
    writer.uint32(50).string(message.id);
    writer.uint32(58).string(message.preRequisiteLogicStr);
    writer.uint32(66).string(message.coRequisiteLogicStr);
    writer.uint32(74).string(message.antiRequisiteLogicStr);
    writer.uint32(82).string(message.preRequisite);
    writer.uint32(90).string(message.coRequisite);
    writer.uint32(98).string(message.antiRequisite);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CourseInfo {
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
          message.preRequisiteLogicStr = reader.string();
          break;
        case 8:
          message.coRequisiteLogicStr = reader.string();
          break;
        case 9:
          message.antiRequisiteLogicStr = reader.string();
          break;
        case 10:
          message.preRequisite = reader.string();
          break;
        case 11:
          message.coRequisite = reader.string();
          break;
        case 12:
          message.antiRequisite = reader.string();
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
        message.offeringTerms.push(Term.fromJSON(e));
      }
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.preRequisiteLogicStr !== undefined && object.preRequisiteLogicStr !== null) {
      message.preRequisiteLogicStr = String(object.preRequisiteLogicStr);
    } else {
      message.preRequisiteLogicStr = "";
    }
    if (object.coRequisiteLogicStr !== undefined && object.coRequisiteLogicStr !== null) {
      message.coRequisiteLogicStr = String(object.coRequisiteLogicStr);
    } else {
      message.coRequisiteLogicStr = "";
    }
    if (object.antiRequisiteLogicStr !== undefined && object.antiRequisiteLogicStr !== null) {
      message.antiRequisiteLogicStr = String(object.antiRequisiteLogicStr);
    } else {
      message.antiRequisiteLogicStr = "";
    }
    if (object.preRequisite !== undefined && object.preRequisite !== null) {
      message.preRequisite = String(object.preRequisite);
    } else {
      message.preRequisite = "";
    }
    if (object.coRequisite !== undefined && object.coRequisite !== null) {
      message.coRequisite = String(object.coRequisite);
    } else {
      message.coRequisite = "";
    }
    if (object.antiRequisite !== undefined && object.antiRequisite !== null) {
      message.antiRequisite = String(object.antiRequisite);
    } else {
      message.antiRequisite = "";
    }
    return message;
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
    if (object.preRequisiteLogicStr !== undefined && object.preRequisiteLogicStr !== null) {
      message.preRequisiteLogicStr = object.preRequisiteLogicStr;
    } else {
      message.preRequisiteLogicStr = "";
    }
    if (object.coRequisiteLogicStr !== undefined && object.coRequisiteLogicStr !== null) {
      message.coRequisiteLogicStr = object.coRequisiteLogicStr;
    } else {
      message.coRequisiteLogicStr = "";
    }
    if (object.antiRequisiteLogicStr !== undefined && object.antiRequisiteLogicStr !== null) {
      message.antiRequisiteLogicStr = object.antiRequisiteLogicStr;
    } else {
      message.antiRequisiteLogicStr = "";
    }
    if (object.preRequisite !== undefined && object.preRequisite !== null) {
      message.preRequisite = object.preRequisite;
    } else {
      message.preRequisite = "";
    }
    if (object.coRequisite !== undefined && object.coRequisite !== null) {
      message.coRequisite = object.coRequisite;
    } else {
      message.coRequisite = "";
    }
    if (object.antiRequisite !== undefined && object.antiRequisite !== null) {
      message.antiRequisite = object.antiRequisite;
    } else {
      message.antiRequisite = "";
    }
    return message;
  },
  toJSON(message: CourseInfo): unknown {
    const obj: any = {};
    obj.name = message.name || "";
    obj.code = message.code || "";
    obj.description = message.description || "";
    obj.faculty = message.faculty || "";
    if (message.offeringTerms) {
      obj.offeringTerms = message.offeringTerms.map(e => Term.toJSON(e));
    } else {
      obj.offeringTerms = [];
    }
    obj.id = message.id || "";
    obj.preRequisiteLogicStr = message.preRequisiteLogicStr || "";
    obj.coRequisiteLogicStr = message.coRequisiteLogicStr || "";
    obj.antiRequisiteLogicStr = message.antiRequisiteLogicStr || "";
    obj.preRequisite = message.preRequisite || "";
    obj.coRequisite = message.coRequisite || "";
    obj.antiRequisite = message.antiRequisite || "";
    return obj;
  },
};

export const CourseList = {
  encode(message: CourseList, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    for (const v of message.courses) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CourseList {
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
  toJSON(message: CourseList): unknown {
    const obj: any = {};
    obj.name = message.name || "";
    if (message.courses) {
      obj.courses = message.courses.map(e => e || "");
    } else {
      obj.courses = [];
    }
    return obj;
  },
};

export const PaginationInfoRequest = {
  encode(message: PaginationInfoRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.zeroBasedPage);
    writer.uint32(16).int32(message.limit);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): PaginationInfoRequest {
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
  fromPartial(object: DeepPartial<PaginationInfoRequest>): PaginationInfoRequest {
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
  toJSON(message: PaginationInfoRequest): unknown {
    const obj: any = {};
    obj.zeroBasedPage = message.zeroBasedPage || 0;
    obj.limit = message.limit || 0;
    return obj;
  },
};

export const PaginationInfoResponse = {
  encode(message: PaginationInfoResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.totalPages);
    writer.uint32(16).int32(message.currentPage);
    writer.uint32(24).int32(message.limit);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): PaginationInfoResponse {
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
    return message;
  },
  fromPartial(object: DeepPartial<PaginationInfoResponse>): PaginationInfoResponse {
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
    return message;
  },
  toJSON(message: PaginationInfoResponse): unknown {
    const obj: any = {};
    obj.totalPages = message.totalPages || 0;
    obj.currentPage = message.currentPage || 0;
    obj.limit = message.limit || 0;
    return obj;
  },
};

export const SearchCourseRequest = {
  encode(message: SearchCourseRequest, writer: Writer = Writer.create()): Writer {
    if (message.pagination !== undefined && message.pagination !== undefined) {
      PaginationInfoRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): SearchCourseRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSearchCourseRequest } as SearchCourseRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PaginationInfoRequest.decode(reader, reader.uint32());
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
    return message;
  },
  fromPartial(object: DeepPartial<SearchCourseRequest>): SearchCourseRequest {
    const message = { ...baseSearchCourseRequest } as SearchCourseRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PaginationInfoRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
  toJSON(message: SearchCourseRequest): unknown {
    const obj: any = {};
    obj.pagination = message.pagination ? PaginationInfoRequest.toJSON(message.pagination) : undefined;
    return obj;
  },
};

export const SearchCourseResponse = {
  encode(message: SearchCourseResponse, writer: Writer = Writer.create()): Writer {
    if (message.pagination !== undefined && message.pagination !== undefined) {
      PaginationInfoResponse.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.results) {
      CourseInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): SearchCourseResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSearchCourseResponse } as SearchCourseResponse;
    message.results = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PaginationInfoResponse.decode(reader, reader.uint32());
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
  fromPartial(object: DeepPartial<SearchCourseResponse>): SearchCourseResponse {
    const message = { ...baseSearchCourseResponse } as SearchCourseResponse;
    message.results = [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PaginationInfoResponse.fromPartial(object.pagination);
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
  toJSON(message: SearchCourseResponse): unknown {
    const obj: any = {};
    obj.pagination = message.pagination ? PaginationInfoResponse.toJSON(message.pagination) : undefined;
    if (message.results) {
      obj.results = message.results.map(e => e ? CourseInfo.toJSON(e) : undefined);
    } else {
      obj.results = [];
    }
    return obj;
  },
};

export const ReParseConditionsResponse = {
  encode(message: ReParseConditionsResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.total);
    writer.uint32(16).int32(message.success);
    Object.entries(message.succeedResults).forEach(([key, value]) => {
      ReParseConditionsResponse_SucceedResultsEntry.encode({ key: key as any, value }, writer.uint32(26).fork()).ldelim();
    })
    Object.entries(message.failedResults).forEach(([key, value]) => {
      ReParseConditionsResponse_FailedResultsEntry.encode({ key: key as any, value }, writer.uint32(34).fork()).ldelim();
    })
    writer.uint32(40).bool(message.dryRun);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ReParseConditionsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseReParseConditionsResponse } as ReParseConditionsResponse;
    message.succeedResults = {};
    message.failedResults = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.total = reader.int32();
          break;
        case 2:
          message.success = reader.int32();
          break;
        case 3:
          const entry3 = ReParseConditionsResponse_SucceedResultsEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.succeedResults[entry3.key] = entry3.value;
          }
          break;
        case 4:
          const entry4 = ReParseConditionsResponse_FailedResultsEntry.decode(reader, reader.uint32());
          if (entry4.value !== undefined) {
            message.failedResults[entry4.key] = entry4.value;
          }
          break;
        case 5:
          message.dryRun = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ReParseConditionsResponse {
    const message = { ...baseReParseConditionsResponse } as ReParseConditionsResponse;
    message.succeedResults = {};
    message.failedResults = {};
    if (object.total !== undefined && object.total !== null) {
      message.total = Number(object.total);
    } else {
      message.total = 0;
    }
    if (object.success !== undefined && object.success !== null) {
      message.success = Number(object.success);
    } else {
      message.success = 0;
    }
    if (object.succeedResults !== undefined && object.succeedResults !== null) {
      Object.entries(object.succeedResults).forEach(([key, value]) => {
        message.succeedResults[key] = String(value);
      })
    }
    if (object.failedResults !== undefined && object.failedResults !== null) {
      Object.entries(object.failedResults).forEach(([key, value]) => {
        message.failedResults[key] = String(value);
      })
    }
    if (object.dryRun !== undefined && object.dryRun !== null) {
      message.dryRun = Boolean(object.dryRun);
    } else {
      message.dryRun = false;
    }
    return message;
  },
  fromPartial(object: DeepPartial<ReParseConditionsResponse>): ReParseConditionsResponse {
    const message = { ...baseReParseConditionsResponse } as ReParseConditionsResponse;
    message.succeedResults = {};
    message.failedResults = {};
    if (object.total !== undefined && object.total !== null) {
      message.total = object.total;
    } else {
      message.total = 0;
    }
    if (object.success !== undefined && object.success !== null) {
      message.success = object.success;
    } else {
      message.success = 0;
    }
    if (object.succeedResults !== undefined && object.succeedResults !== null) {
      Object.entries(object.succeedResults).forEach(([key, value]) => {
        if (value !== undefined) {
          message.succeedResults[key] = String(value);
        }
      })
    }
    if (object.failedResults !== undefined && object.failedResults !== null) {
      Object.entries(object.failedResults).forEach(([key, value]) => {
        if (value !== undefined) {
          message.failedResults[key] = String(value);
        }
      })
    }
    if (object.dryRun !== undefined && object.dryRun !== null) {
      message.dryRun = object.dryRun;
    } else {
      message.dryRun = false;
    }
    return message;
  },
  toJSON(message: ReParseConditionsResponse): unknown {
    const obj: any = {};
    obj.total = message.total || 0;
    obj.success = message.success || 0;
    obj.succeedResults = message.succeedResults || undefined;
    obj.failedResults = message.failedResults || undefined;
    obj.dryRun = message.dryRun || false;
    return obj;
  },
};

export const ReParseConditionsResponse_SucceedResultsEntry = {
  encode(message: ReParseConditionsResponse_SucceedResultsEntry, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.key);
    writer.uint32(18).string(message.value);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ReParseConditionsResponse_SucceedResultsEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseReParseConditionsResponse_SucceedResultsEntry } as ReParseConditionsResponse_SucceedResultsEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ReParseConditionsResponse_SucceedResultsEntry {
    const message = { ...baseReParseConditionsResponse_SucceedResultsEntry } as ReParseConditionsResponse_SucceedResultsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    } else {
      message.value = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<ReParseConditionsResponse_SucceedResultsEntry>): ReParseConditionsResponse_SucceedResultsEntry {
    const message = { ...baseReParseConditionsResponse_SucceedResultsEntry } as ReParseConditionsResponse_SucceedResultsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = "";
    }
    return message;
  },
  toJSON(message: ReParseConditionsResponse_SucceedResultsEntry): unknown {
    const obj: any = {};
    obj.key = message.key || "";
    obj.value = message.value || "";
    return obj;
  },
};

export const ReParseConditionsResponse_FailedResultsEntry = {
  encode(message: ReParseConditionsResponse_FailedResultsEntry, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.key);
    writer.uint32(18).string(message.value);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ReParseConditionsResponse_FailedResultsEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseReParseConditionsResponse_FailedResultsEntry } as ReParseConditionsResponse_FailedResultsEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ReParseConditionsResponse_FailedResultsEntry {
    const message = { ...baseReParseConditionsResponse_FailedResultsEntry } as ReParseConditionsResponse_FailedResultsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    } else {
      message.value = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<ReParseConditionsResponse_FailedResultsEntry>): ReParseConditionsResponse_FailedResultsEntry {
    const message = { ...baseReParseConditionsResponse_FailedResultsEntry } as ReParseConditionsResponse_FailedResultsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = "";
    }
    return message;
  },
  toJSON(message: ReParseConditionsResponse_FailedResultsEntry): unknown {
    const obj: any = {};
    obj.key = message.key || "";
    obj.value = message.value || "";
    return obj;
  },
};

export const Schedule = {
  encode(message: Schedule, writer: Writer = Writer.create()): Writer {
    for (const v of message.terms) {
      Schedule_TermSchedule.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Schedule {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSchedule } as Schedule;
    message.terms = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.terms.push(Schedule_TermSchedule.decode(reader, reader.uint32()));
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
  toJSON(message: Schedule): unknown {
    const obj: any = {};
    if (message.terms) {
      obj.terms = message.terms.map(e => e ? Schedule_TermSchedule.toJSON(e) : undefined);
    } else {
      obj.terms = [];
    }
    return obj;
  },
};

export const Schedule_TermSchedule = {
  encode(message: Schedule_TermSchedule, writer: Writer = Writer.create()): Writer {
    for (const v of message.courseCodes) {
      writer.uint32(10).string(v!);
    }
    writer.uint32(18).string(message.termName);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Schedule_TermSchedule {
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
    return message;
  },
  fromPartial(object: DeepPartial<Schedule_TermSchedule>): Schedule_TermSchedule {
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
    return message;
  },
  toJSON(message: Schedule_TermSchedule): unknown {
    const obj: any = {};
    if (message.courseCodes) {
      obj.courseCodes = message.courseCodes.map(e => e || "");
    } else {
      obj.courseCodes = [];
    }
    obj.termName = message.termName || "";
    return obj;
  },
};

export const StudentProfile = {
  encode(message: StudentProfile, writer: Writer = Writer.create()): Writer {
    if (message.schedule !== undefined && message.schedule !== undefined) {
      Schedule.encode(message.schedule, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.labels) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.degrees) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): StudentProfile {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStudentProfile } as StudentProfile;
    message.labels = [];
    message.degrees = [];
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
    return message;
  },
  fromPartial(object: DeepPartial<StudentProfile>): StudentProfile {
    const message = { ...baseStudentProfile } as StudentProfile;
    message.labels = [];
    message.degrees = [];
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
    return message;
  },
  toJSON(message: StudentProfile): unknown {
    const obj: any = {};
    obj.schedule = message.schedule ? Schedule.toJSON(message.schedule) : undefined;
    if (message.labels) {
      obj.labels = message.labels.map(e => e || "");
    } else {
      obj.labels = [];
    }
    if (message.degrees) {
      obj.degrees = message.degrees.map(e => e || "");
    } else {
      obj.degrees = [];
    }
    return obj;
  },
};

export const CheckResults = {
  encode(message: CheckResults, writer: Writer = Writer.create()): Writer {
    for (const v of message.issues) {
      CheckResults_Issue.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CheckResults {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCheckResults } as CheckResults;
    message.issues = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.issues.push(CheckResults_Issue.decode(reader, reader.uint32()));
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
    if (object.issues !== undefined && object.issues !== null) {
      for (const e of object.issues) {
        message.issues.push(CheckResults_Issue.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<CheckResults>): CheckResults {
    const message = { ...baseCheckResults } as CheckResults;
    message.issues = [];
    if (object.issues !== undefined && object.issues !== null) {
      for (const e of object.issues) {
        message.issues.push(CheckResults_Issue.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: CheckResults): unknown {
    const obj: any = {};
    if (message.issues) {
      obj.issues = message.issues.map(e => e ? CheckResults_Issue.toJSON(e) : undefined);
    } else {
      obj.issues = [];
    }
    return obj;
  },
};

export const CheckResults_Issue = {
  encode(message: CheckResults_Issue, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.type);
    writer.uint32(18).string(message.subjectName);
    writer.uint32(26).string(message.relatedCond);
    writer.uint32(34).string(message.relatedCondRaw);
    for (const v of message.relatedCourse) {
      writer.uint32(42).string(v!);
    }
    for (const v of message.relatedCourseList) {
      writer.uint32(50).string(v!);
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CheckResults_Issue {
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
      message.type = CheckResults_Issue_Type.fromJSON(object.type);
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
    if (object.relatedCourseList !== undefined && object.relatedCourseList !== null) {
      for (const e of object.relatedCourseList) {
        message.relatedCourseList.push(String(e));
      }
    }
    return message;
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
    if (object.relatedCourseList !== undefined && object.relatedCourseList !== null) {
      for (const e of object.relatedCourseList) {
        message.relatedCourseList.push(e);
      }
    }
    return message;
  },
  toJSON(message: CheckResults_Issue): unknown {
    const obj: any = {};
    obj.type = CheckResults_Issue_Type.toJSON(message.type);
    obj.subjectName = message.subjectName || "";
    obj.relatedCond = message.relatedCond || "";
    obj.relatedCondRaw = message.relatedCondRaw || "";
    if (message.relatedCourse) {
      obj.relatedCourse = message.relatedCourse.map(e => e || "");
    } else {
      obj.relatedCourse = [];
    }
    if (message.relatedCourseList) {
      obj.relatedCourseList = message.relatedCourseList.map(e => e || "");
    } else {
      obj.relatedCourseList = [];
    }
    return obj;
  },
};

export const ReservedEnrolInfo = {
  encode(message: ReservedEnrolInfo, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.reserve);
    writer.uint32(16).int32(message.cap);
    writer.uint32(24).int32(message.total);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ReservedEnrolInfo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseReservedEnrolInfo } as ReservedEnrolInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reserve = reader.string();
          break;
        case 2:
          message.cap = reader.int32();
          break;
        case 3:
          message.total = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ReservedEnrolInfo {
    const message = { ...baseReservedEnrolInfo } as ReservedEnrolInfo;
    if (object.reserve !== undefined && object.reserve !== null) {
      message.reserve = String(object.reserve);
    } else {
      message.reserve = "";
    }
    if (object.cap !== undefined && object.cap !== null) {
      message.cap = Number(object.cap);
    } else {
      message.cap = 0;
    }
    if (object.total !== undefined && object.total !== null) {
      message.total = Number(object.total);
    } else {
      message.total = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<ReservedEnrolInfo>): ReservedEnrolInfo {
    const message = { ...baseReservedEnrolInfo } as ReservedEnrolInfo;
    if (object.reserve !== undefined && object.reserve !== null) {
      message.reserve = object.reserve;
    } else {
      message.reserve = "";
    }
    if (object.cap !== undefined && object.cap !== null) {
      message.cap = object.cap;
    } else {
      message.cap = 0;
    }
    if (object.total !== undefined && object.total !== null) {
      message.total = object.total;
    } else {
      message.total = 0;
    }
    return message;
  },
  toJSON(message: ReservedEnrolInfo): unknown {
    const obj: any = {};
    obj.reserve = message.reserve || "";
    obj.cap = message.cap || 0;
    obj.total = message.total || 0;
    return obj;
  },
};

export const CourseSection = {
  encode(message: CourseSection, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.section);
    writer.uint32(18).string(message.location);
    writer.uint32(24).int32(message.enrolCap);
    writer.uint32(32).int32(message.enrolTotal);
    for (const v of message.time) {
      writer.uint32(42).string(v!);
    }
    writer.uint32(50).string(message.room);
    writer.uint32(58).string(message.instructor);
    writer.uint32(64).int32(message.sectionId);
    for (const v of message.reservedEnrolInfo) {
      ReservedEnrolInfo.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CourseSection {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCourseSection } as CourseSection;
    message.time = [];
    message.reservedEnrolInfo = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.section = reader.string();
          break;
        case 2:
          message.location = reader.string();
          break;
        case 3:
          message.enrolCap = reader.int32();
          break;
        case 4:
          message.enrolTotal = reader.int32();
          break;
        case 5:
          message.time.push(reader.string());
          break;
        case 6:
          message.room = reader.string();
          break;
        case 7:
          message.instructor = reader.string();
          break;
        case 8:
          message.sectionId = reader.int32();
          break;
        case 9:
          message.reservedEnrolInfo.push(ReservedEnrolInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CourseSection {
    const message = { ...baseCourseSection } as CourseSection;
    message.time = [];
    message.reservedEnrolInfo = [];
    if (object.section !== undefined && object.section !== null) {
      message.section = String(object.section);
    } else {
      message.section = "";
    }
    if (object.location !== undefined && object.location !== null) {
      message.location = String(object.location);
    } else {
      message.location = "";
    }
    if (object.enrolCap !== undefined && object.enrolCap !== null) {
      message.enrolCap = Number(object.enrolCap);
    } else {
      message.enrolCap = 0;
    }
    if (object.enrolTotal !== undefined && object.enrolTotal !== null) {
      message.enrolTotal = Number(object.enrolTotal);
    } else {
      message.enrolTotal = 0;
    }
    if (object.time !== undefined && object.time !== null) {
      for (const e of object.time) {
        message.time.push(String(e));
      }
    }
    if (object.room !== undefined && object.room !== null) {
      message.room = String(object.room);
    } else {
      message.room = "";
    }
    if (object.instructor !== undefined && object.instructor !== null) {
      message.instructor = String(object.instructor);
    } else {
      message.instructor = "";
    }
    if (object.sectionId !== undefined && object.sectionId !== null) {
      message.sectionId = Number(object.sectionId);
    } else {
      message.sectionId = 0;
    }
    if (object.reservedEnrolInfo !== undefined && object.reservedEnrolInfo !== null) {
      for (const e of object.reservedEnrolInfo) {
        message.reservedEnrolInfo.push(ReservedEnrolInfo.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<CourseSection>): CourseSection {
    const message = { ...baseCourseSection } as CourseSection;
    message.time = [];
    message.reservedEnrolInfo = [];
    if (object.section !== undefined && object.section !== null) {
      message.section = object.section;
    } else {
      message.section = "";
    }
    if (object.location !== undefined && object.location !== null) {
      message.location = object.location;
    } else {
      message.location = "";
    }
    if (object.enrolCap !== undefined && object.enrolCap !== null) {
      message.enrolCap = object.enrolCap;
    } else {
      message.enrolCap = 0;
    }
    if (object.enrolTotal !== undefined && object.enrolTotal !== null) {
      message.enrolTotal = object.enrolTotal;
    } else {
      message.enrolTotal = 0;
    }
    if (object.time !== undefined && object.time !== null) {
      for (const e of object.time) {
        message.time.push(e);
      }
    }
    if (object.room !== undefined && object.room !== null) {
      message.room = object.room;
    } else {
      message.room = "";
    }
    if (object.instructor !== undefined && object.instructor !== null) {
      message.instructor = object.instructor;
    } else {
      message.instructor = "";
    }
    if (object.sectionId !== undefined && object.sectionId !== null) {
      message.sectionId = object.sectionId;
    } else {
      message.sectionId = 0;
    }
    if (object.reservedEnrolInfo !== undefined && object.reservedEnrolInfo !== null) {
      for (const e of object.reservedEnrolInfo) {
        message.reservedEnrolInfo.push(ReservedEnrolInfo.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: CourseSection): unknown {
    const obj: any = {};
    obj.section = message.section || "";
    obj.location = message.location || "";
    obj.enrolCap = message.enrolCap || 0;
    obj.enrolTotal = message.enrolTotal || 0;
    if (message.time) {
      obj.time = message.time.map(e => e || "");
    } else {
      obj.time = [];
    }
    obj.room = message.room || "";
    obj.instructor = message.instructor || "";
    obj.sectionId = message.sectionId || 0;
    if (message.reservedEnrolInfo) {
      obj.reservedEnrolInfo = message.reservedEnrolInfo.map(e => e ? ReservedEnrolInfo.toJSON(e) : undefined);
    } else {
      obj.reservedEnrolInfo = [];
    }
    return obj;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | undefined;
type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;