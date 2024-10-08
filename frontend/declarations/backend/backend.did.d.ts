import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Puzzle {
  'grid' : Array<Array<[] | [number]>>,
  'downClues' : Array<[bigint, string]>,
  'acrossClues' : Array<[bigint, string]>,
}
export interface _SERVICE {
  'addPuzzle' : ActorMethod<[Puzzle], undefined>,
  'getRandomPuzzle' : ActorMethod<[], [] | [Puzzle]>,
  'verifyAnswer' : ActorMethod<[bigint, bigint, bigint, number], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
