import React, { Component } from 'react';
import './App.css';
const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','x','y','z']

class App extends Component {
  constructor(){
    super()
    this.state={
      letterIndex:this.random(3),
      letters:[alphabet[this.random(alphabet.length)],alphabet[this.random(alphabet.length)],alphabet[this.random(alphabet.length)],],
      audioLetter:''
    }
    this.random =  this.random.bind(this)
  }
  componentDidMount(){
    this.setState({audioLetter:this.state.letters[this.state.letterIndex]})
    this.refs.audio.pause()
    this.refs.audio.load()
    this.refs.audio.play()
  }
  random(max){
    return Math.floor(Math.random()*max)
  }
  checkResult(e){
    if(this.state.letterIndex==e){
      this.reset()
      let first = this.random(alphabet.length)
      let second, third
      do{
        second = this.random(alphabet.length)
      }while(second===first)
      do{
        third = this.random(alphabet.length)
      } while(third===first || third === second)
      this.setState({letters:[alphabet[first],alphabet[second],alphabet[third]]},
      () => { this.setState({audioLetter:this.state.letters[this.state.letterIndex]},() => {
              this.refs.audio.pause()
              this.refs.audio.load()
              this.refs.audio.play()
            })
          }
      )
    }else{
      this.setState({audioLetter:'game over'}, () => {
        this.refs.audio.pause()
        this.refs.audio.load()
        this.refs.audio.play()
        })
    }
  }
  reset(){
    this.setState({letterIndex:this.random(3)})
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <audio autoPlay ref="audio">  
          Your browser does not support the &lt;audio&gt; tag. 
          <source src={'/sounds/'+this.state.audioLetter+'.m4a'} type="audio/mp4" />
        </audio> 
        </header>
        <div className='letters'>
          <div className='letterBlock' onClick={(e) => this.checkResult(0)}>{this.state.letters[0]}</div>
          <div className='letterBlock' onClick={(e) => this.checkResult(1)}>{this.state.letters[1]}</div>
          <div className='letterBlock' onClick={(e) => this.checkResult(2)}>{this.state.letters[2]}</div>
        </div>
      </div>
    );
  }
}

export default App;
