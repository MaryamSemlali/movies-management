import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import * as API from '../services';

function Movies() {

  const [movies, setMovies] = useState([]);
  const [moviesCount, setMoviesCount] = useState(0);

  useEffect(() => {
    API.getAllMovies().then((response) => {
        setMovies(response.movies);
        setMoviesCount(response.count);
    }).catch((err) => {
        console.log(err);
    })
  }, []);

  return (
    <Layout>
      <div className="mi-skills-area mi-section mi-padding-top">
        <div className="container">
            <div>
                <h1 id='title'>{'Movies (' + moviesCount + ')'}</h1>
                <table id='users'>
                    <thead>
                    <tr>
                        <th key={'Title'}>Title</th>
                        <th key={'Duration'}>Duration (H)</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            movies && movies.map(({ _id, title, duration }) => {
                                return (
                                    <tr key={_id}>
                                        <td>{title}</td>
                                        <td>{duration + 'h00'}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </Layout>
  );
}

export default Movies;
