/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "com.watcourses.wat_courses.proto";

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  pictureUrl: string;
}

export interface LoginOrRegisterResponse {
  success: boolean;
  reason: string;
  userInfo: UserInfo | undefined;
}

/** For a new user who uses email+password login: RegisterRequest -> LoginOrRegisterResponse */
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

/** For an existing user who uses email+password login: LoginRequest -> LoginOrRegisterResponse */
export interface LoginRequest {
  email: string;
  password: string;
}

/** For a new/existing user who uses Google to login: GoogleLoginOrRegisterRequest -> LoginOrRegisterResponse */
export interface GoogleLoginOrRegisterRequest {
  token: string;
}

export interface SetUserDataRequest {
  data: string;
}

const baseUserInfo: object = {
  firstName: "",
  lastName: "",
  email: "",
  pictureUrl: "",
};

export const UserInfo = {
  encode(message: UserInfo, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.firstName);
    writer.uint32(18).string(message.lastName);
    writer.uint32(26).string(message.email);
    writer.uint32(34).string(message.pictureUrl);
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): UserInfo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUserInfo } as UserInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.firstName = reader.string();
          break;
        case 2:
          message.lastName = reader.string();
          break;
        case 3:
          message.email = reader.string();
          break;
        case 4:
          message.pictureUrl = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UserInfo {
    const message = { ...baseUserInfo } as UserInfo;
    if (object.firstName !== undefined && object.firstName !== null) {
      message.firstName = String(object.firstName);
    } else {
      message.firstName = "";
    }
    if (object.lastName !== undefined && object.lastName !== null) {
      message.lastName = String(object.lastName);
    } else {
      message.lastName = "";
    }
    if (object.email !== undefined && object.email !== null) {
      message.email = String(object.email);
    } else {
      message.email = "";
    }
    if (object.pictureUrl !== undefined && object.pictureUrl !== null) {
      message.pictureUrl = String(object.pictureUrl);
    } else {
      message.pictureUrl = "";
    }
    return message;
  },

  fromPartial(object: DeepPartial<UserInfo>): UserInfo {
    const message = { ...baseUserInfo } as UserInfo;
    if (object.firstName !== undefined && object.firstName !== null) {
      message.firstName = object.firstName;
    } else {
      message.firstName = "";
    }
    if (object.lastName !== undefined && object.lastName !== null) {
      message.lastName = object.lastName;
    } else {
      message.lastName = "";
    }
    if (object.email !== undefined && object.email !== null) {
      message.email = object.email;
    } else {
      message.email = "";
    }
    if (object.pictureUrl !== undefined && object.pictureUrl !== null) {
      message.pictureUrl = object.pictureUrl;
    } else {
      message.pictureUrl = "";
    }
    return message;
  },

  toJSON(message: UserInfo): unknown {
    const obj: any = {};
    message.firstName !== undefined && (obj.firstName = message.firstName);
    message.lastName !== undefined && (obj.lastName = message.lastName);
    message.email !== undefined && (obj.email = message.email);
    message.pictureUrl !== undefined && (obj.pictureUrl = message.pictureUrl);
    return obj;
  },
};

const baseLoginOrRegisterResponse: object = { success: false, reason: "" };

export const LoginOrRegisterResponse = {
  encode(
    message: LoginOrRegisterResponse,
    writer: Writer = Writer.create()
  ): Writer {
    writer.uint32(8).bool(message.success);
    writer.uint32(18).string(message.reason);
    if (message.userInfo !== undefined && message.userInfo !== undefined) {
      UserInfo.encode(message.userInfo, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): LoginOrRegisterResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseLoginOrRegisterResponse,
    } as LoginOrRegisterResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 2:
          message.reason = reader.string();
          break;
        case 3:
          message.userInfo = UserInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LoginOrRegisterResponse {
    const message = {
      ...baseLoginOrRegisterResponse,
    } as LoginOrRegisterResponse;
    if (object.success !== undefined && object.success !== null) {
      message.success = Boolean(object.success);
    } else {
      message.success = false;
    }
    if (object.reason !== undefined && object.reason !== null) {
      message.reason = String(object.reason);
    } else {
      message.reason = "";
    }
    if (object.userInfo !== undefined && object.userInfo !== null) {
      message.userInfo = UserInfo.fromJSON(object.userInfo);
    } else {
      message.userInfo = undefined;
    }
    return message;
  },

  fromPartial(
    object: DeepPartial<LoginOrRegisterResponse>
  ): LoginOrRegisterResponse {
    const message = {
      ...baseLoginOrRegisterResponse,
    } as LoginOrRegisterResponse;
    if (object.success !== undefined && object.success !== null) {
      message.success = object.success;
    } else {
      message.success = false;
    }
    if (object.reason !== undefined && object.reason !== null) {
      message.reason = object.reason;
    } else {
      message.reason = "";
    }
    if (object.userInfo !== undefined && object.userInfo !== null) {
      message.userInfo = UserInfo.fromPartial(object.userInfo);
    } else {
      message.userInfo = undefined;
    }
    return message;
  },

  toJSON(message: LoginOrRegisterResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.reason !== undefined && (obj.reason = message.reason);
    message.userInfo !== undefined &&
      (obj.userInfo = message.userInfo
        ? UserInfo.toJSON(message.userInfo)
        : undefined);
    return obj;
  },
};

const baseRegisterRequest: object = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export const RegisterRequest = {
  encode(message: RegisterRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.firstName);
    writer.uint32(18).string(message.lastName);
    writer.uint32(26).string(message.email);
    writer.uint32(34).string(message.password);
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RegisterRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRegisterRequest } as RegisterRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.firstName = reader.string();
          break;
        case 2:
          message.lastName = reader.string();
          break;
        case 3:
          message.email = reader.string();
          break;
        case 4:
          message.password = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegisterRequest {
    const message = { ...baseRegisterRequest } as RegisterRequest;
    if (object.firstName !== undefined && object.firstName !== null) {
      message.firstName = String(object.firstName);
    } else {
      message.firstName = "";
    }
    if (object.lastName !== undefined && object.lastName !== null) {
      message.lastName = String(object.lastName);
    } else {
      message.lastName = "";
    }
    if (object.email !== undefined && object.email !== null) {
      message.email = String(object.email);
    } else {
      message.email = "";
    }
    if (object.password !== undefined && object.password !== null) {
      message.password = String(object.password);
    } else {
      message.password = "";
    }
    return message;
  },

  fromPartial(object: DeepPartial<RegisterRequest>): RegisterRequest {
    const message = { ...baseRegisterRequest } as RegisterRequest;
    if (object.firstName !== undefined && object.firstName !== null) {
      message.firstName = object.firstName;
    } else {
      message.firstName = "";
    }
    if (object.lastName !== undefined && object.lastName !== null) {
      message.lastName = object.lastName;
    } else {
      message.lastName = "";
    }
    if (object.email !== undefined && object.email !== null) {
      message.email = object.email;
    } else {
      message.email = "";
    }
    if (object.password !== undefined && object.password !== null) {
      message.password = object.password;
    } else {
      message.password = "";
    }
    return message;
  },

  toJSON(message: RegisterRequest): unknown {
    const obj: any = {};
    message.firstName !== undefined && (obj.firstName = message.firstName);
    message.lastName !== undefined && (obj.lastName = message.lastName);
    message.email !== undefined && (obj.email = message.email);
    message.password !== undefined && (obj.password = message.password);
    return obj;
  },
};

