import React from "react";
import Dice from "./components/Dice/Dice";
import Health from "./components/Health/Health";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerHealth: 100,
      monsterHealth: 100,
      playerDice: [null, null],
      monsterDice: [null, null],
      battleMessage: "Press Attack! to start",
      battleEnded: false,
      start: true,
      endBattleMessage: ""
    };

    this.resetState = () => {
      this.setState({
        playerHealth: 100,
        monsterHealth: 100,
        playerDice: [null, null],
        monsterDice: [null, null],
        battleMessage: "Press Attack! to start",
        battleEnded: false,
        start: true,
        endBattleMessage: ""
      });
    };

    this.rollDice = () => {
      return Math.floor(Math.random() * 6) + 1;
    };

    this.updateState = (winner, hit) => {
      winner === "monster"
        ? this.setState({
            playerHealth: this.state.playerHealth - hit
          })
        : this.setState({
            monsterHealth: this.state.monsterHealth - hit
          });
    };

    this.produceEndBattleMessage = () => {
      this.setState({ start: true });
      this.state.playerHealth <= 0
        ? this.setState({ endBattleMessage: "GAME OVER" })
        : this.setState({ endBattleMessage: "YOU WIN" });
    };

    this.produceMessage = (playerHit, monsterHit) => {
      if (this.state.playerHealth <= 0 || this.state.monsterHealth <= 0) {
        this.setState({ battleMessage: "", battleEnded: true });
        this.produceEndBattleMessage();
        return;
      } else if (monsterHit === playerHit) {
        this.setState({ battleMessage: "Draw" });
      } else if (monsterHit > playerHit) {
        this.updateState("monster", monsterHit - playerHit);
        this.setState({
          battleMessage: `Monster hit you by ${monsterHit - playerHit}`
        });
      } else {
        this.updateState("player", playerHit - monsterHit);
        this.setState({
          battleMessage: `You hit monster by ${playerHit - monsterHit}`
        });
      }
    };

    this.calculateHit = () => {
      this.setState({
        start: false,
        playerDice: [this.rollDice(), this.rollDice()],
        monsterDice: [this.rollDice(), this.rollDice()]
      });

      const monsterHit = this.state.monsterDice.reduce((a, b) => a + b);
      const playerHit = this.state.playerDice.reduce((a, b) => a + b);

      this.produceMessage(playerHit, monsterHit);
    };
  }

  render() {
    return (
      <div className="App">
        <h1 className="title">Battle Simulator</h1>
        <div className="players-field">
          <div id="wrapper" className="player-container">
            <i className="fa fa-male"></i>
            <Health name="Player" value={this.state.playerHealth} />
            <div className="dice-wrapper">
              {this.state.playerDice.map((number, name) => (
                <Dice
                  key={`player-${name}`}
                  number={number}
                  name={`player-${name}`}
                  display={this.state.start}
                />
              ))}
            </div>
          </div>
          <div className="battle-container">
            {this.state.battleEnded ? (
              <>
                <div className="messages">
                  <p>{this.state.endBattleMessage}</p>
                </div>
                <button
                  className="button-reset"
                  type="button"
                  onClick={this.resetState}
                >
                  Restart
                </button>
              </>
            ) : (
              <>
                <div className="messages">
                  <p>{this.state.battleMessage}</p>
                </div>
                <button
                  className="button-attack"
                  type="button"
                  onClick={this.calculateHit}
                >
                  Attack!
                </button>
              </>
            )}
          </div>
          <div id="wrapper" className="monster-container">
            <i className="fa fa-optin-monster"></i>
            <Health name="Monster" value={this.state.monsterHealth} />
            <div className="dice-wrapper">
              {this.state.monsterDice.map((number, name) => (
                <Dice
                  key={`monster-${name}`}
                  number={number}
                  name={`monster-${name}`}
                  display={this.state.start}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
