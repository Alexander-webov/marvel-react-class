import './randomChar.scss';
import MarvelServices from '../../services/MarvelServices';
import mjolnir from '../../resources/img/mjolnir.png';
import React, { Component } from 'react';
import Spinner from '../spinner/Spinner';
import Errormesage from './errorMesage/ErrorMesage';

class RandomChar extends Component {


    state = {
        char: {},
        loading: true,
        error: false
    }
    marvelServices = new MarvelServices();




    onError = () => {
        this.setState({ loading: false, error: true })
    }

    onCharLoaded = (char) => {
        this.setState({ char, loading: false })
    }

    updateChar = () => {
        this.onCharLoading()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        this.marvelServices
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }
    onCharLoading = () => {
        this.setState({ loading: true })
    }

    componentDidMount() {
        this.updateChar();
        /* this.timeId = setInterval(this.updateChar, 3000) */
    }

    componentWillUnmount() {
        clearInterval(this.timeId)
    }







    render() {
        const { char, loading, error } = this.state;

        const errorMessage = error ? <Errormesage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View char={char} /> : null;
        return (
            <div className="randomchar">

                {spinner}
                {content}
                {errorMessage}

                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={() => { this.updateChar() }}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;
    const textDescr = ' ???????????????? ???? ?????????????? ?????????????????? ??????????????????????!';
    let descr = description
    if (description !== undefined) {
        descr = descr.slice(0, 180)
        if (descr.length === 180) {
            descr = descr + '...'
        }

    }
    let styless = {};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        styless = { objectFit: 'contain' }
    }
    return (
        <div className="randomchar__block">
            <img style={styless} src={thumbnail} alt="Random character" className="randomchar__img" />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description === '' ? textDescr : descr}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;