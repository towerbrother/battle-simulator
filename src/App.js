import React from "react";
// import Dice from "./components/dice";
import Health from "./components/Health";
import "./App.css";
import "font-awesome/css/font-awesome.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerHealth: 100,
      monsterHealth: 100,
      playerDice: [null, null],
      monsterDice: [null, null],
      battleMessage: "Press Attack! to start",
      endBattleMessage: ""
    };

    this.resetState = () => {
      this.setState({ playerHealth: 100 });
      this.setState({ monsterHealth: 100 });
      this.setState({ playerDice: [null, null] });
      this.setState({ monsterDice: [null, null] });
      this.setState({ battleMessage: "Press Attack! to start" });
      this.setState({ endBattleMessage: "" });
    };

    this.rollDice = () => {
      return Math.floor(Math.random() * 6) + 1;
    };

    this.updateState = (winner, hit) => {
      if (winner === "monster") {
        this.setState({
          playerHealth: this.state.playerHealth - hit
        });
      } else {
        this.setState({
          monsterHealth: this.state.monsterHealth - hit
        });
      }
    };

    this.produceEndBattleMessage = () => {
      if (this.state.playerHealth <= 0) {
        this.setState({ battleMessage: "GAME OVER" });
      }

      if (this.state.monsterHealth <= 0) {
        this.setState({ battleMessage: "YOU WIN" });
      }
    };

    this.produceMessage = (winner, hit) => {
      if (this.state.playerHealth <= 0 || this.state.monsterHealth <= 0) {
        this.produceEndBattleMessage();
        return;
      }

      if (winner === "monster") {
        this.setState({ battleMessage: `Monster hit you by ${hit}` });
      } else if (winner === "player") {
        this.setState({ battleMessage: `You hit monster by ${hit}` });
      } else {
        this.setState({ battleMessage: "Draw" });
      }
    };

    this.calculateHit = () => {
      this.setState({ playerDice: [this.rollDice(), this.rollDice()] });
      this.setState({ monsterDice: [this.rollDice(), this.rollDice()] });

      const monsterHit = this.state.monsterDice.reduce((a, b) => a + b);
      const playerHit = this.state.playerDice.reduce((a, b) => a + b);

      if (monsterHit === playerHit) {
        this.produceMessage("draw", monsterHit - playerHit);
      } else if (monsterHit > playerHit) {
        this.updateState("monster", monsterHit - playerHit);
        this.produceMessage("monster", monsterHit - playerHit);
      } else {
        this.updateState("player", playerHit - monsterHit);
        this.produceMessage("player", playerHit - monsterHit);
      }
    };
  }

  render() {
    return (
      <div className="App">
        <h1 className="title">Battle Simulator</h1>
        <div className="players-field">
          <div className="player-container">
            <i className="fa fa-male"></i>
            <Health name="Player" value={this.state.playerHealth} />
            {/* {this.state.playerDice.map((roll, i) => (
              <Dice key={`player-${i}`} number={roll} />
            ))} */}
          </div>
          <div className="battle-container">
            <div className="messages">
              <p>{this.state.battleMessage}</p>
            </div>
            {this.state.playerHealth <= 0 || this.state.monsterHealth <= 0 ? (
              <button
                className="button-reset"
                type="button"
                onClick={this.resetState}
              >
                Restart
              </button>
            ) : (
              <button
                className="button-attack"
                type="button"
                onClick={this.calculateHit}
              >
                Attack!
              </button>
            )}
          </div>
          <div className="monster-container">
            <i className="fa fa-optin-monster"></i>
            <Health name="Monster" value={this.state.monsterHealth} />
            {/* {this.state.monsterDice.map((roll, i) => (
              <Dice key={`monster-${i}`} number={roll} />
            ))} */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
