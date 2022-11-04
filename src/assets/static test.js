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
