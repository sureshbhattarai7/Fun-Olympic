const News = require("../Model/newsModel");

exports.createNews = async (req, res) => {
    try {
        const newsdata = await News.create(req.body);
        res.status(200).json({
            status: "success",
            data: newsdata
        })
    } catch (error) {
        return res.status(400).json({
            status: "failed",
            message: "something went wrong"
        })

    }
}

exports.getNews = async (req, res) => {
    try {
        const getdata = await News.find();
        res.status(200).json({
            status: "success",
            data: getdata
        })
    } catch (error) {
        return res.status(400).json({
            status: "failed",
            message: "something went wrong"
        })
    }
}

exports.singleNews = async (req, res) => {
    try {
        const getdata = await News.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: getdata
        })
    } catch (error) {
        return res.status(400).json({
            status: "failed",
            message: "something went wrong"
        })
    }
}