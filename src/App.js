import React from 'react';
import './App.css';
import movies from './movies';
import MovieList from './MovieList';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/nova/theme.css';
import './DataViewDemo.css';
console.log(movies);

 
//görsellik için kullanmış olduğum bazı veriler movies.js te eklendi
//DataViewDemo.css görsellik için sağlandı.
function App() {
  return (
    <div className='movie-list'>
    <div className='container'>
      <h1>Film Listesi</h1>
        <MovieList></MovieList>
    </div>
    </div>
  );
}

export default App;
