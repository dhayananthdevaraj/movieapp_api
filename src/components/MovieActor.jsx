import React, { Component } from 'react';
import axios from 'axios';

class MovieActor extends Component {
  state = {
    actors: [],
    loading: false,
    pageNumber: 1, // Default page number
  };

  async fetchData(pageNumber) {
    this.setState({ loading: true });
    
    const options = {
      method: 'GET',
      url: 'https://moviesdatabase.p.rapidapi.com/actors',
      params: { page: pageNumber },
      headers: {
        'X-RapidAPI-Key': '8138ec50camshdb29539f89af606p1acdecjsn1cbd14abeff2',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      // Access the array of actors correctly
      if (Array.isArray(response.data.results)) {
        this.setState({ actors: response.data.results, loading: false });
      } else {
        console.error('API did not return a valid response:', response.data);
        this.setState({ loading: false });
      }
    } catch (error) {
      console.error(error);
      this.setState({ loading: false });
    }
  }

  handlePageNumberChange = (event) => {
    this.setState({ pageNumber: event.target.value });
  };

  handleFetchData = () => {
    const { pageNumber } = this.state;
    this.fetchData(pageNumber);
  };

  componentDidMount() {
    this.fetchData(this.state.pageNumber);
  }

  render() {
    const { actors, loading, pageNumber } = this.state;

    return (
        <div>
        <h2 className="section-title">Movie Actors</h2>
        <div className='search'>
          <label htmlFor="pageNumber" className="page-label">Enter Page Number: </label>
          <input 
            type="text"
            id="pageNumber"
            value={pageNumber}
            onChange={this.handlePageNumberChange}
            className='page-input'
          />
          <button onClick={this.handleFetchData} className="fetch-button">Search</button>
        </div>
        {loading ? (
          <p className="actor-load">Loading...</p>
        ) : (
          <ul className="actor-list">
            {actors.map((actor) => (
              <li key={actor._id}>
                <strong>Name:</strong> {actor.primaryName}<br />
                <strong>Birth Year:</strong> {actor.birthYear}<br />
                <strong>Death Year:</strong> {actor.deathYear}<br />
                <strong>Primary Profession:</strong> {actor.primaryProfession}<br />
                <hr />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default MovieActor;