const baseLoginRequest: object = { email: "", password: "" };

export const LoginRequest = {
  encode(message: LoginRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.email);
    writer.uint32(18).string(message.password);
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): LoginRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseLoginRequest } as LoginRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.email = reader.string();
          break;
        case 2:
          message.password = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LoginRequest {
    const message = { ...baseLoginRequest } as LoginRequest;
    if (object.email !== undefined && object.email !== null) {
      message.email = String(object.email);
    } else {
      message.email = "";
    }
    if (object.password !== undefined && object.password !== null) {
      message.password = String(object.password);
    } else {
      message.password = "";
    }
    return message;
  },

  fromPartial(object: DeepPartial<LoginRequest>): LoginRequest {
    const message = { ...baseLoginRequest } as LoginRequest;
    if (object.email !== undefined && object.email !== null) {
      message.email = object.email;
    } else {
      message.email = "";
    }
    if (object.password !== undefined && object.password !== null) {
      message.password = object.password;
    } else {
      message.password = "";
    }
    return message;
  },

  toJSON(message: LoginRequest): unknown {
    const obj: any = {};
    message.email !== undefined && (obj.email = message.email);
    message.password !== undefined && (obj.password = message.password);
    return obj;
  },
};

const baseGoogleLoginOrRegisterRequest: object = { token: "" };

export const GoogleLoginOrRegisterRequest = {
  encode(
    message: GoogleLoginOrRegisterRequest,
    writer: Writer = Writer.create()
  ): Writer {
    writer.uint32(10).string(message.token);
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): GoogleLoginOrRegisterRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGoogleLoginOrRegisterRequest,
    } as GoogleLoginOrRegisterRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GoogleLoginOrRegisterRequest {
    const message = {
      ...baseGoogleLoginOrRegisterRequest,
    } as GoogleLoginOrRegisterRequest;
    if (object.token !== undefined && object.token !== null) {
      message.token = String(object.token);
    } else {
      message.token = "";
    }
    return message;
  },

  fromPartial(
    object: DeepPartial<GoogleLoginOrRegisterRequest>
  ): GoogleLoginOrRegisterRequest {
    const message = {
      ...baseGoogleLoginOrRegisterRequest,
    } as GoogleLoginOrRegisterRequest;
    if (object.token !== undefined && object.token !== null) {
      message.token = object.token;
    } else {
      message.token = "";
    }
    return message;
  },

  toJSON(message: GoogleLoginOrRegisterRequest): unknown {
    const obj: any = {};
    message.token !== undefined && (obj.token = message.token);
    return obj;
  },
};

const baseSetUserDataRequest: object = { data: "" };

export const SetUserDataRequest = {
  encode(
    message: SetUserDataRequest,
    writer: Writer = Writer.create()
  ): Writer {
    writer.uint32(10).string(message.data);
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SetUserDataRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSetUserDataRequest } as SetUserDataRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetUserDataRequest {
    const message = { ...baseSetUserDataRequest } as SetUserDataRequest;
    if (object.data !== undefined && object.data !== null) {
      message.data = String(object.data);
    } else {
      message.data = "";
    }
    return message;
  },

  fromPartial(object: DeepPartial<SetUserDataRequest>): SetUserDataRequest {
    const message = { ...baseSetUserDataRequest } as SetUserDataRequest;
    if (object.data !== undefined && object.data !== null) {
      message.data = object.data;
    } else {
      message.data = "";
    }
    return message;
  },

  toJSON(message: SetUserDataRequest): unknown {
    const obj: any = {};
    message.data !== undefined && (obj.data = message.data);
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
