/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "com.watcourses.wat_courses.proto";

export interface Reserve {
  /** Name of the reserved group */
  reserveGroup: string;
  /** Total enrollment capacity of the group */
  enrollmentCapacity: number;
  /** Total reserve enrollment */
  enrollmentTotal: number;
}

export interface ClassDate {
  /** 24 hour class starting time */
  startTime: string;
  /** 24 hour class ending time */
  endTime: string;
  /** Weekdays the course is offered */
  weekdays: string;
  /** Additional starting date for course */
  startDate: string;
  /** Additional ending date for course */
  endDate: string;
  /** If the course schedule is TBA */
  isTba: boolean;
  /** If the course is cancelled for the term */
  isCancelled: boolean;
  /** If the course is closed for the term */
  isClosed: boolean;
}

export interface ClassLocation {
  /** Name of the building */
  building: string;
  /** Room number from the building */
  room: string;
}

export interface Class {
  /** Date object for course schedule */
  date: ClassDate | undefined;
  /** Class location details */
  location: ClassLocation | undefined;
  /** Names of instructors teaching the course */
  instructors: string[];
}

export interface CourseSchedule {
  /** Requested subject acronym */
  subject: string;
  /** Registrar assigned class number */
  catalogNumber: string;
  /** Credit count for the mentioned course */
  units: number;
  /** Class name and title */
  title: string;
  /** Additional notes regarding enrollment for the given term */
  note: string;
  /** Associated term specific class enrollment number */
  classNumber: number;
  /** Class instruction and number */
  section: string;
  /** Name of the campus the course is being offered */
  campus: string;
  /** Associated class id */
  associatedClass: number;
  /** Name of the related course component */
  relatedComponent1: string;
  /** Name of the second related course component */
  relatedComponent2: string;
  /** Class enrollment capacity */
  enrollmentCapacity: number;
  /** Total current class enrollment */
  enrollmentTotal: number;
  /** Class waiting capacity */
  waitingCapacity: number;
  /** Total current waiting students */
  waitingTotal: number;
  /** Class discussion topic */
  topic: string;
  /** Course specific enrollment reservation data */
  reserves: Reserve[];
  /** Schedule data */
  classes: Class[];
  /** A list of classes the course is held with */
  heldWith: string[];
  /** 4 digit term representation */
  term: number;
  /** Undergraduate or graduate course classification optional string lastUpdated = 22; // ISO8601 timestamp of when the data was last updated */
  academicLevel: string;
}

/** https://github.com/uWaterloo/api-documentation/blob/master/v2/courses/subject_catalog_number_schedule.md */
export interface CourseScheduleResponse {
  data: CourseSchedule[];
}

const baseReserve: object = {
  reserveGroup: "",
  enrollmentCapacity: 0,
  enrollmentTotal: 0,
};

