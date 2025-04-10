const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://babariyanency:6U8qLx3EWA6YO4cC@cluster0.yo5igfx.mongodb.net/perfum?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("Connected Suceessfully");
    }).catch((error) => {
        console.log(error);

    })