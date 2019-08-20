const { admin, db } = require('../utilities/admin');
const config = require('../utilities/config');

const firebase = require('firebase');
firebase.initializeApp(config);

const { validateSignupData, validateLoginData, reduceUserInfo } = require('../utilities/validation');


// creates and registers a new user
exports.signup = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        selectHandle: req.body.selectHandle,
    };

    const { valid, errors } = validateSignupData(newUser);
    // this is destructuring! only pulling out certain elements from the code

    if (!valid) return res.status(400).json(errors);

    const blankProfilePic = 'blank-profile-picture.png';

    let token, userId;
    // declaring variables so we have them in scope and can use them in our function below

    db.doc(`/users/${newUser.selectHandle}`).get()
        .then(doc => {
            if (doc.exists) {
                // exists is a boolean -> true or false
                return res.status(400).json({ selectHandle: 'This handle is already in use' });
            } else {
                return firebase
                    .auth()
                    .createUserWithEmailAndPassword(newUser.email, newUser.password);
            }
        })
        // chaining another then statement because .createUser will return a promise
        .then(data => {
            // can access userId here via document snapshot
            userId = data.user.uid;
            // generating unique user token
            return data.user.getIdToken();
        })
        .then(idToken => {
            // creating user credentials
            token = idToken;
            // promise returned from data.user.getIdToken
            const userCredentials = {
                selectHandle: newUser.selectHandle,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${blankProfilePic}?alt=media`,
                userId
                // equivalent to userId: userId
            };
            // persisting credentials after they've been created by placing them in a document
            return db.doc(`/users/${newUser.selectHandle}`).set(userCredentials);
            // .set creates the document
        })
        .then(() => {
            return res.status(201).json({ token });
        })
        .catch(err => {
            console.error(err);
            if (err.code === "auth/email-already-in-use") {
                return res.status(400).json({ email: 'E-mail is already in use' })
            } else {
                return res.status(500).json({ general: 'Something went wrong - please try again' });
            }

        }
        )
};

// log in registered users

exports.login = (req, res) => {
    // request, response
    const user = {
        email: req.body.email,
        password: req.body.password
    };

    const { valid, errors } = validateLoginData(user);
    // this is destructuring! only pulling out certain elements from the code

    if (!valid) return res.status(400).json(errors);


    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(data => {
            return data.user.getIdToken();
        })
        .then(token => {
            return res.json({ token });
        })
        .catch(err => {
            console.error(err);
            // 'auth/wrong-password'
            // 'auth/user-not-found'
            return res.status(403).json({ general: 'Credentials are incorrect. Please try again.' });
            // status code 403 means unauthorized
        })
};

// add user info (bio, website, etc.)
exports.addUserInfo = (req, res) => {
    let userInfo = reduceUserInfo(req.body);
    // so now we've run reduceUserInfo to make sure there is something actually stored in the body and not an empty string

    db.doc(`/users/${req.user.selectHandle}`).update(userInfo)
        // accessing users document in the database and calling .update() and passing in userInfo is what actually updates the bio/location/site
        .then(() => {
            return res.json({ message: 'Information updated successfully' });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });

};

// get logged in user's info
exports.getAuthenticatedUser = (req, res) => {
    let userData = {};
    // this is the response data, we'll start adding to it as we go through our promise chain
    db.doc(`/users/${req.user.selectHandle}`).get()
        .then(doc => {
            if (doc.exists) {
                userData.credentials = doc.data();
            }
            return db.collection('likes').where('userHandle', '==', req.user.selectHandle).get();

        })
        .then(data => {
            userData.likes = [];
            data.forEach(doc => {
                userData.likes.push(doc.data());
            });
            return db.collection('notifications').where('recipient', '==', req.user.selectHandle)
                .orderBy('createdAt', 'desc')
                .get();
            // returning all notifications where recipient matches requested user handle in order from newest to oldest
        })
        .then(data => {
            userData.notifications = [];
            data.forEach(doc => {
                userData.notifications.push({
                    recipient: doc.data().recipient,
                    sender: doc.data().sender,
                    createdAt: doc.data().createdAt,
                    thoughtId: doc.data().thoughtId,
                    type: doc.data().type,
                    read: doc.data().read,
                    notificationId: doc.id
                })
                // this will take all the dynamic properties of the notifications object and push them into an array to be returned
            });
            return res.json(userData);
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        })
};

// get any user's collected thoughts
exports.getUserThoughts = (req, res) => {
    let userData = {};
    db.doc(`/users/${req.params.selectHandle}`).get()
        // ${} lets you put in a variable
        .then(doc => {
            if (doc.exists) {
                userData.user = doc.data();
                return db.collection('thoughts').where('userHandle', '==', req.params.selectHandle)
                    // displays all thoughts from that specific user on their profile
                    .orderBy('createdAt', 'desc')
                    .get();
            } else {
                return res.status(404).json({ error: 'User not found' });
            }
        })
        .then(data => {
            userData.thoughts = [];
            data.forEach(doc => {
                userData.thoughts.push({
                    body: doc.data().body,
                    createdAt: doc.data().createdAt,
                    userHandle: doc.data().userHandle,
                    userImage: doc.data().userImage,
                    likeCount: doc.data().likeCount,
                    commentCount: doc.data().commentCount,
                    thoughtId: doc.id
                })
            });
            return res.json(userData);
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        })
};


// upload user profile image
exports.uploadImage = (req, res) => {
    const busBoy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');

    const busboy = new busBoy({ headers: req.headers });
    let imageFilename;
    let uploadingImage = {};

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        // image.png -> my.image.png -> need to split the string by dot
        // we don't use file because it's a weird object

        if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
            return res.status(400).json({ error: 'Invalid file type' });
        }
        // this logic makes it so that users can only upload image files to their profile image -> without this, they could upload text files, gifs, etc.

        const imageExtension = filename.split('.')[filename.split('.').length - 1];
        // we're trying to get to the .png or .jpg end of the file, so we split it by . first, which returns an array [my, image, png], so we split that again by . and subtract one from the end of the array to give us what's in that space of the index

        imageFilename = `${Math.round(Math.random() * 100000000000)}.${imageExtension}`;
        // ex. image filename will equal 345183451.png

        const filepath = path.join(os.tmpdir(), imageFilename);
        // os is a namespace -> tmpdir = temporary directory, not an actual server but a cloud function

        uploadingImage = { filepath, mimetype };

        file.pipe(fs.createWriteStream(filepath));
        // this creates the actual file
        return;
    });
    // passing busboy a file event
    // have to put all of the arguments into the handler even though we're not using them to make sure each value goes to the right place (ex. if we took out encoding, the mimetype argument would receive encoding's value since it would move to 4th place in the handler/callback function)

    busboy.on('finish', () => {
        // we need to upload the file we just created
        // finish event means that once this is done, it'll be executed
        // takes a callback without any arguments
        admin
            .storage()
            .bucket(`${config.storageBucket}`)
            .upload(uploadingImage.filepath, {
                resumable: false,
                metadata: {
                    metadata: {
                        contentType: uploadingImage.mimetype
                    }
                }
            })
            .then(() => {
                // admin.storage... returns a promise, so we chain a .then
                // using the .then to create an image url we can attach to the user
                const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFilename}?alt=media`;
                // using storagebucket key from config.js!
                // this is why we moved the scope of imageFilename so we could access it here in this function as well
                // you need to add alt=media at the end, otherwise accessing the url will download the image to your computer instead of displaying it in the browser
                return db.doc(`/users/${req.user.selectHandle}`).update({ imageUrl });
                // added fireBaseAuth middleware to make this a protected route in imdex.js -> this gives us access to authenticated user object
                // can call .update which takes an object containing { field: value } to be updated or created if it doesn't already exists
                // { imageUrl } is equivalent to { imageUrl: imageUrl }
            })
            .then(() => {
                return res.json({ message: 'Image uploaded successfully' });
            })
            .catch(err => {
                console.error(err);
                return res.status(500).json({ error: err.code });
            })

    });

    busboy.end(req.rawBody);
    // rawBody is a property that's in every request object
    return;

};
// busboy is a streaming parser for HTML form data for node.js
// Blank Profile Pic image by <a href="https://pixabay.com/users/WandererCreative-855399/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=973460">Stephanie Edwards</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=973460">Pixabay</a>

// mark notifications as read

exports.markNotificationsAsRead = (req, res) => {
    let batch = db.batch();
    // batch write -> when you need to update multiple documents in Firebase
    req.body.forEach(notificationId => {
        // our body is an array!
        const notification = db.doc(`/notifications/${notificationId}`);
        // db.doc... is a document reference
        batch.update(notification, { read: true });
    });
    batch.commit()
        .then(() => {
            return res.json({ message: 'Notifications marked as read' });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        })
};
// going to send server an array of IDs that the user has seen once they open a dropdown menu