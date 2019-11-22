var fetchFilmTitle = function (id) {
    fetch("https://ghibliapi.herokuapp.com/people")
        .then(function (x) { return console.log(x); });
};
fetchFilmTitle("ba924631-068e-4436-b6de-f3283fa848f0");
