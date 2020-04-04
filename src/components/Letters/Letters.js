import React, { Component } from 'react';
import './Letters.css';
const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','x','y','z']

class Letters extends Component {
  constructor(){
    super()
    this.state={
      letterIndex:this.random(3),
      letters:[alphabet[this.random(alphabet.length)],alphabet[this.random(alphabet.length)],alphabet[this.random(alphabet.length)],],
      audioLetter:'',
      uppercase:true,
      score:0,
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
    if(this.state.letterIndex===e){
      this.reset()
      let first = this.random(alphabet.length)
      let second, third
      do{
        second = this.random(alphabet.length)
      }while(second===first)
      do{
        third = this.random(alphabet.length)
      } while(third===first || third === second)
      let score = this.state.score+1
      this.setState({letters:[alphabet[first],alphabet[second],alphabet[third]]},
      () => { this.setState({score:score, audioLetter:this.state.letters[this.state.letterIndex]},() => {
              this.refs.audio.pause()
              this.refs.audio.load()
              this.refs.audio.play()
            })
          }
      )
    }else{
      this.setState({score:0})
      this.refs.audio2.pause()
      this.refs.audio2.load()
      this.refs.audio2.play()
    }
  }
  play(){
      this.refs.audio.pause()
      this.refs.audio.load()
      this.refs.audio.play()
  }
  toggleCase(){
    this.setState({uppercase: !this.state.uppercase})
  }
  reset(){
    this.setState({letterIndex:this.random(3), score: 0})
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <audio autoPlay ref="audio">  
          Your browser does not support the &lt;audio&gt; tag. 
          <source src={'/sounds/'+this.state.audioLetter+'.m4a'} type="audio/mp4" />
        </audio>
        <audio ref="audio2">  
          Your browser does not support the &lt;audio&gt; tag. 
          <source src="/sounds/game over.m4a" type="audio/mp4" />
        </audio>
          <div onClick={(e) => this.toggleCase()}>A / a</div>  
          <div>Score: {this.state.score}</div>
        </header>
        <div className='letters' style={{textTransform:(this.state.uppercase)?'uppercase':'lowercase'}}>
          <div className='letterBlock' onClick={(e) => this.checkResult(0)}>{this.state.letters[0]}</div>
          <div className='letterBlock' onClick={(e) => this.checkResult(1)}>{this.state.letters[1]}</div>
          <div className='letterBlock' onClick={(e) => this.checkResult(2)}>{this.state.letters[2]}</div>
        </div>
        <div onClick={(e) => this.play()} >
          <img src="data:image/png;base64,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" />
        </div>
      </div>
    );
  }
}

export default Letters;
