const path = require("path");

const renderFakePage = (req, res) => {
    res.render(path.join("pages", "home"));
};

const renderFakePageUsingTag = (req, res) => {
    res.render(path.join("pages", "tag"));
};

module.exports = {
    renderFakePage,
    renderFakePageUsingTag,
};
