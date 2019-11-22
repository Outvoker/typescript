const fetchFilmTitle = (id:string)=> {
    fetch("https://ghibliapi.herokuapp.com/people")
            .then(x=>console.log(x))
}
fetchFilmTitle("ba924631-068e-4436-b6de-f3283fa848f0");