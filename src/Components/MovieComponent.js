import styled from "styled-components";

const MovieContainer = styled.div`
display: flex;
flex-direction:column;
padding: 10px;
width: 280px;
box-shadow: 0 3px 10px 0 #aaa;
cursor: pointer;
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
`

const InfoColumn = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const MovieInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`


const MovieComponent = (props) =>{

    const {Title, Year, imdbID, Type ,Poster} = props.movie;

    return(
        <MovieContainer onClick = {() => {
            props.onMovieSelect(imdbID);
        }}>
        <CoverImg src={Poster} />
            <MovieName>
                {Title}
            </MovieName>
            <InfoColumn>
                <MovieInfo>year: {Year}</MovieInfo>
                <MovieInfo>Type: {Type}</MovieInfo>
            </InfoColumn>
        </MovieContainer>
    )
}

export default MovieComponent;