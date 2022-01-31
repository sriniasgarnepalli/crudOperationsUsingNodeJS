const notFound = (req, res, err) => {
    res.status(404).send(' Route does not exist')
}

module.exports = notFound