const { db } = require('../utilities/admin');

// gets a list of all thoughts
exports.collectAllThoughts = (req, res) => {
    // using express to create our routes, first parameter is name of the route and the second is the handler
    db
        .collection('thoughts')
        .orderBy('createdAt', 'desc')
        // chaining the order by method so that thoughts will be returned and sorted by the time they were created with the latest one first (that's why it's desc!)
        .get()
        // accessing the collection we created in the firebase database
        .then(data => {
            // returns a promise and data here is a querySelector
            let thoughts = [];
            // creating a variable to store our array
            data.forEach(doc => {
                thoughts.push({
                    thoughtId: doc.id,
                    ...doc.data([])
                    // fixed!

                    // spread operator pulls in the rest of the data found in the doc so we don't have to request each value individually
                });
                // changed doc.data to an object so we could reference the data in it and also the id
                // can't just call doc because it's a reference -> have to call doc.data to access info
                // doc.data is a function that returns the data inside the document
            });
            // after the forEach loop, the thoughts array should be populated with all of the thoughts we have stored
            return res.json(thoughts);
        })
        .catch(err => console.error(err))
    // catching errors since this returns a promise
    // will log any errors to the console
};

// post a new thought
exports.createNewThought = (req, res) => {

    if (req.body.body.trim() === '') {
        return res.status(400).json({ body: 'Field is required' });
    }

    const newThought = {
        body: req.body.body,
        // property in the body of the request
        userHandle: req.user.selectHandle,
        createdAt: new Date().toISOString(),
        // creates new date using javascript Date object and turns it into a string
        userImage: req.user.imageUrl,
        likeCount: 0,
        commentCount: 0
    };
    //     // now that we have our object, we need to persist it in our database
    db
        .collection('thoughts')
        .add(newThought)
        // takes a json object and adds it to our database
        .then(doc => {
            const thoughtResponse = newThought;
            thoughtResponse.thoughtId = doc.id;
            res.json(thoughtResponse);
            // instead of returning message: `document ${doc.id} created successfully` , now we're returning the new thought to the user once it's created
            return;
        })
        .catch(err => {
            res.status(500).json({ error: 'internal error' });
            // returning a status code of 500 (server error) if there's an error
            console.error(err);
        })
    return null;
};

// get a single thought
exports.collectOneThought = (req, res) => {
    let thoughtData = {};
    db.doc(`/thoughts/${req.params.thoughtId}`).get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Thought not found' })
                // returns this in case a user sends a request to a /thought:thoughtId that doesn't exist
            }
            thoughtData = doc.data();
            thoughtData.thoughtId = doc.id;
            // connecting thought id
            return db
                .collection('comments')
                .orderBy('createdAt', 'desc')
                .where('thoughtId', '==', req.params.thoughtId)
                .get();
            // this is getting and returning the comments from the database with the relevant thoughtId
        })
        .then(data => {
            thoughtData.comments = [];
            data.forEach(doc => {
                thoughtData.comments.push(doc.data())
                // comments is the array, thoughtData is an object
            });
            // initializes empty array and adds comments into it one by one
            return res.json(thoughtData);
            // returns array with comments in it as json
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
};

// comment on a thought
exports.commentOnThought = (req, res) => {
    if (req.body.body.trim() === '') return res.status(400).json({ comment: 'Field is required' });
    // if the body only contains white space, return a user error
    const newComment = {
        body: req.body.body,
        createdAt: new Date().toISOString(),
        thoughtId: req.params.thoughtId,
        userHandle: req.user.selectHandle,
        userImage: req.user.imageUrl
    };
    // creating comment object to persist to our database
    db.doc(`/thoughts/${req.params.thoughtId}`).get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Thought not found' });
                // we don't want users submitting comments to thoughts that no longer exist
            }
            // if we pass this if, then the thought does exist, and we continue on
            return doc.ref.update({ commentCount: doc.data().commentCount + 1 });
            // increments comment count by 1 every time a new comment is added
        })
        .then(() => {
            return db.collection('comments').add(newComment);
            // adds comment object to collection
        })
        .then(() => {
            return res.json(newComment);
            // returns comment back to user
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: 'Something went wrong' });
        });
};

