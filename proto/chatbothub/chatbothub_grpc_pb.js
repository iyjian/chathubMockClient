// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2015 gRPC authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
'use strict';
var grpc = require('grpc');
var chatbothub_pb = require('./chatbothub_pb.js');

function serialize_chatbothub_BotActionReply(arg) {
  if (!(arg instanceof chatbothub_pb.BotActionReply)) {
    throw new Error('Expected argument of type chatbothub.BotActionReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_chatbothub_BotActionReply(buffer_arg) {
  return chatbothub_pb.BotActionReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_chatbothub_BotActionRequest(arg) {
  if (!(arg instanceof chatbothub_pb.BotActionRequest)) {
    throw new Error('Expected argument of type chatbothub.BotActionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_chatbothub_BotActionRequest(buffer_arg) {
  return chatbothub_pb.BotActionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_chatbothub_BotFilterRequest(arg) {
  if (!(arg instanceof chatbothub_pb.BotFilterRequest)) {
    throw new Error('Expected argument of type chatbothub.BotFilterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_chatbothub_BotFilterRequest(buffer_arg) {
  return chatbothub_pb.BotFilterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_chatbothub_BotLoginReply(arg) {
  if (!(arg instanceof chatbothub_pb.BotLoginReply)) {
    throw new Error('Expected argument of type chatbothub.BotLoginReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_chatbothub_BotLoginReply(buffer_arg) {
  return chatbothub_pb.BotLoginReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_chatbothub_BotLoginRequest(arg) {
  if (!(arg instanceof chatbothub_pb.BotLoginRequest)) {
    throw new Error('Expected argument of type chatbothub.BotLoginRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_chatbothub_BotLoginRequest(buffer_arg) {
  return chatbothub_pb.BotLoginRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_chatbothub_BotLogoutRequest(arg) {
  if (!(arg instanceof chatbothub_pb.BotLogoutRequest)) {
    throw new Error('Expected argument of type chatbothub.BotLogoutRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_chatbothub_BotLogoutRequest(buffer_arg) {
  return chatbothub_pb.BotLogoutRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_chatbothub_BotsReply(arg) {
  if (!(arg instanceof chatbothub_pb.BotsReply)) {
    throw new Error('Expected argument of type chatbothub.BotsReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_chatbothub_BotsReply(buffer_arg) {
  return chatbothub_pb.BotsReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_chatbothub_BotsRequest(arg) {
  if (!(arg instanceof chatbothub_pb.BotsRequest)) {
    throw new Error('Expected argument of type chatbothub.BotsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_chatbothub_BotsRequest(buffer_arg) {
  return chatbothub_pb.BotsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_chatbothub_EventReply(arg) {
  if (!(arg instanceof chatbothub_pb.EventReply)) {
    throw new Error('Expected argument of type chatbothub.EventReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_chatbothub_EventReply(buffer_arg) {
  return chatbothub_pb.EventReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_chatbothub_EventRequest(arg) {
  if (!(arg instanceof chatbothub_pb.EventRequest)) {
    throw new Error('Expected argument of type chatbothub.EventRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_chatbothub_EventRequest(buffer_arg) {
  return chatbothub_pb.EventRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_chatbothub_FilterCreateRequest(arg) {
  if (!(arg instanceof chatbothub_pb.FilterCreateRequest)) {
    throw new Error('Expected argument of type chatbothub.FilterCreateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_chatbothub_FilterCreateRequest(buffer_arg) {
  return chatbothub_pb.FilterCreateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_chatbothub_FilterFillReply(arg) {
  if (!(arg instanceof chatbothub_pb.FilterFillReply)) {
    throw new Error('Expected argument of type chatbothub.FilterFillReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_chatbothub_FilterFillReply(buffer_arg) {
  return chatbothub_pb.FilterFillReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_chatbothub_FilterFillRequest(arg) {
  if (!(arg instanceof chatbothub_pb.FilterFillRequest)) {
    throw new Error('Expected argument of type chatbothub.FilterFillRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_chatbothub_FilterFillRequest(buffer_arg) {
  return chatbothub_pb.FilterFillRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_chatbothub_FilterNextRequest(arg) {
  if (!(arg instanceof chatbothub_pb.FilterNextRequest)) {
    throw new Error('Expected argument of type chatbothub.FilterNextRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_chatbothub_FilterNextRequest(buffer_arg) {
  return chatbothub_pb.FilterNextRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_chatbothub_OperationReply(arg) {
  if (!(arg instanceof chatbothub_pb.OperationReply)) {
    throw new Error('Expected argument of type chatbothub.OperationReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_chatbothub_OperationReply(buffer_arg) {
  return chatbothub_pb.OperationReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_chatbothub_RouterBranchRequest(arg) {
  if (!(arg instanceof chatbothub_pb.RouterBranchRequest)) {
    throw new Error('Expected argument of type chatbothub.RouterBranchRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_chatbothub_RouterBranchRequest(buffer_arg) {
  return chatbothub_pb.RouterBranchRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_chatbothub_StreamingCtrlRequest(arg) {
  if (!(arg instanceof chatbothub_pb.StreamingCtrlRequest)) {
    throw new Error('Expected argument of type chatbothub.StreamingCtrlRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_chatbothub_StreamingCtrlRequest(buffer_arg) {
  return chatbothub_pb.StreamingCtrlRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var ChatBotHubService = exports.ChatBotHubService = {
  // bots only use eventtunnel to communicate
  eventTunnel: {
    path: '/chatbothub.ChatBotHub/EventTunnel',
    requestStream: true,
    responseStream: true,
    requestType: chatbothub_pb.EventRequest,
    responseType: chatbothub_pb.EventReply,
    requestSerialize: serialize_chatbothub_EventRequest,
    requestDeserialize: deserialize_chatbothub_EventRequest,
    responseSerialize: serialize_chatbothub_EventReply,
    responseDeserialize: deserialize_chatbothub_EventReply,
  },
  // below are for internal web api
  getBots: {
    path: '/chatbothub.ChatBotHub/GetBots',
    requestStream: false,
    responseStream: false,
    requestType: chatbothub_pb.BotsRequest,
    responseType: chatbothub_pb.BotsReply,
    requestSerialize: serialize_chatbothub_BotsRequest,
    requestDeserialize: deserialize_chatbothub_BotsRequest,
    responseSerialize: serialize_chatbothub_BotsReply,
    responseDeserialize: deserialize_chatbothub_BotsReply,
  },
  botLogin: {
    path: '/chatbothub.ChatBotHub/BotLogin',
    requestStream: false,
    responseStream: false,
    requestType: chatbothub_pb.BotLoginRequest,
    responseType: chatbothub_pb.BotLoginReply,
    requestSerialize: serialize_chatbothub_BotLoginRequest,
    requestDeserialize: deserialize_chatbothub_BotLoginRequest,
    responseSerialize: serialize_chatbothub_BotLoginReply,
    responseDeserialize: deserialize_chatbothub_BotLoginReply,
  },
  botLogout: {
    path: '/chatbothub.ChatBotHub/BotLogout',
    requestStream: false,
    responseStream: false,
    requestType: chatbothub_pb.BotLogoutRequest,
    responseType: chatbothub_pb.OperationReply,
    requestSerialize: serialize_chatbothub_BotLogoutRequest,
    requestDeserialize: deserialize_chatbothub_BotLogoutRequest,
    responseSerialize: serialize_chatbothub_OperationReply,
    responseDeserialize: deserialize_chatbothub_OperationReply,
  },
  botShutdown: {
    path: '/chatbothub.ChatBotHub/BotShutdown',
    requestStream: false,
    responseStream: false,
    requestType: chatbothub_pb.BotLogoutRequest,
    responseType: chatbothub_pb.OperationReply,
    requestSerialize: serialize_chatbothub_BotLogoutRequest,
    requestDeserialize: deserialize_chatbothub_BotLogoutRequest,
    responseSerialize: serialize_chatbothub_OperationReply,
    responseDeserialize: deserialize_chatbothub_OperationReply,
  },
  botAction: {
    path: '/chatbothub.ChatBotHub/BotAction',
    requestStream: false,
    responseStream: false,
    requestType: chatbothub_pb.BotActionRequest,
    responseType: chatbothub_pb.BotActionReply,
    requestSerialize: serialize_chatbothub_BotActionRequest,
    requestDeserialize: deserialize_chatbothub_BotActionRequest,
    responseSerialize: serialize_chatbothub_BotActionReply,
    responseDeserialize: deserialize_chatbothub_BotActionReply,
  },
  botFilter: {
    path: '/chatbothub.ChatBotHub/BotFilter',
    requestStream: false,
    responseStream: false,
    requestType: chatbothub_pb.BotFilterRequest,
    responseType: chatbothub_pb.OperationReply,
    requestSerialize: serialize_chatbothub_BotFilterRequest,
    requestDeserialize: deserialize_chatbothub_BotFilterRequest,
    responseSerialize: serialize_chatbothub_OperationReply,
    responseDeserialize: deserialize_chatbothub_OperationReply,
  },
  botMomentFilter: {
    path: '/chatbothub.ChatBotHub/BotMomentFilter',
    requestStream: false,
    responseStream: false,
    requestType: chatbothub_pb.BotFilterRequest,
    responseType: chatbothub_pb.OperationReply,
    requestSerialize: serialize_chatbothub_BotFilterRequest,
    requestDeserialize: deserialize_chatbothub_BotFilterRequest,
    responseSerialize: serialize_chatbothub_OperationReply,
    responseDeserialize: deserialize_chatbothub_OperationReply,
  },
  filterCreate: {
    path: '/chatbothub.ChatBotHub/FilterCreate',
    requestStream: false,
    responseStream: false,
    requestType: chatbothub_pb.FilterCreateRequest,
    responseType: chatbothub_pb.OperationReply,
    requestSerialize: serialize_chatbothub_FilterCreateRequest,
    requestDeserialize: deserialize_chatbothub_FilterCreateRequest,
    responseSerialize: serialize_chatbothub_OperationReply,
    responseDeserialize: deserialize_chatbothub_OperationReply,
  },
  filterNext: {
    path: '/chatbothub.ChatBotHub/FilterNext',
    requestStream: false,
    responseStream: false,
    requestType: chatbothub_pb.FilterNextRequest,
    responseType: chatbothub_pb.OperationReply,
    requestSerialize: serialize_chatbothub_FilterNextRequest,
    requestDeserialize: deserialize_chatbothub_FilterNextRequest,
    responseSerialize: serialize_chatbothub_OperationReply,
    responseDeserialize: deserialize_chatbothub_OperationReply,
  },
  routerBranch: {
    path: '/chatbothub.ChatBotHub/RouterBranch',
    requestStream: false,
    responseStream: false,
    requestType: chatbothub_pb.RouterBranchRequest,
    responseType: chatbothub_pb.OperationReply,
    requestSerialize: serialize_chatbothub_RouterBranchRequest,
    requestDeserialize: deserialize_chatbothub_RouterBranchRequest,
    responseSerialize: serialize_chatbothub_OperationReply,
    responseDeserialize: deserialize_chatbothub_OperationReply,
  },
  filterFill: {
    path: '/chatbothub.ChatBotHub/FilterFill',
    requestStream: false,
    responseStream: false,
    requestType: chatbothub_pb.FilterFillRequest,
    responseType: chatbothub_pb.FilterFillReply,
    requestSerialize: serialize_chatbothub_FilterFillRequest,
    requestDeserialize: deserialize_chatbothub_FilterFillRequest,
    responseSerialize: serialize_chatbothub_FilterFillReply,
    responseDeserialize: deserialize_chatbothub_FilterFillReply,
  },
  webShortCallResponse: {
    path: '/chatbothub.ChatBotHub/WebShortCallResponse',
    requestStream: false,
    responseStream: false,
    requestType: chatbothub_pb.EventReply,
    responseType: chatbothub_pb.OperationReply,
    requestSerialize: serialize_chatbothub_EventReply,
    requestDeserialize: deserialize_chatbothub_EventReply,
    responseSerialize: serialize_chatbothub_OperationReply,
    responseDeserialize: deserialize_chatbothub_OperationReply,
  },
  // tunnel that connect streaming server and chathub server
  streamingTunnel: {
    path: '/chatbothub.ChatBotHub/StreamingTunnel',
    requestStream: true,
    responseStream: true,
    requestType: chatbothub_pb.EventRequest,
    responseType: chatbothub_pb.EventReply,
    requestSerialize: serialize_chatbothub_EventRequest,
    requestDeserialize: deserialize_chatbothub_EventRequest,
    responseSerialize: serialize_chatbothub_EventReply,
    responseDeserialize: deserialize_chatbothub_EventReply,
  },
  // streaming rpc
  streamingCtrl: {
    path: '/chatbothub.ChatBotHub/StreamingCtrl',
    requestStream: false,
    responseStream: false,
    requestType: chatbothub_pb.StreamingCtrlRequest,
    responseType: chatbothub_pb.OperationReply,
    requestSerialize: serialize_chatbothub_StreamingCtrlRequest,
    requestDeserialize: deserialize_chatbothub_StreamingCtrlRequest,
    responseSerialize: serialize_chatbothub_OperationReply,
    responseDeserialize: deserialize_chatbothub_OperationReply,
  },
};

exports.ChatBotHubClient = grpc.makeGenericClientConstructor(ChatBotHubService);
