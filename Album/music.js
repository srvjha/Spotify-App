let fs = require("fs");
let axios = require("axios");

let media = ["Chaand_Baaliyan.mp3","excuses.mp3","Ikko_Mikke.mp3","music.jpg"];
let ipfsArray = [];
let promises = [];

for (let i = 0; i<media.length; i++) {
  promises.push(
    new Promise((res, rej) => {
      fs.readFile(`${__dirname}/export/${media[i]}`, (err, data) => {
        if (err) rej();
        ipfsArray.push({
          path: `media/${i}`,
          content: data.toString("base64"),
        });
        res();
      });
    })
  );
}
Promise.all(promises).then(() => {
  axios
    .post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", ipfsArray, {
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
});
