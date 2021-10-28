const path = require("path");

const renderFakePage = async (req, res) => {
    res.render(path.join("pages", "home"));
};

module.exports = {
    renderFakePage,
};
