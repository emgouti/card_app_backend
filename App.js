const Express = require("express");
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");
var cors = require('cors');

var app = Express();


Mongoose.connect("mongodb://localhost/megamarket");

const TileModel = Mongoose.model("tile", {
    location: String,
    cards: Number,
    percentage: Number
});

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors())

app.post("/tile", async (request, response) => {
    try {
        var tile = new TileModel(request.body);
        var result = await tile.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});


app.get("/tiles", async (request, response) => {
    try {
        var result = await TileModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/tile/:id", async (request, response) => {
    try {
        var tile = await TileModel.findById(request.params.id).exec();
        response.send(tile);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.put("/tile/:id", async (request, response) => {
    try {
        var tile = await TileModel.findByIdAndUpdate(request.params.id).exec();
        tile.set(request.body);
        var result = await tile.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.delete("/tile/:id", async (request, response) => {
    try {
        var result = await TileModel.deleteOne({ _id: request.params.id }).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.listen(3000, () => {
    console.log("Listening at :3000...");
});