/**
 * @fileoverview gRPC-Web generated client stub for ogtemplate
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.ogtemplate = require('./ogtemplate_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.ogtemplate.ChatReqClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.ogtemplate.ChatReqPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ogtemplate.Req,
 *   !proto.ogtemplate.Msg>}
 */
const methodDescriptor_ChatReq_ConnectServer = new grpc.web.MethodDescriptor(
  '/ogtemplate.ChatReq/ConnectServer',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.ogtemplate.Req,
  proto.ogtemplate.Msg,
  /**
   * @param {!proto.ogtemplate.Req} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ogtemplate.Msg.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ogtemplate.Req,
 *   !proto.ogtemplate.Msg>}
 */
const methodInfo_ChatReq_ConnectServer = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ogtemplate.Msg,
  /**
   * @param {!proto.ogtemplate.Req} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ogtemplate.Msg.deserializeBinary
);


/**
 * @param {!proto.ogtemplate.Req} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.ogtemplate.Msg>}
 *     The XHR Node Readable Stream
 */
proto.ogtemplate.ChatReqClient.prototype.connectServer =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/ogtemplate.ChatReq/ConnectServer',
      request,
      metadata || {},
      methodDescriptor_ChatReq_ConnectServer);
};


/**
 * @param {!proto.ogtemplate.Req} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.ogtemplate.Msg>}
 *     The XHR Node Readable Stream
 */
proto.ogtemplate.ChatReqPromiseClient.prototype.connectServer =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/ogtemplate.ChatReq/ConnectServer',
      request,
      metadata || {},
      methodDescriptor_ChatReq_ConnectServer);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ogtemplate.Msg,
 *   !proto.ogtemplate.ResponseArray>}
 */
const methodDescriptor_ChatReq_Sending = new grpc.web.MethodDescriptor(
  '/ogtemplate.ChatReq/Sending',
  grpc.web.MethodType.UNARY,
  proto.ogtemplate.Msg,
  proto.ogtemplate.ResponseArray,
  /**
   * @param {!proto.ogtemplate.Msg} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ogtemplate.ResponseArray.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ogtemplate.Msg,
 *   !proto.ogtemplate.ResponseArray>}
 */
const methodInfo_ChatReq_Sending = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ogtemplate.ResponseArray,
  /**
   * @param {!proto.ogtemplate.Msg} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ogtemplate.ResponseArray.deserializeBinary
);


/**
 * @param {!proto.ogtemplate.Msg} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ogtemplate.ResponseArray)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ogtemplate.ResponseArray>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ogtemplate.ChatReqClient.prototype.sending =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ogtemplate.ChatReq/Sending',
      request,
      metadata || {},
      methodDescriptor_ChatReq_Sending,
      callback);
};


/**
 * @param {!proto.ogtemplate.Msg} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ogtemplate.ResponseArray>}
 *     Promise that resolves to the response
 */
proto.ogtemplate.ChatReqPromiseClient.prototype.sending =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ogtemplate.ChatReq/Sending',
      request,
      metadata || {},
      methodDescriptor_ChatReq_Sending);
};


module.exports = proto.ogtemplate;

