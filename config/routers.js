var paths = require("./paths")
const searchRouter = (req, res, config, match = null) => {
    Object.keys(paths).forEach(path => (req._parsedUrl.pathname == path ? match = paths[path] : undefined));
    if (match == null) {
        res.status(404);
        res.send('Not Found')
    }
    else
        require(match).init(req, res, config);
}
module.exports.searchRouter = searchRouter