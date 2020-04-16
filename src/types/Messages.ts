import { TezosOperation } from '../operations/OperationTypes'

export enum PermissionScope {
  READ_ADDRESS = 'read_address',
  SIGN = 'sign',
  OPERATION_REQUEST = 'operation_request',
  THRESHOLD = 'threshold'
}

export enum MessageType {
  PermissionRequest = 'permission_request',
  SignPayloadRequest = 'sign_payload_request',
  OperationRequest = 'operation_request',
  BroadcastRequest = 'broadcast_request',
  PermissionResponse = 'permission_response',
  SignPayloadResponse = 'sign_payload_response',
  OperationResponse = 'operation_response',
  BroadcastResponse = 'broadcast_response'
}

export type Messages =
  | PermissionRequest
  | PermissionResponse
  | SignPayloadRequest
  | SignPayloadResponse
  | OperationRequest
  | OperationResponse
  | BroadcastRequest
  | BroadcastResponse

export interface BaseMessage {
  id: string // ID of the message. The same ID is used in the request and response
  beaconId: string // ID of the sender. Public Key. This is used to identify the sender of the message
  // TODO: We could add a signature so people can not spoof which dApp the request came from
  type: MessageType
}

export enum NetworkType {
  MAINNET = 'mainnet',
  CUSTOM = 'custom'
}
// TODO: Create API with testnets

export interface Network {
  type: NetworkType
  name?: string
  rpcUrl?: string
}

export interface AppMetadata {
  name: string
  icon?: string // URL
}

export interface PermissionRequest extends BaseMessage {
  type: MessageType.PermissionRequest
  appMetadata: AppMetadata
  network: Network
  scopes: PermissionScope[]
}

export interface PermissionResponse extends BaseMessage {
  type: MessageType.PermissionResponse
  accountIdentifier: string // Hash of pubkey + network name
  pubkey?: string // Public key instead of address to verify signed data
  network: Network
  scopes: PermissionScope[]
}

export interface SignPayloadRequest extends BaseMessage {
  type: MessageType.SignPayloadRequest
  payload: string
  sourceAddress?: string
}

export interface SignPayloadResponse extends BaseMessage {
  type: MessageType.SignPayloadResponse
  signature: string
}

export interface OperationRequest extends BaseMessage {
  type: MessageType.OperationRequest
  network: Network
  operationDetails: TezosOperation[]
}

export interface OperationResponse extends BaseMessage {
  type: MessageType.OperationResponse
  transactionHash: string
}

export interface BroadcastRequest extends BaseMessage {
  type: MessageType.BroadcastRequest
  network: Network
  signedTransaction: string
}

export interface BroadcastResponse extends BaseMessage {
  type: MessageType.BroadcastResponse
  transactionHash: string
}