export const Reserve = {
  encode(message: Reserve, writer: Writer = Writer.create()): Writer {
    if (message.reserveGroup !== "") {
      writer.uint32(10).string(message.reserveGroup);
    }
    if (message.enrollmentCapacity !== 0) {
      writer.uint32(16).int32(message.enrollmentCapacity);
    }
    if (message.enrollmentTotal !== 0) {
      writer.uint32(24).int32(message.enrollmentTotal);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Reserve {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseReserve } as Reserve;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reserveGroup = reader.string();
          break;
        case 2:
          message.enrollmentCapacity = reader.int32();
          break;
        case 3:
          message.enrollmentTotal = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Reserve {
    const message = { ...baseReserve } as Reserve;
    if (object.reserveGroup !== undefined && object.reserveGroup !== null) {
      message.reserveGroup = String(object.reserveGroup);
    } else {
      message.reserveGroup = "";
    }
    if (
      object.enrollmentCapacity !== undefined &&
      object.enrollmentCapacity !== null
    ) {
      message.enrollmentCapacity = Number(object.enrollmentCapacity);
    } else {
      message.enrollmentCapacity = 0;
    }
    if (
      object.enrollmentTotal !== undefined &&
      object.enrollmentTotal !== null
    ) {
      message.enrollmentTotal = Number(object.enrollmentTotal);
    } else {
      message.enrollmentTotal = 0;
    }
    return message;
  },

  toJSON(message: Reserve): unknown {
    const obj: any = {};
    message.reserveGroup !== undefined &&
      (obj.reserveGroup = message.reserveGroup);
    message.enrollmentCapacity !== undefined &&
      (obj.enrollmentCapacity = message.enrollmentCapacity);
    message.enrollmentTotal !== undefined &&
      (obj.enrollmentTotal = message.enrollmentTotal);
    return obj;
  },

  fromPartial(object: DeepPartial<Reserve>): Reserve {
    const message = { ...baseReserve } as Reserve;
    if (object.reserveGroup !== undefined && object.reserveGroup !== null) {
      message.reserveGroup = object.reserveGroup;
    } else {
      message.reserveGroup = "";
    }
    if (
      object.enrollmentCapacity !== undefined &&
      object.enrollmentCapacity !== null
    ) {
      message.enrollmentCapacity = object.enrollmentCapacity;
    } else {
      message.enrollmentCapacity = 0;
    }
    if (
      object.enrollmentTotal !== undefined &&
      object.enrollmentTotal !== null
    ) {
      message.enrollmentTotal = object.enrollmentTotal;
    } else {
      message.enrollmentTotal = 0;
    }
    return message;
  },
};

const baseClassDate: object = {
  startTime: "",
  endTime: "",
  weekdays: "",
  startDate: "",
  endDate: "",
  isTba: false,
  isCancelled: false,
  isClosed: false,
};

export const ClassDate = {
  encode(message: ClassDate, writer: Writer = Writer.create()): Writer {
    if (message.startTime !== "") {
      writer.uint32(10).string(message.startTime);
    }
    if (message.endTime !== "") {
      writer.uint32(18).string(message.endTime);
    }
    if (message.weekdays !== "") {
      writer.uint32(26).string(message.weekdays);
    }
    if (message.startDate !== "") {
      writer.uint32(34).string(message.startDate);
    }
    if (message.endDate !== "") {
      writer.uint32(42).string(message.endDate);
    }
    if (message.isTba === true) {
      writer.uint32(48).bool(message.isTba);
    }
    if (message.isCancelled === true) {
      writer.uint32(56).bool(message.isCancelled);
    }
    if (message.isClosed === true) {
      writer.uint32(64).bool(message.isClosed);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ClassDate {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseClassDate } as ClassDate;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.startTime = reader.string();
          break;
        case 2:
          message.endTime = reader.string();
          break;
        case 3:
          message.weekdays = reader.string();
          break;
        case 4:
          message.startDate = reader.string();
          break;
        case 5:
          message.endDate = reader.string();
          break;
        case 6:
          message.isTba = reader.bool();
          break;
        case 7:
          message.isCancelled = reader.bool();
          break;
        case 8:
          message.isClosed = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClassDate {
    const message = { ...baseClassDate } as ClassDate;
    if (object.startTime !== undefined && object.startTime !== null) {
      message.startTime = String(object.startTime);
    } else {
      message.startTime = "";
    }
    if (object.endTime !== undefined && object.endTime !== null) {
      message.endTime = String(object.endTime);
    } else {
      message.endTime = "";
    }
    if (object.weekdays !== undefined && object.weekdays !== null) {
      message.weekdays = String(object.weekdays);
    } else {
      message.weekdays = "";
    }
    if (object.startDate !== undefined && object.startDate !== null) {
      message.startDate = String(object.startDate);
    } else {
      message.startDate = "";
    }
    if (object.endDate !== undefined && object.endDate !== null) {
      message.endDate = String(object.endDate);
    } else {
      message.endDate = "";
    }
    if (object.isTba !== undefined && object.isTba !== null) {
      message.isTba = Boolean(object.isTba);
    } else {
      message.isTba = false;
    }
    if (object.isCancelled !== undefined && object.isCancelled !== null) {
      message.isCancelled = Boolean(object.isCancelled);
    } else {
      message.isCancelled = false;
    }
    if (object.isClosed !== undefined && object.isClosed !== null) {
      message.isClosed = Boolean(object.isClosed);
    } else {
      message.isClosed = false;
    }
    return message;
  },

  toJSON(message: ClassDate): unknown {
    const obj: any = {};
    message.startTime !== undefined && (obj.startTime = message.startTime);
    message.endTime !== undefined && (obj.endTime = message.endTime);
    message.weekdays !== undefined && (obj.weekdays = message.weekdays);
    message.startDate !== undefined && (obj.startDate = message.startDate);
    message.endDate !== undefined && (obj.endDate = message.endDate);
    message.isTba !== undefined && (obj.isTba = message.isTba);
    message.isCancelled !== undefined &&
      (obj.isCancelled = message.isCancelled);
    message.isClosed !== undefined && (obj.isClosed = message.isClosed);
    return obj;
  },

  fromPartial(object: DeepPartial<ClassDate>): ClassDate {
    const message = { ...baseClassDate } as ClassDate;
    if (object.startTime !== undefined && object.startTime !== null) {
      message.startTime = object.startTime;
    } else {
      message.startTime = "";
    }
    if (object.endTime !== undefined && object.endTime !== null) {
      message.endTime = object.endTime;
    } else {
      message.endTime = "";
    }
    if (object.weekdays !== undefined && object.weekdays !== null) {
      message.weekdays = object.weekdays;
    } else {
      message.weekdays = "";
    }
    if (object.startDate !== undefined && object.startDate !== null) {
      message.startDate = object.startDate;
    } else {
      message.startDate = "";
    }
    if (object.endDate !== undefined && object.endDate !== null) {
      message.endDate = object.endDate;
    } else {
      message.endDate = "";
    }
    if (object.isTba !== undefined && object.isTba !== null) {
      message.isTba = object.isTba;
    } else {
      message.isTba = false;
    }
    if (object.isCancelled !== undefined && object.isCancelled !== null) {
      message.isCancelled = object.isCancelled;
    } else {
      message.isCancelled = false;
    }
    if (object.isClosed !== undefined && object.isClosed !== null) {
      message.isClosed = object.isClosed;
    } else {
      message.isClosed = false;
    }
    return message;
  },
};

const baseClassLocation: object = { building: "", room: "" };

export const ClassLocation = {
  encode(message: ClassLocation, writer: Writer = Writer.create()): Writer {
    if (message.building !== "") {
      writer.uint32(10).string(message.building);
    }
    if (message.room !== "") {
      writer.uint32(18).string(message.room);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ClassLocation {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseClassLocation } as ClassLocation;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.building = reader.string();
          break;
        case 2:
          message.room = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClassLocation {
    const message = { ...baseClassLocation } as ClassLocation;
    if (object.building !== undefined && object.building !== null) {
      message.building = String(object.building);
    } else {
      message.building = "";
    }
    if (object.room !== undefined && object.room !== null) {
      message.room = String(object.room);
    } else {
      message.room = "";
    }
    return message;
  },

  toJSON(message: ClassLocation): unknown {
    const obj: any = {};
    message.building !== undefined && (obj.building = message.building);
    message.room !== undefined && (obj.room = message.room);
    return obj;
  },

  fromPartial(object: DeepPartial<ClassLocation>): ClassLocation {
    const message = { ...baseClassLocation } as ClassLocation;
    if (object.building !== undefined && object.building !== null) {
      message.building = object.building;
    } else {
      message.building = "";
    }
    if (object.room !== undefined && object.room !== null) {
      message.room = object.room;
    } else {
      message.room = "";
    }
    return message;
  },
};

const baseClass: object = { instructors: "" };

export const Class = {
  encode(message: Class, writer: Writer = Writer.create()): Writer {
    if (message.date !== undefined) {
      ClassDate.encode(message.date, writer.uint32(10).fork()).ldelim();
    }
    if (message.location !== undefined) {
      ClassLocation.encode(message.location, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.instructors) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Class {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseClass } as Class;
    message.instructors = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.date = ClassDate.decode(reader, reader.uint32());
          break;
        case 2:
          message.location = ClassLocation.decode(reader, reader.uint32());
          break;
        case 3:
          message.instructors.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Class {
    const message = { ...baseClass } as Class;
    message.instructors = [];
    if (object.date !== undefined && object.date !== null) {
      message.date = ClassDate.fromJSON(object.date);
    } else {
      message.date = undefined;
    }
    if (object.location !== undefined && object.location !== null) {
      message.location = ClassLocation.fromJSON(object.location);
    } else {
      message.location = undefined;
    }
    if (object.instructors !== undefined && object.instructors !== null) {
      for (const e of object.instructors) {
        message.instructors.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: Class): unknown {
    const obj: any = {};
    message.date !== undefined &&
      (obj.date = message.date ? ClassDate.toJSON(message.date) : undefined);
    message.location !== undefined &&
      (obj.location = message.location
        ? ClassLocation.toJSON(message.location)
        : undefined);
    if (message.instructors) {
      obj.instructors = message.instructors.map((e) => e);
    } else {
      obj.instructors = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Class>): Class {
    const message = { ...baseClass } as Class;
    message.instructors = [];
    if (object.date !== undefined && object.date !== null) {
      message.date = ClassDate.fromPartial(object.date);
    } else {
      message.date = undefined;
    }
    if (object.location !== undefined && object.location !== null) {
      message.location = ClassLocation.fromPartial(object.location);
    } else {
      message.location = undefined;
    }
    if (object.instructors !== undefined && object.instructors !== null) {
      for (const e of object.instructors) {
        message.instructors.push(e);
      }
    }
    return message;
  },
};

const baseCourseSchedule: object = {
  subject: "",
  catalogNumber: "",
  units: 0,
  title: "",
  note: "",
  classNumber: 0,
  section: "",
  campus: "",
  associatedClass: 0,
  relatedComponent1: "",
  relatedComponent2: "",
  enrollmentCapacity: 0,
  enrollmentTotal: 0,
  waitingCapacity: 0,
  waitingTotal: 0,
  topic: "",
  heldWith: "",
  term: 0,
  academicLevel: "",
};

export const CourseSchedule = {
  encode(message: CourseSchedule, writer: Writer = Writer.create()): Writer {
    if (message.subject !== "") {
      writer.uint32(10).string(message.subject);
    }
    if (message.catalogNumber !== "") {
      writer.uint32(18).string(message.catalogNumber);
    }
    if (message.units !== 0) {
      writer.uint32(29).float(message.units);
    }
    if (message.title !== "") {
      writer.uint32(34).string(message.title);
    }
    if (message.note !== "") {
      writer.uint32(42).string(message.note);
    }
    if (message.classNumber !== 0) {
      writer.uint32(48).int32(message.classNumber);
    }
    if (message.section !== "") {
      writer.uint32(58).string(message.section);
    }
    if (message.campus !== "") {
      writer.uint32(66).string(message.campus);
    }
    if (message.associatedClass !== 0) {
      writer.uint32(72).int32(message.associatedClass);
    }
    if (message.relatedComponent1 !== "") {
      writer.uint32(82).string(message.relatedComponent1);
    }
    if (message.relatedComponent2 !== "") {
      writer.uint32(90).string(message.relatedComponent2);
    }
    if (message.enrollmentCapacity !== 0) {
      writer.uint32(96).int32(message.enrollmentCapacity);
    }
    if (message.enrollmentTotal !== 0) {
      writer.uint32(104).int32(message.enrollmentTotal);
    }
    if (message.waitingCapacity !== 0) {
      writer.uint32(112).int32(message.waitingCapacity);
    }
    if (message.waitingTotal !== 0) {
      writer.uint32(120).int32(message.waitingTotal);
    }
    if (message.topic !== "") {
      writer.uint32(130).string(message.topic);
    }
    for (const v of message.reserves) {
      Reserve.encode(v!, writer.uint32(138).fork()).ldelim();
    }
    for (const v of message.classes) {
      Class.encode(v!, writer.uint32(146).fork()).ldelim();
    }
    for (const v of message.heldWith) {
      writer.uint32(154).string(v!);
    }
    if (message.term !== 0) {
      writer.uint32(160).int32(message.term);
    }
    if (message.academicLevel !== "") {
      writer.uint32(170).string(message.academicLevel);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CourseSchedule {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCourseSchedule } as CourseSchedule;
    message.reserves = [];
    message.classes = [];
    message.heldWith = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.subject = reader.string();
          break;
        case 2:
          message.catalogNumber = reader.string();
          break;
        case 3:
          message.units = reader.float();
          break;
        case 4:
          message.title = reader.string();
          break;
        case 5:
          message.note = reader.string();
          break;
        case 6:
          message.classNumber = reader.int32();
          break;
        case 7:
          message.section = reader.string();
          break;
        case 8:
          message.campus = reader.string();
          break;
        case 9:
          message.associatedClass = reader.int32();
          break;
        case 10:
          message.relatedComponent1 = reader.string();
          break;
        case 11:
          message.relatedComponent2 = reader.string();
          break;
        case 12:
          message.enrollmentCapacity = reader.int32();
          break;
        case 13:
          message.enrollmentTotal = reader.int32();
          break;
        case 14:
          message.waitingCapacity = reader.int32();
          break;
        case 15:
          message.waitingTotal = reader.int32();
          break;
        case 16:
          message.topic = reader.string();
          break;
        case 17:
          message.reserves.push(Reserve.decode(reader, reader.uint32()));
          break;
        case 18:
          message.classes.push(Class.decode(reader, reader.uint32()));
          break;
        case 19:
          message.heldWith.push(reader.string());
          break;
        case 20:
          message.term = reader.int32();
          break;
        case 21:
          message.academicLevel = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CourseSchedule {
    const message = { ...baseCourseSchedule } as CourseSchedule;
    message.reserves = [];
    message.classes = [];
    message.heldWith = [];
    if (object.subject !== undefined && object.subject !== null) {
      message.subject = String(object.subject);
    } else {
      message.subject = "";
    }
    if (object.catalogNumber !== undefined && object.catalogNumber !== null) {
      message.catalogNumber = String(object.catalogNumber);
    } else {
      message.catalogNumber = "";
    }
    if (object.units !== undefined && object.units !== null) {
      message.units = Number(object.units);
    } else {
      message.units = 0;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = "";
    }
    if (object.note !== undefined && object.note !== null) {
      message.note = String(object.note);
    } else {
      message.note = "";
    }
    if (object.classNumber !== undefined && object.classNumber !== null) {
      message.classNumber = Number(object.classNumber);
    } else {
      message.classNumber = 0;
    }
    if (object.section !== undefined && object.section !== null) {
      message.section = String(object.section);
    } else {
      message.section = "";
    }
    if (object.campus !== undefined && object.campus !== null) {
      message.campus = String(object.campus);
    } else {
      message.campus = "";
    }
    if (
      object.associatedClass !== undefined &&
      object.associatedClass !== null
    ) {
      message.associatedClass = Number(object.associatedClass);
    } else {
      message.associatedClass = 0;
    }
    if (
      object.relatedComponent1 !== undefined &&
      object.relatedComponent1 !== null
    ) {
      message.relatedComponent1 = String(object.relatedComponent1);
    } else {
      message.relatedComponent1 = "";
    }
    if (
      object.relatedComponent2 !== undefined &&
      object.relatedComponent2 !== null
    ) {
      message.relatedComponent2 = String(object.relatedComponent2);
    } else {
      message.relatedComponent2 = "";
    }
    if (
      object.enrollmentCapacity !== undefined &&
      object.enrollmentCapacity !== null
    ) {
      message.enrollmentCapacity = Number(object.enrollmentCapacity);
    } else {
      message.enrollmentCapacity = 0;
    }
    if (
      object.enrollmentTotal !== undefined &&
      object.enrollmentTotal !== null
    ) {
      message.enrollmentTotal = Number(object.enrollmentTotal);
    } else {
      message.enrollmentTotal = 0;
    }
    if (
      object.waitingCapacity !== undefined &&
      object.waitingCapacity !== null
    ) {
      message.waitingCapacity = Number(object.waitingCapacity);
    } else {
      message.waitingCapacity = 0;
    }
    if (object.waitingTotal !== undefined && object.waitingTotal !== null) {
      message.waitingTotal = Number(object.waitingTotal);
    } else {
      message.waitingTotal = 0;
    }
    if (object.topic !== undefined && object.topic !== null) {
      message.topic = String(object.topic);
    } else {
      message.topic = "";
    }
    if (object.reserves !== undefined && object.reserves !== null) {
      for (const e of object.reserves) {
        message.reserves.push(Reserve.fromJSON(e));
      }
    }
    if (object.classes !== undefined && object.classes !== null) {
      for (const e of object.classes) {
        message.classes.push(Class.fromJSON(e));
      }
    }
    if (object.heldWith !== undefined && object.heldWith !== null) {
      for (const e of object.heldWith) {
        message.heldWith.push(String(e));
      }
    }
    if (object.term !== undefined && object.term !== null) {
      message.term = Number(object.term);
    } else {
      message.term = 0;
    }
    if (object.academicLevel !== undefined && object.academicLevel !== null) {
      message.academicLevel = String(object.academicLevel);
    } else {
      message.academicLevel = "";
    }
    return message;
  },

  toJSON(message: CourseSchedule): unknown {
    const obj: any = {};
    message.subject !== undefined && (obj.subject = message.subject);
    message.catalogNumber !== undefined &&
      (obj.catalogNumber = message.catalogNumber);
    message.units !== undefined && (obj.units = message.units);
    message.title !== undefined && (obj.title = message.title);
    message.note !== undefined && (obj.note = message.note);
    message.classNumber !== undefined &&
      (obj.classNumber = message.classNumber);
    message.section !== undefined && (obj.section = message.section);
    message.campus !== undefined && (obj.campus = message.campus);
    message.associatedClass !== undefined &&
      (obj.associatedClass = message.associatedClass);
    message.relatedComponent1 !== undefined &&
      (obj.relatedComponent1 = message.relatedComponent1);
    message.relatedComponent2 !== undefined &&
      (obj.relatedComponent2 = message.relatedComponent2);
    message.enrollmentCapacity !== undefined &&
      (obj.enrollmentCapacity = message.enrollmentCapacity);
    message.enrollmentTotal !== undefined &&
      (obj.enrollmentTotal = message.enrollmentTotal);
    message.waitingCapacity !== undefined &&
      (obj.waitingCapacity = message.waitingCapacity);
    message.waitingTotal !== undefined &&
      (obj.waitingTotal = message.waitingTotal);
    message.topic !== undefined && (obj.topic = message.topic);
    if (message.reserves) {
      obj.reserves = message.reserves.map((e) =>
        e ? Reserve.toJSON(e) : undefined
      );
    } else {
      obj.reserves = [];
    }
    if (message.classes) {
      obj.classes = message.classes.map((e) =>
        e ? Class.toJSON(e) : undefined
      );
    } else {
      obj.classes = [];
    }
    if (message.heldWith) {
      obj.heldWith = message.heldWith.map((e) => e);
    } else {
      obj.heldWith = [];
    }
    message.term !== undefined && (obj.term = message.term);
    message.academicLevel !== undefined &&
      (obj.academicLevel = message.academicLevel);
    return obj;
  },

  fromPartial(object: DeepPartial<CourseSchedule>): CourseSchedule {
    const message = { ...baseCourseSchedule } as CourseSchedule;
    message.reserves = [];
    message.classes = [];
    message.heldWith = [];
    if (object.subject !== undefined && object.subject !== null) {
      message.subject = object.subject;
    } else {
      message.subject = "";
    }
    if (object.catalogNumber !== undefined && object.catalogNumber !== null) {
      message.catalogNumber = object.catalogNumber;
    } else {
      message.catalogNumber = "";
    }
    if (object.units !== undefined && object.units !== null) {
      message.units = object.units;
    } else {
      message.units = 0;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    } else {
      message.title = "";
    }
    if (object.note !== undefined && object.note !== null) {
      message.note = object.note;
    } else {
      message.note = "";
    }
    if (object.classNumber !== undefined && object.classNumber !== null) {
      message.classNumber = object.classNumber;
    } else {
      message.classNumber = 0;
    }
    if (object.section !== undefined && object.section !== null) {
      message.section = object.section;
    } else {
      message.section = "";
    }
    if (object.campus !== undefined && object.campus !== null) {
      message.campus = object.campus;
    } else {
      message.campus = "";
    }
    if (
      object.associatedClass !== undefined &&
      object.associatedClass !== null
    ) {
      message.associatedClass = object.associatedClass;
    } else {
      message.associatedClass = 0;
    }
    if (
      object.relatedComponent1 !== undefined &&
      object.relatedComponent1 !== null
    ) {
      message.relatedComponent1 = object.relatedComponent1;
    } else {
      message.relatedComponent1 = "";
    }
    if (
      object.relatedComponent2 !== undefined &&
      object.relatedComponent2 !== null
    ) {
      message.relatedComponent2 = object.relatedComponent2;
    } else {
      message.relatedComponent2 = "";
    }
    if (
      object.enrollmentCapacity !== undefined &&
      object.enrollmentCapacity !== null
    ) {
      message.enrollmentCapacity = object.enrollmentCapacity;
    } else {
      message.enrollmentCapacity = 0;
    }
    if (
      object.enrollmentTotal !== undefined &&
      object.enrollmentTotal !== null
    ) {
      message.enrollmentTotal = object.enrollmentTotal;
    } else {
      message.enrollmentTotal = 0;
    }
    if (
      object.waitingCapacity !== undefined &&
      object.waitingCapacity !== null
    ) {
      message.waitingCapacity = object.waitingCapacity;
    } else {
      message.waitingCapacity = 0;
    }
    if (object.waitingTotal !== undefined && object.waitingTotal !== null) {
      message.waitingTotal = object.waitingTotal;
    } else {
      message.waitingTotal = 0;
    }
    if (object.topic !== undefined && object.topic !== null) {
      message.topic = object.topic;
    } else {
      message.topic = "";
    }
    if (object.reserves !== undefined && object.reserves !== null) {
      for (const e of object.reserves) {
        message.reserves.push(Reserve.fromPartial(e));
      }
    }
    if (object.classes !== undefined && object.classes !== null) {
      for (const e of object.classes) {
        message.classes.push(Class.fromPartial(e));
      }
    }
    if (object.heldWith !== undefined && object.heldWith !== null) {
      for (const e of object.heldWith) {
        message.heldWith.push(e);
      }
    }
    if (object.term !== undefined && object.term !== null) {
      message.term = object.term;
    } else {
      message.term = 0;
    }
    if (object.academicLevel !== undefined && object.academicLevel !== null) {
      message.academicLevel = object.academicLevel;
    } else {
      message.academicLevel = "";
    }
    return message;
  },
};

const baseCourseScheduleResponse: object = {};

export const CourseScheduleResponse = {
  encode(
    message: CourseScheduleResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.data) {
      CourseSchedule.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CourseScheduleResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCourseScheduleResponse } as CourseScheduleResponse;
    message.data = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data.push(CourseSchedule.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CourseScheduleResponse {
    const message = { ...baseCourseScheduleResponse } as CourseScheduleResponse;
    message.data = [];
    if (object.data !== undefined && object.data !== null) {
      for (const e of object.data) {
        message.data.push(CourseSchedule.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: CourseScheduleResponse): unknown {
    const obj: any = {};
    if (message.data) {
      obj.data = message.data.map((e) =>
        e ? CourseSchedule.toJSON(e) : undefined
      );
    } else {
      obj.data = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<CourseScheduleResponse>
  ): CourseScheduleResponse {
    const message = { ...baseCourseScheduleResponse } as CourseScheduleResponse;
    message.data = [];
    if (object.data !== undefined && object.data !== null) {
      for (const e of object.data) {
        message.data.push(CourseSchedule.fromPartial(e));
      }
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
