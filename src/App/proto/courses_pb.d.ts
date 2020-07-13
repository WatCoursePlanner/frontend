// package: com.watcourses.wat_courses.proto
// file: proto/courses.proto

import * as jspb from "google-protobuf";

export class CourseInfo extends jspb.Message {
  hasName(): boolean;
  clearName(): void;
  getName(): string | undefined;
  setName(value: string): void;

  hasCode(): boolean;
  clearCode(): void;
  getCode(): string | undefined;
  setCode(value: string): void;

  hasDescription(): boolean;
  clearDescription(): void;
  getDescription(): string | undefined;
  setDescription(value: string): void;

  hasFaculty(): boolean;
  clearFaculty(): void;
  getFaculty(): string | undefined;
  setFaculty(value: string): void;

  clearOfferingTerms(): void;
  getOfferingTerms(): Array<TermMap[keyof TermMap]>;
  setOfferingTerms(value: Array<TermMap[keyof TermMap]>): void;
  addOfferingTerms(value: TermMap[keyof TermMap], index?: number): TermMap[keyof TermMap];

  hasId(): boolean;
  clearId(): void;
  getId(): string | undefined;
  setId(value: string): void;

  hasPreRequisiteLogicStr(): boolean;
  clearPreRequisiteLogicStr(): void;
  getPreRequisiteLogicStr(): string | undefined;
  setPreRequisiteLogicStr(value: string): void;

  hasCoRequisiteLogicStr(): boolean;
  clearCoRequisiteLogicStr(): void;
  getCoRequisiteLogicStr(): string | undefined;
  setCoRequisiteLogicStr(value: string): void;

  hasAntiRequisiteLogicStr(): boolean;
  clearAntiRequisiteLogicStr(): void;
  getAntiRequisiteLogicStr(): string | undefined;
  setAntiRequisiteLogicStr(value: string): void;

  hasPreRequisite(): boolean;
  clearPreRequisite(): void;
  getPreRequisite(): string | undefined;
  setPreRequisite(value: string): void;

  hasCoRequisite(): boolean;
  clearCoRequisite(): void;
  getCoRequisite(): string | undefined;
  setCoRequisite(value: string): void;

  hasAntiRequisite(): boolean;
  clearAntiRequisite(): void;
  getAntiRequisite(): string | undefined;
  setAntiRequisite(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CourseInfo.AsObject;
  static toObject(includeInstance: boolean, msg: CourseInfo): CourseInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CourseInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CourseInfo;
  static deserializeBinaryFromReader(message: CourseInfo, reader: jspb.BinaryReader): CourseInfo;
}

export namespace CourseInfo {
  export type AsObject = {
    name?: string,
    code?: string,
    description?: string,
    faculty?: string,
    offeringTerms: Array<TermMap[keyof TermMap]>,
    id?: string,
    preRequisiteLogicStr?: string,
    coRequisiteLogicStr?: string,
    antiRequisiteLogicStr?: string,
    preRequisite?: string,
    coRequisite?: string,
    antiRequisite?: string,
  }
}

export class Courses extends jspb.Message {
  hasName(): boolean;
  clearName(): void;
  getName(): string | undefined;
  setName(value: string): void;

  clearCourses(): void;
  getCourses(): Array<string>;
  setCourses(value: Array<string>): void;
  addCourses(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Courses.AsObject;
  static toObject(includeInstance: boolean, msg: Courses): Courses.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Courses, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Courses;
  static deserializeBinaryFromReader(message: Courses, reader: jspb.BinaryReader): Courses;
}

export namespace Courses {
  export type AsObject = {
    name?: string,
    courses: Array<string>,
  }
}

export class PaginationInfoRequest extends jspb.Message {
  hasZeroBasedPage(): boolean;
  clearZeroBasedPage(): void;
  getZeroBasedPage(): number | undefined;
  setZeroBasedPage(value: number): void;

