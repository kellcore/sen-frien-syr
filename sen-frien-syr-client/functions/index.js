const functions = require('firebase-functions');
const admin = require('firebase-admin');
// using const require instead of import because this is essentially nodejs code, not es6!
const app = require('express')();
// requiring and initializing express as our middleware between react and firebase


var serviceAccount = require("./sensoryfriendlysyracuse-firebase-adminsdk-uewkj-9fd1dcce79.json");



admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sensoryfriendlysyracuse.firebaseio.com"
});
// thanks to user qvtxify on youtube for the code to get API key working!



const fireBaseAuth = require('./utilities/fireBaseAuth');
//show me what you goooooooooooooot

const { collectAllThoughts, createNewThought, collectOneThought, commentOnThought, likeThought, unlikeThought, deleteThought } = require('./handlers/thoughts');
const { signup, login, uploadImage, addUserInfo, getAuthenticatedUser, getUserThoughts, markNotificationsAsRead } = require('./handlers/users');

const { db } = require('./utilities/admin');

const { config } = require('./utilities/config');

// thought routes
app.get('/thoughts', collectAllThoughts);
app.post('/thought', fireBaseAuth, createNewThought);
// adding fireBaseAuth argument to the request makes sure the user is authenticated via token before request proceeds to adding new thought
app.get('/thought/:thoughtId', collectOneThought);
// can only send data in a get request through url parameters!
// : tells our app that this is a route parameter so we can access its value
app.post('/thought/:thoughtId/comment', fireBaseAuth, commentOnThought);
app.get('/thought/:thoughtId/like', fireBaseAuth, likeThought);
app.get('/thought/:thoughtId/unlike', fireBaseAuth, unlikeThought);
app.delete('/thought/:thoughtId', fireBaseAuth, deleteThought);

// user routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', fireBaseAuth, uploadImage);
app.post('/user', fireBaseAuth, addUserInfo);
app.get('/user', fireBaseAuth, getAuthenticatedUser);
// app.post /user takes input, app.get /user displays what's already on hand
app.get('/user/:selectHandle', getUserThoughts);
// we pass in the handle and the application gives back details about the user
app.post('/notifications', fireBaseAuth, markNotificationsAsRead);
// these are not what the user sees -> just what we send as requests to our back end



exports.createNotificationOnLike = functions
    .firestore.document('likes/{id}')
    .onCreate((snapshot) => {
        return db.doc(`/thoughts/${snapshot.data().thoughtId}`).get()
            .then(doc => {
                if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
                    // adding a check to see if the person who posted the thought is also the person who clicked like -> won't create a notification if they're the same -> no notification if we like our own thoughts
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdAt: new Date(),
                        recipient: doc.data().userHandle,
                        sender: snapshot.data().userHandle,
                        type: 'like',
                        read: false,
                        thoughtId: doc.id
                    })
                } else {
                    return;
                }
            })
            .catch(err => {
                return console.error(err);
                // we don't need to send back a response because this is a database trigger, not an API endpoint
            })
    });



exports.deleteNotificationOnUnlike = functions
    .firestore.document('likes/{id}')
    .onDelete((snapshot) => {
        return db.doc(`/notifications/${snapshot.id}`)
            .delete()
            .catch(err => {
                return console.error(err);
            })
    });

exports.createNotificationOnComment = functions
    .firestore.document('comments/{id}')
    .onCreate((snapshot) => {
        return db.doc(`/thoughts/${snapshot.data().thoughtId}`).get()
            .then(doc => {
                if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdAt: new Date(),
                        recipient: doc.data().userHandle,
                        sender: snapshot.data().userHandle,
                        type: 'comment',
                        read: false,
                        thoughtId: doc.id
                    });
                } else {
                    return;
                }

            })
            .catch(err => {
                console.error(err);
                return;
                // we don't need to send back a response because this is a database trigger, not an API endpoint
            });
    });

exports.onUserImageChange = functions
    .firestore.document('/users/{userID}')
    .onUpdate((change) => {
        console.log(change.before.data());
        console.log(change.after.data());
        if (change.before.data().imageUrl !== change.after.data().imageUrl) {
            console.log('user image has changed');
            const batch = db.batch();
            return db.collection('thoughts')
                .where('userHandle', '==', change.before.data().selectHandle).get()
                .then((data) => {
                    data.forEach(doc => {
                        const thought = db.doc(`/thoughts/${doc.id}`);
                        batch.update(thought, { userImage: change.after.data().imageUrl })
                    })
                    return batch.commit();
                })
        } else return true;
    });

exports.onThoughtDeletion = functions
    .firestore.document('/thoughts/{thoughtId}')
    .onDelete((snapshot, context) => {
        const thoughtId = context.params.thoughtId;
        const batch = db.batch();
        return db
            .collection('comments')
            .where('thoughtId', '==', thoughtId)
            .get()
            .then((data) => {
                data.forEach((doc) => {
                    batch.delete(db.doc(`/comments/${doc.id}`));
                });
                return db
                    .collection('likes')
                    .where('thoughtId', '==', thoughtId)
                    .get();
            })
            .then((data) => {
                data.forEach((doc) => {
                    batch.delete(db.doc(`/likes/${doc.id}`));
                });
                return db
                    .collection('notifications')
                    .where('thoughtId', '==', thoughtId)
                    .get();
            })
            .then((data) => {
                data.forEach((doc) => {
                    batch.delete(db.doc(`/notifications/${doc.id}`));
                });
                return batch.commit();
            })
            .catch((err) => console.error(err));
    });


exports.api = functions.https.onRequest(app);
    // we have to tell firebase that express will be handling/containing our routes
    // pass in whole app which will automatically turn into multiple routes instead of just one  

// this app built using the react/express/firebase tutorial from classsed @ https://www.youtube.com/watch?v=m_u6P5k0vP0

// we wrote cloud functions to access firebase instead of directly using the client -> app doubled in size from one we're building -> firebase alone would be almost the entire size of this app -> using firebase client instead of writing cloud functions can increase the size of the bundle exponentially -> you'd get charged more deploying it with a service like aws which charges by bandwidth & slower mobile devices would have a hard time unpacking this massive javascript bundle -> app using firebase client would also be close to 900kb without material ui or design elements

// source-map-explorer