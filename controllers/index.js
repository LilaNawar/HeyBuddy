
// API's

// HTTP GET - Index
exports.index_get = (req, res) => {
    res.render("auth/signup", {welcomeMessage: "HeyBuddy"});
}
