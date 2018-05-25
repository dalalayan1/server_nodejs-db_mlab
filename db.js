const config = require('./config');
const MLab = require('mlab-data-api');


const mLab= new MLab({
  key: config.apiKey,
  host:'https://api.mlab.com', //optional
  uri : '/api',//optional
  version :'1',//optional
//   database:'your working database', //optional
  timeout : 10000 //optional
})

// mLab.listDatabases()
//   .then(function (response) {
//     console.log('got',response.data)
//   })
//   .catch(function (error) {
//     console.log('error', error)
//   })

const showData = collection => {
console.log(collection)
  mLab.listCollections(collection)
  .then(function (response) {
    console.log('got')
  })
  .catch(function (error) {
    console.log('error')
  })
}

module.exports = {
  showData
}