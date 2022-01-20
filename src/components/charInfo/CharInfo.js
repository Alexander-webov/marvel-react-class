import './charInfo.scss';
import React, { Component } from 'react';
import MarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import Errormesage from '../randomChar/errorMesage/ErrorMesage';
import Skeleton from '../skeleton/Skeleton';
import PropTypes from 'prop-types';


class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false
    }
    marvelServices = new MarvelServices();

    updateChar = () => {
        const { charId } = this.props;
        if (!charId) {
            return;
        }
        this.onCharLoading();

        this.marvelServices
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }



    onError = () => {
        this.setState({ loading: false, error: true })
    }

    onCharLoaded = (char) => {
        this.setState({ char, loading: false })
    }


    onCharLoading = () => {
        this.setState({ loading: true })
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }


    render() {
        const { char, loading, error } = this.state;

        const skeleton = char || loading || error ? null : <Skeleton />;
        const errorMessage = error ? <Errormesage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error || !char) ? <View char={char} /> : null;
        return (
            <div className="char__info">
                {skeleton}
                {spinner}
                {content}
                {errorMessage}
            </div>
        )
    }
}



const View = ({ char }) => {

    const { name, description, thumbnail, homepage, wiki, comics } = char;
    let styless = {};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        styless = { objectFit: 'contain' }
    }
    return (
        <>
            <div className="char__basics">
                <img style={styless} src={thumbnail} alt={name} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'Комиксов не найдено!('}
                {
                    comics.map((el, i) => {
                        // eslint-disable-next-line
                        if (i > 9) return;
                        return (
                            <li key={el.name} className="char__comics-item">
                                {/*  <a href={el.resourceURI}></a> */}
                                {el.name}

                            </li>
                        )
                    })}


            </ul>
        </>
    )
}



CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;