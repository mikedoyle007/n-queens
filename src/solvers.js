/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = new Board({'n': n});

  for (var row = 0; row < n; row++) {
    for (var column = 0; column < n; column++) {
      board.togglePiece(row, column);
      if (board.hasRowConflictAt(row) || board.hasColConflictAt(column)) {
        board.togglePiece(row, column);
      }
    }
  }

  var solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var solutions = [];

  var grid = [];
  for (var i = 0; i < n; i++) {
    var row = new Array(n).fill(0);
    row[i] = 1;
    grid.push(row);
  }

  var inner = function(matrix, solutionArr) {
    if (matrix.length) {
      for (var i = 0; i < matrix.length; i++) {
        var spliced = matrix.splice(i, 1);
        solutionArr.concat(spliced);
        inner(matrix, solutionArr);
        matrix.splice(i, 0, spliced);
      }
    } else {
      solutions.push(solutionArr);
    }
  };
  inner(grid, []);

  solutionCount = solutions.length;

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution;
  var board = new Board({'n': n});
  var inner = function(row) {
    if (row === n) {
      solution = jQuery.extend(true, {}, board).rows();
      return;
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyQueenConflictsOn(row, i) && !solution) {
        inner(row + 1);
      }
      board.togglePiece(row, i);
    }
  };

  inner(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution || board.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({'n': n});

  var inner = function(row) {
    if (row === n) {
      solutionCount++;
      return;
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyQueensConflicts()) {
        inner(row + 1);
      }
      board.togglePiece(row, i);
    }
  };

  inner(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
