const { admin, db } = require('./admin');

// want to make sure the user is logged in before they post a new thought
// you can pass a second argument to a route that's a function
// function will intercept the request and do something with it and decide whether or not to proceed to handler or to return a response -> this is middleware!
module.exports = (req, res, next) => {
    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        // you don't technically have to start the authorization header with Bearer, but it is a convention among multiple frameworks, so it's common
        // .startsWith() -> javascript function that checks if a string starts with a specified  string
        idToken = req.headers.authorization.split('Bearer ')[1];
        // calling .split() because there's a Bearer and a space before the token itself
        // .split() will return two strings: "Bearer  " and a second string with just the token ([1] is the second element in the array -> the token!)
    } else {
        console.error('No token found');
        return res.status(403).json({ error: 'Unauthorized' });
        // 403 -> unauthorized
    }
    // not enough just to verify there is a token - we need to make sure it's a token from our app
    admin.auth().verifyIdToken(idToken)
        .then(decodedToken => {
            req.user = decodedToken;
            return db.collection('users')
                // handle is stored in our database, not the firebase admin, so we need to make a request there to get access to it
                .where('userId', '==', req.user.uid)
                .limit(1)
                .get();
        })
        .then(data => {
            req.user.selectHandle = data.docs[0].data().selectHandle
            // data.docs is the array -> run data the function after it to extract the data from this document
            // getting selectHandle property from the users document and attaching it to our user
            req.user.imageUrl = data.docs[0].data().imageUrl
            return next();
            // allows request to proceed 
        })
        .catch(err => {
            console.error('Token unable to be validated', err);
            return res.status(403).json(err);
        });
    return;
    // if it fails to verify the token, it will go to catch the error
};
