export const idlFactory = ({ IDL }) => {
  const Puzzle = IDL.Record({
    'grid' : IDL.Vec(IDL.Vec(IDL.Opt(IDL.Nat32))),
    'downClues' : IDL.Vec(IDL.Tuple(IDL.Nat, IDL.Text)),
    'acrossClues' : IDL.Vec(IDL.Tuple(IDL.Nat, IDL.Text)),
  });
  return IDL.Service({
    'addPuzzle' : IDL.Func([Puzzle], [], []),
    'getRandomPuzzle' : IDL.Func([], [IDL.Opt(Puzzle)], []),
    'verifyAnswer' : IDL.Func(
        [IDL.Nat, IDL.Nat, IDL.Nat, IDL.Nat32],
        [IDL.Bool],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