  hasLimit(): boolean;
  clearLimit(): void;
  getLimit(): number | undefined;
  setLimit(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PaginationInfoRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PaginationInfoRequest): PaginationInfoRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PaginationInfoRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PaginationInfoRequest;
  static deserializeBinaryFromReader(message: PaginationInfoRequest, reader: jspb.BinaryReader): PaginationInfoRequest;
}

export namespace PaginationInfoRequest {
  export type AsObject = {
    zeroBasedPage?: number,
    limit?: number,
  }
}

export class PaginationInfoResponse extends jspb.Message {
  hasTotalPages(): boolean;
  clearTotalPages(): void;
  getTotalPages(): number | undefined;
  setTotalPages(value: number): void;

  hasCurrentPage(): boolean;
  clearCurrentPage(): void;
  getCurrentPage(): number | undefined;
  setCurrentPage(value: number): void;

  hasLimit(): boolean;
  clearLimit(): void;
  getLimit(): number | undefined;
  setLimit(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PaginationInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PaginationInfoResponse): PaginationInfoResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PaginationInfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PaginationInfoResponse;
  static deserializeBinaryFromReader(message: PaginationInfoResponse, reader: jspb.BinaryReader): PaginationInfoResponse;
}

export namespace PaginationInfoResponse {
  export type AsObject = {
    totalPages?: number,
    currentPage?: number,
    limit?: number,
  }
}

export class SearchCourseRequest extends jspb.Message {
  hasPagination(): boolean;
  clearPagination(): void;
  getPagination(): PaginationInfoRequest | undefined;
  setPagination(value?: PaginationInfoRequest): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchCourseRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SearchCourseRequest): SearchCourseRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SearchCourseRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchCourseRequest;
  static deserializeBinaryFromReader(message: SearchCourseRequest, reader: jspb.BinaryReader): SearchCourseRequest;
}

export namespace SearchCourseRequest {
  export type AsObject = {
    pagination?: PaginationInfoRequest.AsObject,
  }
}

export class SearchCourseResponse extends jspb.Message {
  hasPagination(): boolean;
  clearPagination(): void;
  getPagination(): PaginationInfoResponse | undefined;
  setPagination(value?: PaginationInfoResponse): void;

  clearResults(): void;
  getResults(): Array<CourseInfo>;
  setResults(value: Array<CourseInfo>): void;
  addResults(value?: CourseInfo, index?: number): CourseInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchCourseResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SearchCourseResponse): SearchCourseResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SearchCourseResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchCourseResponse;
  static deserializeBinaryFromReader(message: SearchCourseResponse, reader: jspb.BinaryReader): SearchCourseResponse;
}

export namespace SearchCourseResponse {
  export type AsObject = {
    pagination?: PaginationInfoResponse.AsObject,
    results: Array<CourseInfo.AsObject>,
  }
}

export class ReParseConditionsResponse extends jspb.Message {
  hasTotal(): boolean;
  clearTotal(): void;
  getTotal(): number | undefined;
  setTotal(value: number): void;

  hasSuccess(): boolean;
  clearSuccess(): void;
  getSuccess(): number | undefined;
  setSuccess(value: number): void;

  getSucceedResults(): jspb.Map<string, string>;
  clearSucceedResults(): void;
  getFailedResults(): jspb.Map<string, string>;
  clearFailedResults(): void;
  hasDryRun(): boolean;
  clearDryRun(): void;
  getDryRun(): boolean | undefined;
  setDryRun(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReParseConditionsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ReParseConditionsResponse): ReParseConditionsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ReParseConditionsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReParseConditionsResponse;
  static deserializeBinaryFromReader(message: ReParseConditionsResponse, reader: jspb.BinaryReader): ReParseConditionsResponse;
}

export namespace ReParseConditionsResponse {
  export type AsObject = {
    total?: number,
    success?: number,
    succeedResults: Array<[string, string]>,
    failedResults: Array<[string, string]>,
    dryRun?: boolean,
  }
}

export class Schedule extends jspb.Message {
  clearTerms(): void;
  getTerms(): Array<Schedule.TermSchedule>;
  setTerms(value: Array<Schedule.TermSchedule>): void;
  addTerms(value?: Schedule.TermSchedule, index?: number): Schedule.TermSchedule;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Schedule.AsObject;
  static toObject(includeInstance: boolean, msg: Schedule): Schedule.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Schedule, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Schedule;
  static deserializeBinaryFromReader(message: Schedule, reader: jspb.BinaryReader): Schedule;
}

