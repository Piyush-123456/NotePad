var express = require('express');
var router = express.Router();
var fs = require("fs");
var os = require("os");
var path = require("path");
var folderpath = path.join(os.homedir(), "Desktop", "NodeJS", "Aniket", "public", "uploads");

router.get("/", (req, res, next) => {
  try {
    var files = fs.readdirSync(folderpath);
    // console.log(files);
  }
  catch (error) {
    console.log(error)
  }
  res.render("index", {
    files, data: "", filename: ""
  });
})

router.get("/:filename", (req, res, next) => {

  try {
    var files = fs.readdirSync(folderpath);
    var data = fs.readFileSync(path.join(folderpath, req.params.filename), "utf-8");
    // console.log(data);
  }
  catch (error) {
    console.log(error);
  }
  res.render("index", {
    files, data, filename: req.params.filename
  })
})

router.post("/create", (req, res, next) => {
  try {
    fs.writeFileSync(path.join(folderpath, req.body.filename), "//Start code form over here!");
  }
  catch (error) {
    console.log(error);
  }

  res.redirect(`/${req.body.filename}`);
})


router.get("/file/:filename", (req, res, next) => {

  res.send(req.params.filename);


})


router.get("/delete/:filename", (req, res, next) => {
  try {
    fs.unlinkSync(path.join(folderpath, req.params.filename));
    // console.log("File Delted:");
  }
  catch (error) {
    console.log(error);
  }
  res.redirect("/");
})

router.post("/update/:filename", (req, res) => {
  console.log(req.body.filedata);
  try {
    fs.writeFileSync(path.join(folderpath, req.params.filename), req.body.filedata)
  }
  catch (error) {
    console.log(error);
  }
  res.redirect("/");

})



module.exports = router;
