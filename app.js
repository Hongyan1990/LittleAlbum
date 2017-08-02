var express = require("express");
var ejs = require("ejs");
var router = require("./controller");

var app = express();

app.set("view engine", "ejs");

// 静态资源的托管
app.use(express.static("./public"));
app.use(express.static("./uploads"));	

// 首页展示
app.get("/", router.showIndex);

// 相册页展示
app.get("/:albumName", router.showAlbum);

// 上传图片
app.get("/up", router.showUp);

// 上传
app.post("/up", router.doPost);

app.use((req, res) => {
	res.render("err");
})


app.listen(3000);