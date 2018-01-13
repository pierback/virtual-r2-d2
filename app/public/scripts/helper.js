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

exports.getAllMethods = (obj) => {
    let props = [];
    do {
        const l = Object.getOwnPropertyNames(obj)
            .concat(Object.getOwnPropertySymbols(obj).map(s => s.toString()))
            .sort()
            .filter((p, i, arr) =>
                typeof obj[p] === 'function' &&  //only the methods
                p !== 'constructor' &&           //not the constructor
                (i == 0 || p !== arr[i - 1]) &&  //not overriding in this prototype
                props.indexOf(p) === -1          //not overridden in a child
            );
        props = props.concat(l);
    }
    while (
        (obj = Object.getPrototypeOf(obj)) &&   //walk-up the prototype chain
        Object.getPrototypeOf(obj)              //not the the Object prototype methods (hasOwnProperty, etc...)
    );

    return props;
};