function validURL(userInput) {
    var regex_result = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    console.log(regex_result);
    if(regex_result == null)
        return false;
    else
        return true;
}

export { validURL }