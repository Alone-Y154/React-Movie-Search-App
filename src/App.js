import styled from "styled-components";
import MovieComponent from "./Components/MovieComponent";
import axios from 'axios';
import { useState } from "react";
import MovieInfoComponent from "./Components/MovieInfoComponent";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  background: black;
  color: white;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
  justify-content: space-between;
  align-items: center;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const MovieIcon = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px ;
  background: white;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  align-items: center;
  cursor: pointer;
`;

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const SearchInput = styled.input`
  outline: none;
  border: none;
  width: 100%;
  font-size: 1rem;
  font-weight: bold;
  color: black;
  margin-left: 15px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction:row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 24px;
  justify-content: space-evenly;
`

const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;

`

function App() {
// eslint-disable-next-line
  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();


  const fetchData = async (searchString) => {
    const response =await axios.get(`http://www.omdbapi.com/?s=${searchString}&apikey=95afe6f4`);
    console.log(response);
    updateMovieList(response.data.Search);
  }



  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(()=> fetchData(e.target.value),500);
    updateTimeoutId(timeout);
  }
  return (
    <Container >
    <Header>
      <AppName>
        <MovieIcon src="./movie-icon.svg" alt="Movie Icon"/>
          Movie Search App
      </AppName>
      <SearchBox>
      <SearchIcon src="./search-icon.svg" alt="Search Icon"/>
      <SearchInput placeholder="Search Movie" onChange={onTextChange}/>
      </SearchBox>
      
    </Header>
{selectedMovie && <MovieInfoComponent onMovieSelect={onMovieSelect} selectedMovie={selectedMovie}/>}
<MovieListContainer>

    {movieList?.length ? movieList.map((movie,index) => <MovieComponent key={index} movie={movie} onMovieSelect={onMovieSelect}/>): 
    
    <Placeholder  src="./movie-icon.svg"/>}

</MovieListContainer>

    </Container>
  );
}

export default App;
