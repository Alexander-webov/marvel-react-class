import './charList.scss';
import React, { Component } from 'react';
import MarvelServices from '../../services/MarvelServices';





class CharList extends Component {
    marvelServices = new MarvelServices();

    state = {
        chars: [],
        offset: 219,
    }


    componentDidMount() {
        this.loadingCars();

    }



    loadingCars = () => {
        this.marvelServices
            .getAllCharacters()
            .then(data => {
                this.setState({
                    chars: data,
                })
            })
    }



    onRequest = (offset) => {
        this.marvelServices
            .getAllCharacters(offset)
            .then(data => {
                this.setState({
                    chars: [...this.state.chars, ...data],
                    offset: this.state.offset + 9,
                    newItemLoading: false,
                })
            })
    }



    itemsListCharRender = []


    render() {


        const { chars, offset } = this.state;
        let styless = {};
        if (!Object.keys(chars).length == 0) {
            this.itemsListCharRender = chars.map(el => {
                if (el.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                    styless = { objectFit: 'contain' }
                }
                return (
                    <li onClick={() => { this.props.onCharSelected(el.id) }} key={el.id} className="char__item">
                        <img style={styless} src={el.thumbnail} alt={el.name} />
                        <div className="char__name">{el.name}</div>
                    </li>
                )
            })
        }



        return (
            <div className="char__list">
                <ul className="char__grid">
                    {this.itemsListCharRender}
                </ul>
                <button
                    onClick={() => { this.onRequest(offset) }}
                    className="button button__main button__long"
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}



export default CharList;