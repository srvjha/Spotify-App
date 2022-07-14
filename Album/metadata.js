let fs = require("fs");
let axios = require("axios");

let songs = ["jinna"];
let durations = ["03:52"];
let ipfsArray = [];

for (let i = 0; i < songs.length; i++) {
  ipfsArray.push({
    path: `metadata/${i}.json`,
    content: {
      image: `ipfs://QmXzwdEsf4cNFQWdehjkEHDrC9LFoQUiXuFUPKPR4RZYUh/media/1`, //xxx = hash
      name: songs[i],
      animation_url: `ipfs://QmXzwdEsf4cNFQWdehjkEHDrC9LFoQUiXuFUPKPR4RZYUh/media/${i}`, //xxx = hash
      duration: durations[i],
      artist: "Gurunam",
      year: "2017"
    },
  });
}

axios.post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", ipfsArray, {
    headers: {
      "X-API-KEY":
        "lb1njIBWKzsrvL3AfGB1dUgYorANZ8dk4s8aTbsISCByAqZX1rJr5CzuT4vGoC4l",
      "Content-Type": "application/json",
      accept: "application/json",
    },
  })
  .then((res) => {
    console.log(res.data);
  })
  .catch((error) => {
    console.log(error);
  });
