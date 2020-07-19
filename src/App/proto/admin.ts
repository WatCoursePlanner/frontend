/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


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

export interface ReParseRegressionTestResponse {
  total: number;
  regressionNum: number;
  results: ReParseRegressionTestResponse_Result[];
}

export interface ReParseRegressionTestResponse_Result {
  rawRule: string;
  old: string;
  new: string;
  error: string;
}

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

const baseReParseRegressionTestResponse: object = {
  total: 0,
  regressionNum: 0,
};

const baseReParseRegressionTestResponse_Result: object = {
  rawRule: "",
  old: "",
  new: "",
  error: "",
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

export const ReParseRegressionTestResponse = {
  encode(message: ReParseRegressionTestResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.total);
    writer.uint32(16).int32(message.regressionNum);
    for (const v of message.results) {
      ReParseRegressionTestResponse_Result.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ReParseRegressionTestResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseReParseRegressionTestResponse } as ReParseRegressionTestResponse;
    message.results = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.total = reader.int32();
          break;
        case 2:
          message.regressionNum = reader.int32();
          break;
        case 3:
          message.results.push(ReParseRegressionTestResponse_Result.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ReParseRegressionTestResponse {
    const message = { ...baseReParseRegressionTestResponse } as ReParseRegressionTestResponse;
    message.results = [];
    if (object.total !== undefined && object.total !== null) {
      message.total = Number(object.total);
    } else {
      message.total = 0;
    }
    if (object.regressionNum !== undefined && object.regressionNum !== null) {
      message.regressionNum = Number(object.regressionNum);
    } else {
      message.regressionNum = 0;
    }
    if (object.results !== undefined && object.results !== null) {
      for (const e of object.results) {
        message.results.push(ReParseRegressionTestResponse_Result.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<ReParseRegressionTestResponse>): ReParseRegressionTestResponse {
    const message = { ...baseReParseRegressionTestResponse } as ReParseRegressionTestResponse;
    message.results = [];
    if (object.total !== undefined && object.total !== null) {
      message.total = object.total;
    } else {
      message.total = 0;
    }
    if (object.regressionNum !== undefined && object.regressionNum !== null) {
      message.regressionNum = object.regressionNum;
    } else {
      message.regressionNum = 0;
    }
    if (object.results !== undefined && object.results !== null) {
      for (const e of object.results) {
        message.results.push(ReParseRegressionTestResponse_Result.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: ReParseRegressionTestResponse): unknown {
    const obj: any = {};
    obj.total = message.total || 0;
    obj.regressionNum = message.regressionNum || 0;
    if (message.results) {
      obj.results = message.results.map(e => e ? ReParseRegressionTestResponse_Result.toJSON(e) : undefined);
    } else {
      obj.results = [];
    }
    return obj;
  },
};

export const ReParseRegressionTestResponse_Result = {
  encode(message: ReParseRegressionTestResponse_Result, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.rawRule);
    writer.uint32(18).string(message.old);
    writer.uint32(26).string(message.new);
    writer.uint32(34).string(message.error);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ReParseRegressionTestResponse_Result {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseReParseRegressionTestResponse_Result } as ReParseRegressionTestResponse_Result;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rawRule = reader.string();
          break;
        case 2:
          message.old = reader.string();
          break;
        case 3:
          message.new = reader.string();
          break;
        case 4:
          message.error = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ReParseRegressionTestResponse_Result {
    const message = { ...baseReParseRegressionTestResponse_Result } as ReParseRegressionTestResponse_Result;
    if (object.rawRule !== undefined && object.rawRule !== null) {
      message.rawRule = String(object.rawRule);
    } else {
      message.rawRule = "";
    }
    if (object.old !== undefined && object.old !== null) {
      message.old = String(object.old);
    } else {
      message.old = "";
    }
    if (object.new !== undefined && object.new !== null) {
      message.new = String(object.new);
    } else {
      message.new = "";
    }
    if (object.error !== undefined && object.error !== null) {
      message.error = String(object.error);
    } else {
      message.error = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<ReParseRegressionTestResponse_Result>): ReParseRegressionTestResponse_Result {
    const message = { ...baseReParseRegressionTestResponse_Result } as ReParseRegressionTestResponse_Result;
    if (object.rawRule !== undefined && object.rawRule !== null) {
      message.rawRule = object.rawRule;
    } else {
      message.rawRule = "";
    }
    if (object.old !== undefined && object.old !== null) {
      message.old = object.old;
    } else {
      message.old = "";
    }
    if (object.new !== undefined && object.new !== null) {
      message.new = object.new;
    } else {
      message.new = "";
    }
    if (object.error !== undefined && object.error !== null) {
      message.error = object.error;
    } else {
      message.error = "";
    }
    return message;
  },
  toJSON(message: ReParseRegressionTestResponse_Result): unknown {
    const obj: any = {};
    obj.rawRule = message.rawRule || "";
    obj.old = message.old || "";
    obj.new = message.new || "";
    obj.error = message.error || "";
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