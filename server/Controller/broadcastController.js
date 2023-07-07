const Broadcast = require('./../Model/broadcastModel');

exports.createBroadcast = async (req, res) => {
    try {
        const broadcast = await Broadcast.create(req.body);
        res.status(200).json({
            status: 'success',
            data: {
                broadcast
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.getBroadcasts = async (req, res) => {
    const broadcast = await Broadcast.find();
    try {
        res.status(200).json({
            status: 'success',
            data: {
                broadcast
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.getBroadcast = async (req, res) => {
    const broadcast = await Broadcast.findById(req.params.id);
    try {
        res.status(200).json({
            status: 'success',
            data: {
                broadcast
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.updateBroadcast = async (req, res) => {
    const broadcast = await Broadcast.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    try {
        res.status(200).json({
            status: 'success',
            data: {
                broadcast
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.deleteBroadcast = async (req, res) => {
    await Broadcast.findByIdAndDelete(req.params.id);
    try {
        res.status(200).json({
            status: 'success',
            data: null
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}