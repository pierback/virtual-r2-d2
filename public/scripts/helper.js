exports.parseJSON = res => {
    let parsed;
    try {
        parsed = JSON.parse(res);
    } catch (e) {
        parsed = 'null';
    }
    return parsed;
};

exports.stringifyJSON = test => JSON.stringify(test);

exports.Log = res => console.log(res);