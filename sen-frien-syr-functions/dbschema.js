let db = {
    thoughts: [
        {
            userHandle: 'user',
            body: 'body text',
            createdAt: '2019-07-24T18:38:17.078Z',
            likeCount: 5,
            commentCount: 2
        }
    ],
    users: [
        {
            userId: '3455q3r23423456q',
            email: 'user@user.com',
            selectHandle: 'user1',
            createdAt: '2019-07-24T18:38:17.078Z',
            imageUrl: 'image/rgwwr/weqfe',
            bio: 'Hello world, my name is user',
            website: 'www.user.com',
            location: 'New York, NY'
        }
    ],
    comments: [
        {
            userHandle: 'user',
            thoughtId: 'c3f3ctcg',
            body: 'cool thought',
            createdAt: '2019-07-24T18:38:17.078Z'
        }
    ],
    notifications: [
        {
            recipient: 'user',
            sender: 'differentuser',
            read: 'true | false',
            thoughtId: '4tgewrg',
            type: 'like | comment',
            createdAt: '2019-07-24T18:38:17.078Z'
        }
    ]
};

let userInfo = {
    // redux data -> user info we're goint to hold in our redux state in our front end app/ what we'll use to populate our profile with
    credentials: {
        userId: 'NFFRN3r4t4',
        email: 'user@user.com',
        selectHandle: 'user1',
        createdAt: '2019-07-24T18:38:17.078Z',
        imageUrl: 'index/sefqergerg/wefe',
        bio: 'Hello world, my name is user',
        website: 'www.user.com',
        location: 'New York, NY'
    },
    likes: [
        {
            userHandle: 'user1',
            thoughtId: 'rgreg4tqerg'
        },
        {
            userHandle: 'user',
            thoughtId: '454gqre4qg'
        }
    ]
};

// writing out what our data's going to look like so we have it as a reference