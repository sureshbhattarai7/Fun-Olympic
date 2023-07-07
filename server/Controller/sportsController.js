const Sport = require('./../Model/sportsModel');

exports.createSports = async (req, res) => {
    const sports = await Sport.create(req.body);
    try {
        res.status(200).json({
            status: 'success',
            data: {
                sports
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.getSports = async (req, res) => {
    const sports = await Sport.find();
    try {
        res.status(200).json({
            status: 'success',
            data: {
                sports
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.getSport = async (req, res) => {
    console.log(req.params.id)
    const sports = Sport.findById(req.params.id);
    try {
        res.status(200).json({
            status: 'success',
            data: {
                sports
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}