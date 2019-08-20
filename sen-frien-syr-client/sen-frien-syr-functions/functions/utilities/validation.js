// helper function to make sure string isn't empty during sign up
const fieldIsEmpty = (string) => {
    if (string.trim() === '') return true;
    else return false;
    // .trim eliminates any white spaces
};

// helper function to validate email address entered
const isValidEmail = (email) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // reg ex that matches the pattern of an email - valid syntax
    if (email.match(emailRegEx)) return true;
    // .match() function matches a string against a regular expression
    // if true, string is formatted as a valid email address
    else return false;
};

exports.validateSignupData = (data) => {
    let errors = {};
    // need to return all errors together if a field is left blank during signup -> creating empty errors object

    if (fieldIsEmpty(data.email)) {
        errors.email = 'Field is required'
    } else if (!isValidEmail(data.email)) {
        errors.email = 'E-mail must be a valid address'
    }
    // if user submits form with a blank email field, send first error
    // if user submits form without a valid email syntax, send second error

    if (fieldIsEmpty(data.password)) errors.password = 'Field is required';
    // checks that password field has a value and returns error if it doesn't

    if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    // checks that password and confirmPassword have the same value and sends an error if they don't

    if (fieldIsEmpty(data.selectHandle)) errors.selectHandle = 'Field is required';
    // checks that user has entered a handle and returns error if left blank

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
        // if there's no keys, it's true, otherwise it's false

        // need to make sure that errors object created above is empty before we proceed with creating a new user
        // capital O object because it's a javascript class
        // if length of keys in errors is greater than 0, that means there's something in there and we need to stop the code
        // status 400 = user error
    }
};

exports.validateLoginData = (data) => {
    let errors = {};

    if (fieldIsEmpty(data.email)) errors.email = 'Field is required';
    if (fieldIsEmpty(data.password)) errors.password = 'Field is required';

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
};

exports.reduceUserInfo = (data) => {
    let userInfo = {};

    if (!fieldIsEmpty(data.bio.trim())) userInfo.bio = data.bio;
    // .trim() method removes any whitespace
    // if data.bio is not empty, set userInfo.bio equal to it
    if (!fieldIsEmpty(data.website.trim())) {
        if (data.website.trim().substring(0, 4) !== 'http') {
            userInfo.website = `http://${data.website.trim()}`;
        } else userInfo.website = data.website;
        // substring takes a string from a string if you give it a start and an end
        // 4 is the p in https, not the s
        // if user submits a website like https://website.com, we'll save it as is, but if they just submit website.com, we'll add http:// to it
    }
    if (!fieldIsEmpty(data.location.trim())) userInfo.location = data.location;

    return userInfo;
};
    // we're doing this because our react front end will return a blank string even if the user doesn't type anything into the bio, location, or website input
    // if they leave it empty, our react app is going to send a bio property with an empty string so our code here makes sure that we don't actually submit an empty string for a value of a property to our database -> so we're not storing a bunch of empty strings if people don't type something in
    // if it's an empty string, we don't add that key