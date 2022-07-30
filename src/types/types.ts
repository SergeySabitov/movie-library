class movieItemType {
    Poster: string;
    Title: string;
    imdbID: string;

    constructor(Poster: string,
        Title: string,
        imdbID: string,){
        this.Poster = Poster;
        this.Title = Title;
        this.imdbID = imdbID;
    }
}

export default movieItemType;
