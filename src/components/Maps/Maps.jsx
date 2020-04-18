import React, { useState, useEffect, useContext } from 'react'
import GameContext from '../../context/game.context'
import './Maps.css'

const random = (max) => {
        return Math.floor(Math.random()*max)
}

const Maps = (props) => {
    const [hasError, setErrors] = useState(false);
    const [countries, setCountries] = useState({});
    const [win, setWin] = useState(false);
    const [winner, setWinner] = useState(0);
    const [candidates, setCandidates] = useState([]);
    const [message, setMessage] = useState({right:'', wrong:''})
    const [reset, setReset] = useState(false)

    const game = useContext(GameContext);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;alpha3Code;capital;population;flag");
            res
                .json()
                .then(res => {
                    // console.log(res.filter(country => country.population > 3000000));
                    setCountries(res.filter(country => country.population > 3000000));
                })
                .catch(err => setErrors(err));
          }
      
          fetchData();
    }, []);

    useEffect(() => {
        const countriesLength = countries.length-1;
        let tempArray = [];
        for (let i=0; i < 3; i++) {
            let rnd = random(countriesLength);
            (tempArray.indexOf(rnd) === -1) ? tempArray.push(rnd) : --i;
        }
        setCandidates([countries[tempArray[0]], countries[tempArray[1]], countries[tempArray[2]]]);
        setWinner(random(3)); 
        setWin(false)
    }, [win, countries, reset])

    const handleClick = (index) => {
        if (winner === index) {
            setMessage({css: 'right', message: 'Točno!!', bonus: 'bonus'});
            game.setBonus(game.bonus+1);
            game.setScore(game.score+(10*game.bonus))
            setWin(true);
        } else {
            setMessage({css: 'wrong', message: 'Pogrešno!!', bonus: ''});
            game.setBonus(1);
        }
        setTimeout(() => {
            setMessage({css:'', message:'', bonus: ''});
        }, 1000);
    }

    const getMap = () => {
        try {
            return (candidates[winner] && require(`../../../static/all/${candidates[winner].alpha2Code.toLowerCase()}/vector.svg`));
        } catch {
            setReset(!reset);
            console.log("reset", candidates[winner])
            return null;
        }
    }

    const picks = (candidates.length > 0) ?
        candidates.map((country, index) => {
            if (props.capital)  {
                return (
                    <div
                        onClick={() => handleClick(index)}
                        className="pick"
                    >
                        {country && ((country.capital !== "") ? country.capital : country.name)}
                    </div>
                )
            }
            if (props.mapsFlags)  {
                return (
                    <img
                        onClick={() => handleClick(index)}
                        className="pick-img"
                        src={country && country.flag}
                        alt={`${country && country.name} flag`}
                    />
                )
            }
            return (
                <div onClick={() => handleClick(index)} className="pick">{country && country.name}</div>
            )
        })
        : null;
    const map = getMap();
    return (
        <div>
            <div className="flags-container">
                <div className="flag">
                    {props.maps &&<img src={map} alt="country map" /> }
                    {props.flag && 
                        <img
                            src={candidates[winner] && candidates[winner].flag}
                            alt={`${candidates[winner] && candidates[winner].name}`}
                        />
                    }
                </div>
                <div className="text">
                    {picks}
                </div>
            </div>
            <div className={`bonus-message ${message.bonus}`}>
                {game.bonus > 2 ? `x ${game.bonus-1}` : ''}
            </div>
            <div className="message">
                <div className={`msg ${message.css}`}>
                    {message.message}
                </div>
            </div>
        </div>
    )
}

export default Maps;
