import {
  markSymbol,
  resetGame,
  changePlayer
} from "../actions/ticTacToeActions";
import TicTacToeUI from "./ticTacToeUI";
import { connect } from "react-redux";

const getStatusMessage = (player, tiles) => {
  //IF TIE RETURN MESSAGE IT IS TIE
  if (isTie(tiles)) return "It is a tie!";

  //IF WINNER RETURN MESSAGE WINNER
  const winner = getWinner(tiles).winner;
  if (winner !== undefined) {
    return winner + " has won the game!";
  } else {
    //ELSE RETURN TURN
    return "TURN " + player;
  }
};

//CHECK FOR TIES
const isTie = tiles => {
  const winnerdata = getWinner(tiles);
  const winner = winnerdata.winner;
  if (winner !== undefined) return false;

  var isTie = true;
  tiles.forEach(tile => {
    if (tile === undefined) isTie = false;
  });

  return isTie;
};

//CHECK VALID
const isValidMove = (tiles, tile) => {
  //INVALID
  // if (tiles[tile] !== undefined) return false;
  // //IF WINNER AND TIES FOUND NO MOVE IS VALID
  // if (getWinner(tiles) !== undefined) return false;
  // if (isTie(tiles)) return false;

  const winner = getWinner(tiles).winner;
  if (tiles[tile] !== undefined || winner !== undefined || isTie(tiles))
    return false;
  //ELSE RETURN VALID MOVE
  return true;
};

const getWinner = tiles => {
  const winningStates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ];
  var winnerTile = [];
  var winner = undefined;
  winningStates.forEach(winningstate => {
    let toBeWinner = tiles[winningstate[0]];

    if (toBeWinner !== undefined) {
      let wonCurrentState = true;
      winningstate.forEach(winningTile => {
        if (toBeWinner !== tiles[winningTile]) {
          wonCurrentState = false;
        }
      });
      if (wonCurrentState) {
        winner = toBeWinner;
        winnerTile = winningstate;
      }
    }
  });
  var data = {
    winner: winner,
    winningTile: winnerTile
  };

  return data;
};

const mapStateToProps = state => {
  const winnerdata = getWinner(state.tiles).winningTile;

  return {
    player: state.player,
    tiles: state.tiles,
    message: getStatusMessage(state.player, state.tiles),
    winnerTile: winnerdata
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetTile: (tile, tiles, player) => {
      console.log("dispatchtoprop");
      if (isValidMove(tiles, tile)) dispatch(markSymbol(tile, player));
    },
    onChangeTile: (tile, tiles, player) => {
      console.log("dispatchtoprop");
      if (isValidMove(tiles, tile)) dispatch(changePlayer(tile, player));
    },
    onReset: () => {
      console.log("dispatchtoprop");
      dispatch(resetGame());
    }
  };
};

const ticTacToe = connect(
  mapStateToProps,
  mapDispatchToProps
)(TicTacToeUI);

export default ticTacToe;
