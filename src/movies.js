// Importar objeto  
const moviesArray = require('./data.js')


// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
    const directorsArray = moviesArray.map(e1 => e1.director);
    
return directorsArray;
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    let counter = 0;
    moviesArray.forEach (e2 => {
        if (e2.director === "Steven Spielberg" && e2.genre.includes("Drama") === true){
           counter = counter + 1;        
        }
        });
    return counter;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    if (moviesArray.length === 0) {return 0};

    const valores = moviesArray.reduce((accum, pointer) => {return (pointer.score || 0) + accum },0) ;
  
    return parseFloat(( valores / moviesArray.length ).toFixed(2));
    
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
    return scoresAverage(moviesArray.filter(pointer => pointer.genre.includes("Drama")))
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
    let newArr = [...moviesArray].sort((m1, m2) => {
        if (m1.year > m2.year) return 1;
        if (m1.year < m2.year) return -1;
        if (m1.title > m2.title) return 1;
        if (m1.title < m2.title) return -1;
      }) 
      console.log(newArr.map(m => m.year + " : " + m.title))   
      return newArr;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
    return moviesArray.map(m => m.title).sort().slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
    const newArry = [];
  for (const movie of moviesArray) {
    const duration = movie.duration;
    let horas = 0;
    let minutos = 0;

    if (duration.includes("h")) {horas = parseInt(duration.split(" ")[0].replace("h", "")) * 60;}
    if (duration.includes("min")) {minutos = parseInt(duration.split(" ")[1].replace("min", ""));}

    let newMovie = {...movie}
    newMovie.duration = horas + minutos;
    newArry.push(newMovie);
  }
  return newArry;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
    if (!moviesArray.length) return null

    /** Filter all unique years */
    const uniqueYears = [...new Set(moviesArray.map(m => m.year))]
    const averageScoreByYear = []
    
    for (let year of uniqueYears) {
  
      const filteredMovies = moviesArray.filter(movie => movie.year === year)
      
      let avg = 0;
      filteredMovies.forEach(movie => {avg += movie.score;})
  
      let average = Math.round((avg / filteredMovies.length + Number.EPSILON) * 100) / 100
  
      averageScoreByYear.push({year, average});
    }
  
    let bestYear = averageScoreByYear.filter(el => el.average === Math.max(...averageScoreByYear.map(element => element.average)))
    if (bestYear.length > 1){
      bestYear = bestYear.filter(el => el.year === Math.min(...bestYear.map(element => element.year)))
    }
    bestYear = bestYear[0]
    return `The best year was ${bestYear.year} with an average score of ${bestYear.average}`;
}

