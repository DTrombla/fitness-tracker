
const db = require("../models");
//const workoutSeed = require("../seeders/seed")
 module.exports = app => {
    app.post("/api/workouts", (req, res) => {
        console.log(req.body)
        db.Workout.create(req.body,
        (err, data) => {
            if (err) {
                res.json(err);
            } else {

                res.json(data);
            }
        })
    }); 
    app.put("/api/workouts/:id", (req, res) => {
        console.log(req.body)
        db.Workout.updateOne({
            _id:req.params.id 
        },
        {$push:{exercises:req.body}},
        (err, data) => {
            if (err) {
                res.json(err);
            } else {
                console.log(data)
                res.json(data);
            }})
    }); 
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.aggregate([
            {
                $addFields: {totalDuration:{$sum: "$exercises.duration"}}
            },
            {$limit: 7}
        ], (err, data) => {
            if (err) {
                res.json(err);
            } else {
                res.json(data);
            };
        });
    });
    app.get("/api/workouts", (req, res) => {
        db.Workout.aggregate([
            {
                $sort: {day: -1}
            },
            {$limit: 7}
        ], (err, data) => {
            if (err) {
                res.json(err);
            } else {
                res.json(data);
            };
        });
    });
}
