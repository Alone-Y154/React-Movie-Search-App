import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding: 20px 30px;
    justify-content: center;
    border-bottom: 1px solid lightgray;
`

const CoverImg = styled.img`
    object-fit: cover; 
    height: 362px;
`
const MovieName = styled.span`
    font-size: 18px;
    font-weight: 600;
    color: black;
    margin: 15px 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-transform: capitalize;
`

const InfoColumn = styled.div`
    display: flex;
    flex-direction: column;
    margin:20px;
`

const MovieInfo = styled.span`
    font-size: 16px;
    font-weight: 500;
    color: black;
    text-overflow: ellipsis;
    overflow: hidden;
    text-transform: capitalize;
    margin: 4px 0;

    & span {
        opacity: 0.5;
    }
    
`
const Close = styled.span`
    font-size: 16px;
    font-weight: 600;
    color: black;
    background: lightgray;
    height: fit-content;
    padding: 8px;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0.8;
`

const MovieInfoComponent = (props) => {
    const [movieInfo, setMovieInfo] = useState();
    useEffect(() => {
        axios.get(`http://www.omdbapi.com/?i=${props.selectedMovie}&apikey=95afe6f4`)
        .then((response) => {
            setMovieInfo(response.data);
        })
    },[props.selectedMovie]);
    return(

        <Container>

        {movieInfo?<>
            <CoverImg src={movieInfo?.Poster} />
         <InfoColumn>
            <MovieName>
                {movieInfo?.Type}: {movieInfo?.Title}
            </MovieName>
            <MovieInfo>IMDB Rating: <span>{movieInfo?.imdbRating}</span></MovieInfo>
            <MovieInfo>Year: <span>{movieInfo?.Year}</span></MovieInfo>
            <MovieInfo>Language: <span>{movieInfo?.Language}</span></MovieInfo>
            <MovieInfo>Rated: <span>{movieInfo?.Rated}</span></MovieInfo>
            <MovieInfo>Released: <span>{movieInfo?.Released}</span></MovieInfo>
            <MovieInfo>Runtime: <span>{movieInfo?.Runtime}</span></MovieInfo>
            <MovieInfo>Genre: <span>{movieInfo?.Genre}</span></MovieInfo>
            <MovieInfo>Director: <span>{movieInfo?.Director}</span></MovieInfo>
            <MovieInfo>Actors: <span>{movieInfo?.Actors}</span></MovieInfo>
            <MovieInfo>Plot: <span>{movieInfo?.Plot}</span></MovieInfo>

         </InfoColumn>
         <Close onClick={()=>{
            props.onMovieSelect()
         }}>X</Close>
        </> : "Loading..."}
        
        </Container>
    )
}

export default MovieInfoComponent;