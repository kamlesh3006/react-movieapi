import React, { useState } from 'react';

export default function Movie() {
    const [movies, setMovies] = useState('');
    const [movieList, setMovieList] = useState([]);

    let handleOnClick = async () => {
        try {
            let getMovie = await fetch(`https://www.omdbapi.com/?apikey=9f99b1dd&s=${movies}`);
            if (getMovie.ok) {
                let movieDetails = await getMovie.json();
                if (movieDetails.Response === 'False') {
                    alert(`${movies} not found`);
                } else {
                    setMovieList(movieDetails.Search || []);
                    console.log(movieDetails);
                }
            } else {
                alert(`${movies} not found`);
            }
        } catch (error) {
            alert(`${movies} not found`);
            console.error(error);
        }
    };

    return (
        <div>
            <header className='bg-gray-900 text-gray-500'>
                <div className='py-6 items-center justify-items-center mx-auto'>
                    <input
                        type="text"
                        onChange={(event) => setMovies(event.target.value)}
                        value={movies}
                        name='search'
                        id='search'
                        placeholder='Search'
                        className="w-1/2 bg-gray-100 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                    <button
                        onClick={() => handleOnClick()}
                        className="ml-4 inline-flex text-white bg-indigo-500 border-0 py-1.5 px-6 focus:outline-none transition hover:scale-110 hover:bg-indigo-600 rounded text-lg"
                    >
                        Search
                    </button>
                </div>
            </header>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-10 mx-auto">
                    <div className="flex flex-wrap -m-4">
   {movieList.map((movie, index) => (
      <div key={index} className="p-4 border shadow-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                                <div className="items-center justify-items-center mx-auto overflow-hidden">
                                    <img
                                        alt="Cannot load movie poster"
                                        className="object-cover object-center h-full w-full"
                                        style={{ minWidth: '260px', minHeight: '400px' }}
                                        src={movie.Poster}
                                    />
                                </div>
                                <h2 className="text-xl font-medium mx-4 title-font text-start text-gray-900 mt-5">{movie.Title}</h2>

                                <div className='flex justify-between'>
                                    <p className="text-base leading-relaxed mt-2">Year: {movie.Year}</p>
                                    <p className="text-base mt-2">Type: {movie.Type}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
