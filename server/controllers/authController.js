const logIn = (req, res) => {
    res.send('Login');
}

const logOut = (req, res) => {
    res.send('Log out');
}

const signUp = (req, res) => {
    res.send('Sign Up');
}

module.exports = { logIn, logOut, signUp };