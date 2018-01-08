exports.parseJSON = res => {
    let parsed;
    try {
        parsed = JSON.parse(res);
    } catch (e) {
        parsed = 'null';
    }
    return parsed;
};

exports.randSign = () => {
    const items = [-1, 1];
    return items[Math.floor(Math.random() * items.length)];
};

exports.stringifyJSON = test => JSON.stringify(test);

exports.log = console.log.bind(console);