export namespace Schedule {
  export type AsObject = {
    terms: Array<Schedule.TermSchedule.AsObject>,
  }

  export class TermSchedule extends jspb.Message {
    clearCourseCodes(): void;
    getCourseCodes(): Array<string>;
    setCourseCodes(value: Array<string>): void;
    addCourseCodes(value: string, index?: number): string;

    hasTermName(): boolean;
    clearTermName(): void;
    getTermName(): string | undefined;
    setTermName(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TermSchedule.AsObject;
    static toObject(includeInstance: boolean, msg: TermSchedule): TermSchedule.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TermSchedule, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TermSchedule;
    static deserializeBinaryFromReader(message: TermSchedule, reader: jspb.BinaryReader): TermSchedule;
  }

  export namespace TermSchedule {
    export type AsObject = {
      courseCodes: Array<string>,
      termName?: string,
    }
  }
}

export class StudentProfile extends jspb.Message {
  hasSchedule(): boolean;
  clearSchedule(): void;
  getSchedule(): Schedule | undefined;
  setSchedule(value?: Schedule): void;

  clearLabels(): void;
  getLabels(): Array<string>;
  setLabels(value: Array<string>): void;
  addLabels(value: string, index?: number): string;

  clearDegrees(): void;
  getDegrees(): Array<string>;
  setDegrees(value: Array<string>): void;
  addDegrees(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StudentProfile.AsObject;
  static toObject(includeInstance: boolean, msg: StudentProfile): StudentProfile.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StudentProfile, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StudentProfile;
  static deserializeBinaryFromReader(message: StudentProfile, reader: jspb.BinaryReader): StudentProfile;
}

export namespace StudentProfile {
  export type AsObject = {
    schedule?: Schedule.AsObject,
    labels: Array<string>,
    degrees: Array<string>,
  }
}

export class CheckResults extends jspb.Message {
  clearIssues(): void;
  getIssues(): Array<CheckResults.Issue>;
  setIssues(value: Array<CheckResults.Issue>): void;
  addIssues(value?: CheckResults.Issue, index?: number): CheckResults.Issue;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CheckResults.AsObject;
  static toObject(includeInstance: boolean, msg: CheckResults): CheckResults.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CheckResults, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CheckResults;
  static deserializeBinaryFromReader(message: CheckResults, reader: jspb.BinaryReader): CheckResults;
}

export namespace CheckResults {
  export type AsObject = {
    issues: Array<CheckResults.Issue.AsObject>,
  }

  export class Issue extends jspb.Message {
    hasType(): boolean;
    clearType(): void;
    getType(): CheckResults.Issue.TypeMap[keyof CheckResults.Issue.TypeMap] | undefined;
    setType(value: CheckResults.Issue.TypeMap[keyof CheckResults.Issue.TypeMap]): void;

    hasSubjectName(): boolean;
    clearSubjectName(): void;
    getSubjectName(): string | undefined;
    setSubjectName(value: string): void;

    hasRelatedCond(): boolean;
    clearRelatedCond(): void;
    getRelatedCond(): string | undefined;
    setRelatedCond(value: string): void;

    hasRelatedCondRaw(): boolean;
    clearRelatedCondRaw(): void;
    getRelatedCondRaw(): string | undefined;
    setRelatedCondRaw(value: string): void;

    clearRelatedCourse(): void;
    getRelatedCourse(): Array<string>;
    setRelatedCourse(value: Array<string>): void;
    addRelatedCourse(value: string, index?: number): string;

    clearRelatedCourses(): void;
    getRelatedCourses(): Array<string>;
    setRelatedCourses(value: Array<string>): void;
    addRelatedCourses(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Issue.AsObject;
    static toObject(includeInstance: boolean, msg: Issue): Issue.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Issue, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Issue;
    static deserializeBinaryFromReader(message: Issue, reader: jspb.BinaryReader): Issue;
  }

