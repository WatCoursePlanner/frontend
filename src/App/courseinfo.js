// source: proto/courses.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

goog.provide('proto.com.watcourses.wat_courses.proto.CourseInfo');

goog.require('jspb.BinaryReader');
goog.require('jspb.BinaryWriter');
goog.require('jspb.Message');

goog.forwardDeclare('proto.com.watcourses.wat_courses.proto.Term');
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.com.watcourses.wat_courses.proto.CourseInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.com.watcourses.wat_courses.proto.CourseInfo.repeatedFields_, null);
};
goog.inherits(proto.com.watcourses.wat_courses.proto.CourseInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.com.watcourses.wat_courses.proto.CourseInfo.displayName = 'proto.com.watcourses.wat_courses.proto.CourseInfo';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.repeatedFields_ = [5];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.com.watcourses.wat_courses.proto.CourseInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.com.watcourses.wat_courses.proto.CourseInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: (f = jspb.Message.getField(msg, 1)) == null ? undefined : f,
    code: (f = jspb.Message.getField(msg, 2)) == null ? undefined : f,
    description: (f = jspb.Message.getField(msg, 3)) == null ? undefined : f,
    faculty: (f = jspb.Message.getField(msg, 4)) == null ? undefined : f,
    offeringTermsList: (f = jspb.Message.getRepeatedField(msg, 5)) == null ? undefined : f,
    id: (f = jspb.Message.getField(msg, 6)) == null ? undefined : f,
    preRequisiteLogicStr: (f = jspb.Message.getField(msg, 7)) == null ? undefined : f,
    coRequisiteLogicStr: (f = jspb.Message.getField(msg, 8)) == null ? undefined : f,
    antiRequisiteLogicStr: (f = jspb.Message.getField(msg, 9)) == null ? undefined : f,
    preRequisite: (f = jspb.Message.getField(msg, 10)) == null ? undefined : f,
    coRequisite: (f = jspb.Message.getField(msg, 11)) == null ? undefined : f,
    antiRequisite: (f = jspb.Message.getField(msg, 12)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.com.watcourses.wat_courses.proto.CourseInfo}
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.com.watcourses.wat_courses.proto.CourseInfo;
  return proto.com.watcourses.wat_courses.proto.CourseInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.com.watcourses.wat_courses.proto.CourseInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.com.watcourses.wat_courses.proto.CourseInfo}
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setCode(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setDescription(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setFaculty(value);
      break;
    case 5:
      var value = /** @type {!proto.com.watcourses.wat_courses.proto.Term} */ (reader.readEnum());
      msg.addOfferingTerms(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setPreRequisiteLogicStr(value);
      break;
    case 8:
      var value = /** @type {string} */ (reader.readString());
      msg.setCoRequisiteLogicStr(value);
      break;
    case 9:
      var value = /** @type {string} */ (reader.readString());
      msg.setAntiRequisiteLogicStr(value);
      break;
    case 10:
      var value = /** @type {string} */ (reader.readString());
      msg.setPreRequisite(value);
      break;
    case 11:
      var value = /** @type {string} */ (reader.readString());
      msg.setCoRequisite(value);
      break;
    case 12:
      var value = /** @type {string} */ (reader.readString());
      msg.setAntiRequisite(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.com.watcourses.wat_courses.proto.CourseInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.com.watcourses.wat_courses.proto.CourseInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeString(
      1,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeString(
      2,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeString(
      3,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getOfferingTermsList();
  if (f.length > 0) {
    writer.writeRepeatedEnum(
      5,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 6));
  if (f != null) {
    writer.writeString(
      6,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 7));
  if (f != null) {
    writer.writeString(
      7,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 8));
  if (f != null) {
    writer.writeString(
      8,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 9));
  if (f != null) {
    writer.writeString(
      9,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 10));
  if (f != null) {
    writer.writeString(
      10,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 11));
  if (f != null) {
    writer.writeString(
      11,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 12));
  if (f != null) {
    writer.writeString(
      12,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.com.watcourses.wat_courses.proto.CourseInfo} returns this
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.setName = function(value) {
  return jspb.Message.setField(this, 1, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.com.watcourses.wat_courses.proto.CourseInfo} returns this
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.clearName = function() {
  return jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.hasName = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string code = 2;
 * @return {string}
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.getCode = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.com.watcourses.wat_courses.proto.CourseInfo} returns this
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.setCode = function(value) {
  return jspb.Message.setField(this, 2, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.com.watcourses.wat_courses.proto.CourseInfo} returns this
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.clearCode = function() {
  return jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.hasCode = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional string description = 3;
 * @return {string}
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.com.watcourses.wat_courses.proto.CourseInfo} returns this
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.setDescription = function(value) {
  return jspb.Message.setField(this, 3, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.com.watcourses.wat_courses.proto.CourseInfo} returns this
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.clearDescription = function() {
  return jspb.Message.setField(this, 3, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.hasDescription = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional string faculty = 4;
 * @return {string}
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.getFaculty = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.com.watcourses.wat_courses.proto.CourseInfo} returns this
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.setFaculty = function(value) {
  return jspb.Message.setField(this, 4, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.com.watcourses.wat_courses.proto.CourseInfo} returns this
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.clearFaculty = function() {
  return jspb.Message.setField(this, 4, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.hasFaculty = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * repeated Term offering_terms = 5;
 * @return {!Array<!proto.com.watcourses.wat_courses.proto.Term>}
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.getOfferingTermsList = function() {
  return /** @type {!Array<!proto.com.watcourses.wat_courses.proto.Term>} */ (jspb.Message.getRepeatedField(this, 5));
};


/**
 * @param {!Array<!proto.com.watcourses.wat_courses.proto.Term>} value
 * @return {!proto.com.watcourses.wat_courses.proto.CourseInfo} returns this
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.setOfferingTermsList = function(value) {
  return jspb.Message.setField(this, 5, value || []);
};


/**
 * @param {!proto.com.watcourses.wat_courses.proto.Term} value
 * @param {number=} opt_index
 * @return {!proto.com.watcourses.wat_courses.proto.CourseInfo} returns this
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.addOfferingTerms = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 5, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.com.watcourses.wat_courses.proto.CourseInfo} returns this
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.clearOfferingTermsList = function() {
  return this.setOfferingTermsList([]);
};


/**
 * optional string id = 6;
 * @return {string}
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.com.watcourses.wat_courses.proto.CourseInfo} returns this
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.setId = function(value) {
  return jspb.Message.setField(this, 6, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.com.watcourses.wat_courses.proto.CourseInfo} returns this
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.clearId = function() {
  return jspb.Message.setField(this, 6, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.hasId = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional string pre_requisite_logic_str = 7;
 * @return {string}
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.getPreRequisiteLogicStr = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.com.watcourses.wat_courses.proto.CourseInfo} returns this
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.setPreRequisiteLogicStr = function(value) {
  return jspb.Message.setField(this, 7, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.com.watcourses.wat_courses.proto.CourseInfo} returns this
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.clearPreRequisiteLogicStr = function() {
  return jspb.Message.setField(this, 7, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.hasPreRequisiteLogicStr = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional string co_requisite_logic_str = 8;
 * @return {string}
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.getCoRequisiteLogicStr = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 8, ""));
};


/**
 * @param {string} value
 * @return {!proto.com.watcourses.wat_courses.proto.CourseInfo} returns this
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.setCoRequisiteLogicStr = function(value) {
  return jspb.Message.setField(this, 8, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.com.watcourses.wat_courses.proto.CourseInfo} returns this
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.clearCoRequisiteLogicStr = function() {
  return jspb.Message.setField(this, 8, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.hasCoRequisiteLogicStr = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional string anti_requisite_logic_str = 9;
 * @return {string}
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.getAntiRequisiteLogicStr = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 9, ""));
};


/**
 * @param {string} value
 * @return {!proto.com.watcourses.wat_courses.proto.CourseInfo} returns this
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.setAntiRequisiteLogicStr = function(value) {
  return jspb.Message.setField(this, 9, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.com.watcourses.wat_courses.proto.CourseInfo} returns this
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.clearAntiRequisiteLogicStr = function() {
  return jspb.Message.setField(this, 9, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.hasAntiRequisiteLogicStr = function() {
  return jspb.Message.getField(this, 9) != null;
};


/**
 * optional string pre_requisite = 10;
 * @return {string}
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.getPreRequisite = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 10, ""));
};


/**
 * @param {string} value
 * @return {!proto.com.watcourses.wat_courses.proto.CourseInfo} returns this
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.setPreRequisite = function(value) {
  return jspb.Message.setField(this, 10, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.com.watcourses.wat_courses.proto.CourseInfo} returns this
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.clearPreRequisite = function() {
  return jspb.Message.setField(this, 10, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.hasPreRequisite = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * optional string co_requisite = 11;
 * @return {string}
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.getCoRequisite = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 11, ""));
};


/**
 * @param {string} value
 * @return {!proto.com.watcourses.wat_courses.proto.CourseInfo} returns this
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.setCoRequisite = function(value) {
  return jspb.Message.setField(this, 11, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.com.watcourses.wat_courses.proto.CourseInfo} returns this
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.clearCoRequisite = function() {
  return jspb.Message.setField(this, 11, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.hasCoRequisite = function() {
  return jspb.Message.getField(this, 11) != null;
};


/**
 * optional string anti_requisite = 12;
 * @return {string}
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.getAntiRequisite = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 12, ""));
};


/**
 * @param {string} value
 * @return {!proto.com.watcourses.wat_courses.proto.CourseInfo} returns this
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.setAntiRequisite = function(value) {
  return jspb.Message.setField(this, 12, value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.com.watcourses.wat_courses.proto.CourseInfo} returns this
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.clearAntiRequisite = function() {
  return jspb.Message.setField(this, 12, undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.com.watcourses.wat_courses.proto.CourseInfo.prototype.hasAntiRequisite = function() {
  return jspb.Message.getField(this, 12) != null;
};

