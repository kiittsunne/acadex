// const fs = require("fs");
// const {
//   Submission_Information: data,
// } = require("./Accepted-Papers-20221027.json");
// let str = "";
// let hash = {};
// data.forEach((item) => {
//   let replace = item.Authors.replace(" and ", ", ");

//   str += replace + ", ";
// });

// str
//   .split(", ")
//   .sort()
//   .forEach((name) => {
//     hash[name] = (hash[name] || 0) + 1;
//   });

// let arr = [];

// for (let author in hash) {
//   let titles = data.filter((sub) => {
//     if (sub.Authors.includes(author)) {
//       return sub;
//     }
//   });

//   let obj = {
//     name: author,
//     papers: hash[author],
//     titles: titles,
//   };

//   arr.push(obj);
// }

// fs.writeFile(
//   "/Users/kit/Code/projects/authors_titles.txt",
//   JSON.stringify(arr),
//   function (err) {
//     if (err) {
//       return console.log(err);
//     }

//     console.log("file saved");
//   }
// );

// import data from "./Accepted-Papers-20221027.json" assert { type: "json" };
// import fs from "fs";

// let hash = {};
// data.Submission_Information.forEach((el) => {
//   hash[el.Acceptance_Status] = (hash[el.Acceptance_Status] || 0) + 1;
// });

// let sortable = [];
// for (let track in hash) {
//   sortable.push([track, hash[track]]);
// }

// sortable.sort((a, b) => b[1] - a[1]);
// let result = [];
// sortable.forEach((el) => {
//   result.push({ label: `${el[0]} (${el[1]})`, value: el[0] });
// });

// fs.writeFile(
//   "/Users/kit/Code/projects/acadex/src/assets/tracks.txt",
//   JSON.stringify(result),
//   function (err) {
//     if (err) {
//       return console.log(err);
//     }
//     console.log("file saved");
//   }
// );
