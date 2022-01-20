class MarvelServices {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=84cfc22f0dfa4f4e0be8dfd9416d23e2';
    _baseOffset = '210';


    getResource = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`ошибка в url ${url}`)
        }
        return await res.json();
    }



    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`)
        return res.data.results.map(this._transformCharacter)
    }


    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
        return this._transformCharacter(res.data.results[0]);
    }


    _transformCharacter = (cahr) => {
        return {
            id: cahr.id,
            name: cahr.name,
            description: cahr.description,
            thumbnail: cahr.thumbnail.path + '.' + cahr.thumbnail.extension,
            homepage: cahr.url,
            wiki: cahr.urls[1].url,
            comics: cahr.comics.items
        }
    }


}

export default MarvelServices;