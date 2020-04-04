import React, { useState, useEffect } from 'react'
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
    const [message, setMessage] = useState('')

    useEffect(() => {
        console.log("loading");
        async function fetchData() {
            const res = await fetch("https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;alpha3Code;capital;population;flag");
            res
                .json()
                .then(res => setCountries(res))
                .catch(err => setErrors(err));
          }
      
          fetchData();
    }, []);

    useEffect(() => {
        const countriesLength = countries.length;
        let tempArray = [];
        for (let i=0; i < 3; i++) {
            let rnd = random(countriesLength);
            if (tempArray.indexOf(rnd) === -1)
                tempArray.push(rnd)
        }
        setCandidates([countries[tempArray[0]], countries[tempArray[1]], countries[tempArray[2]]]);
        setWinner(random(3)); 
        setWin(false)
    }, [win, countries])

    const handleClick = (index) => {
        if (winner === index) {
            setMessage("POBJEDIO SI!!");
            setTimeout(() => {
                setWin(true);
                setMessage('');
            }, 1500);
        } else {
            setMessage("NEMAŠ POJMA!!");
            setTimeout(() => {
                setMessage('');
            }, 1500);
        }
    }
    const getMap = () => {
        try {
            return (candidates[winner] && require(`../../../static/all/${candidates[winner].alpha2Code.toLowerCase()}/vector.svg`));
        } catch {
            return null;
        }
    }

    const picks = (candidates.length > 0) ?
        candidates.map((country, index) => {
            console.log(country)
            if (props.capital)  {
                return (
                    <div onClick={() => handleClick(index)} className="pick">{country && country.capital}</div>
                )
            }if (props.mapsFlags)  {
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
            <div className="message">
                    {message}
                </div>
        </div>
    )
}

export default Maps;
