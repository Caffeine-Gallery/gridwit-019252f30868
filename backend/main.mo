import Bool "mo:base/Bool";
import Char "mo:base/Char";
import Random "mo:base/Random";

import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Time "mo:base/Time";
import Text "mo:base/Text";

actor CrosswordPuzzle {
  // Define the structure for a crossword puzzle
  type Puzzle = {
    grid : [[?Char]];
    acrossClues : [(Nat, Text)];
    downClues : [(Nat, Text)];
  };

  // Store puzzles
  stable var puzzles : [Puzzle] = [];

  // Add a new puzzle
  public func addPuzzle(newPuzzle : Puzzle) : async () {
    puzzles := Array.append(puzzles, [newPuzzle]);
  };

  // Get a random puzzle
  public func getRandomPuzzle() : async ?Puzzle {
    if (puzzles.size() == 0) {
      return null;
    };
    let now = Time.now();
    let randomIndex = Nat.abs(now) % puzzles.size();
    ?puzzles[randomIndex];
  };

  // Verify user's answer for a specific position
  public query func verifyAnswer(puzzleIndex : Nat, row : Nat, col : Nat, answer : Char) : async Bool {
    switch (puzzles[puzzleIndex].grid[row][col]) {
      case (?correctChar) { correctChar == answer };
      case (null) { false };
    };
  };

  // Initialize with a sample puzzle
  stable let samplePuzzle : Puzzle = {
    grid = [
      [?'C', ?'A', ?'T'],
      [?'O', null, null],
      [?'W', null, null]
    ];
    acrossClues = [(1, "Feline pet"), (4, "Bovine animal")];
    downClues = [(1, "Female deer"), (2, "Indefinite article"), (3, "Beverage")];
  };

  puzzles := [samplePuzzle];
}
