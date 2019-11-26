import request from 'request';

const url = "https://ghibliapi.herokuapp.com/people"
request(url,(error, response, body)=>{
        console.log(body)
});

console.log("program finished")