// like a thought
exports.likeThought = (req, res) => {
    const likeDoc = db.collection('likes').where('userHandle', '==', req.user.selectHandle)
        .where('thoughtId', '==', req.params.thoughtId).limit(1);
    // .limit(1) returns an array with one document in it, not just one document
    const thoughtDoc = db.doc(`/thoughts/${req.params.thoughtId}`);

    let thoughtData;

    thoughtDoc.get()
        .then(doc => {
            if (doc.exists) {
                // it's more efficient to start with the case that you think is more likely to happen
                thoughtData = doc.data();
                thoughtData.id = doc.id;
                return likeDoc.get();
            } else {
                return res.status(404).json({ error: 'Thought not found' });
            }
        })
        .then(data => {
            if (data.empty) {
                // if the array [data] is empty, that means there's no like
                return db.collection('likes').add({
                    thoughtId: req.params.thoughtId,
                    userHandle: req.user.selectHandle
                })
                    .then(() => {
                        thoughtData.likeCount++
                        // incrementing the like count by one each time
                        return thoughtDoc.update({ likeCount: thoughtData.likeCount });
                    })
                    // we can't do a return here and handle the promise in the next then because even if it's empty, it still might go through, so we're nesting the .then inside of this if block to avoid that problem
                    .then(() => {
                        return res.json(thoughtData);
                    })
            } else {
                return res.status(400).json({ error: 'Thought already liked' });
                // data is not empty, so there's a like in the array -> means user can't like it again since it's already been liked by the user
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
};

// the way databases work, you're supposed to keep each document small and try to spread out the properties -> how firebase works is that it has a max of 4 mb per document, so if you had a large social media network with thousands of likes and comments, it would be inefficient to store them all in one central document because it would be incredibly slow to query that document, you need to fetch the whole document to get any of the properties with querying languages, so it's more efficient to store the likes and comments in separate collections instead of lumping them all into one massive thoughts collection

// unlike a thought
exports.unlikeThought = (req, res) => {
    const likeDoc = db.collection('likes').where('userHandle', '==', req.user.selectHandle)
        .where('thoughtId', '==', req.params.thoughtId).limit(1);
    // .limit(1) returns an array with one document in it, not just one document
    const thoughtDoc = db.doc(`/thoughts/${req.params.thoughtId}`);

    let thoughtData;

    thoughtDoc.get()
        .then(doc => {
            if (doc.exists) {
                // it's more efficient to start with the case that you think is more likely to happen
                thoughtData = doc.data();
                thoughtData.id = doc.id;
                return likeDoc.get();
            } else {
                return res.status(404).json({ error: 'Thought not found' });
            }
        })
        .then(data => {
            if (data.empty) {
                return res.status(400).json({ error: 'Thought not liked' });
                // can't unlike something we haven't liked yet
            } else {
                return db.doc(`/likes/${data.docs[0].id}`).delete()
                    .then(() => {
                        thoughtData.likeCount--;
                        return thoughtDoc.update({ likeCount: thoughtData.likeCount });
                    })
                    .then(() => {
                        return res.json(thoughtData);
                    })
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
};

// Delete a thought
exports.deleteThought = (req, res) => {
    const docuMent = db.doc(`/thoughts/${req.params.thoughtId}`);

    docuMent.get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Thought not found' });
            }
            if (doc.data().userHandle !== req.user.selectHandle) {
                return res.status(403).json({ error: 'Unauthorized' });
                // need to make sure user trying to delete the thought is the same user that posted the thought
            } else {
                return docuMent.delete();
            }
        })
        .then(() => {
            return res.json({ message: 'Thought deleted successfully' });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
};