  export namespace Issue {
    export type AsObject = {
      type?: CheckResults.Issue.TypeMap[keyof CheckResults.Issue.TypeMap],
      subjectName?: string,
      relatedCond?: string,
      relatedCondRaw?: string,
      relatedCourse: Array<string>,
      relatedCourses: Array<string>,
    }

    export interface TypeMap {
      PRE_REQUISITE_NOT_MET: 1;
      CO_REQUISITE_NOT_MET: 2;
      ANTI_REQUISITE_NOT_MET: 3;
      DEGREE_REQUIREMENTS_NOT_MET: 4;
    }

    export const Type: TypeMap;
  }
}

export class ReservedEnrolInfo extends jspb.Message {
  hasReserve(): boolean;
  clearReserve(): void;
  getReserve(): string | undefined;
  setReserve(value: string): void;

  hasCap(): boolean;
  clearCap(): void;
  getCap(): number | undefined;
  setCap(value: number): void;

  hasTotal(): boolean;
  clearTotal(): void;
  getTotal(): number | undefined;
  setTotal(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReservedEnrolInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ReservedEnrolInfo): ReservedEnrolInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ReservedEnrolInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReservedEnrolInfo;
  static deserializeBinaryFromReader(message: ReservedEnrolInfo, reader: jspb.BinaryReader): ReservedEnrolInfo;
}

export namespace ReservedEnrolInfo {
  export type AsObject = {
    reserve?: string,
    cap?: number,
    total?: number,
  }
}

export class CourseSection extends jspb.Message {
  hasSection(): boolean;
  clearSection(): void;
  getSection(): string | undefined;
  setSection(value: string): void;

  hasLocation(): boolean;
  clearLocation(): void;
  getLocation(): string | undefined;
  setLocation(value: string): void;

  hasEnrolCap(): boolean;
  clearEnrolCap(): void;
  getEnrolCap(): number | undefined;
  setEnrolCap(value: number): void;

  hasEnrolTotal(): boolean;
  clearEnrolTotal(): void;
  getEnrolTotal(): number | undefined;
  setEnrolTotal(value: number): void;

  clearTime(): void;
  getTime(): Array<string>;
  setTime(value: Array<string>): void;
  addTime(value: string, index?: number): string;

  hasRoom(): boolean;
  clearRoom(): void;
  getRoom(): string | undefined;
  setRoom(value: string): void;

  hasInstructor(): boolean;
  clearInstructor(): void;
  getInstructor(): string | undefined;
  setInstructor(value: string): void;

  hasSectionid(): boolean;
  clearSectionid(): void;
  getSectionid(): number | undefined;
  setSectionid(value: number): void;

  clearReservedEnrolInfo(): void;
  getReservedEnrolInfo(): Array<ReservedEnrolInfo>;
  setReservedEnrolInfo(value: Array<ReservedEnrolInfo>): void;
  addReservedEnrolInfo(value?: ReservedEnrolInfo, index?: number): ReservedEnrolInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CourseSection.AsObject;
  static toObject(includeInstance: boolean, msg: CourseSection): CourseSection.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CourseSection, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CourseSection;
  static deserializeBinaryFromReader(message: CourseSection, reader: jspb.BinaryReader): CourseSection;
}

export namespace CourseSection {
  export type AsObject = {
    section?: string,
    location?: string,
    enrolCap?: number,
    enrolTotal?: number,
    time: Array<string>,
    room?: string,
    instructor?: string,
    sectionid?: number,
    reservedEnrolInfo: Array<ReservedEnrolInfo.AsObject>,
  }
}

export interface TermMap {
  SPRING: 0;
  WINTER: 1;
  FALL: 2;
}

export const Term: TermMap;

export interface ConditionTypeMap {
  TRUE: 0;
  FALSE: 1;
  AND: 2;
  OR: 3;
  NOT: 4;
  HAS_COURSE: 5;
  HAS_LABEL: 6;
  SATISFIES_LIST: 7;
}

export const ConditionType: ConditionTypeMap;

