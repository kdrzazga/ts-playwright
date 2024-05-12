"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
var PORT = 3000;
app.get('/helloworld', function (req, res) {
    res.send('Hello, World!');
});
app.listen(PORT, function () {
    console.log("Server is running on http://localhost:".concat(PORT));
});
