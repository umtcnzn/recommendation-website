type BookType = {
    id:number,
    title:string,
    original_language:string,
    authors:string,
    vote_average:number,
    image_url:string,
    release_date:string,
    genre1_name:string,
    genre2_name:string
}

type MovieType = {
    id:number,
    title:string,
    original_language:string,
    overview:string,
    image_url:string,
    vote_average:number,
    release_date: string,
    genre1_name:string,
    genre2_name:string
}

type SeriesType = {
    id:number,
    title:string,
    original_language:string,
    overview:string,
    image_url:string,
    vote_average:number,
    release_date: string,
    genre1_name:string,
    genre2_name:string
}


export type {BookType,MovieType,SeriesType}