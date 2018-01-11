class Item {
    constructor(documentItem) {
        this._item = documentItem;
        const itemOffset = this._item.getBoundingClientRect();
        console.log(itemOffset);
        this._width = itemOffset.width;
        this._height = itemOffset.height;
    }

    show(duration = 0.2) {
        this._item.style.display = 'block';
        this._item.style.animation = `fadeIn ${duration}s`;
        if (this._width == 0) {
            const itemOffset = this._item.getBoundingClientRect();
            this._width = itemOffset.width;
            this._height = itemOffset.height;
        }
    }

    hide(duration = 0.2) {
        this._item.style.animation = `fadeOut ${duration}s`;
        setTimeout(() => {
            this._item.style.display = 'none';
        }, duration * 1000);
    }

    get Width() {
        return this._width;
    }

    get Height() {
        return this._height;
    }

    set X(x) {
        this._item.style.left = Math.floor(x);
    }

    set Y(y) {
        this._item.style.top = Math.floor(y);
    }

    set Animation(animationQuery) {
        this._item.style.animation = animationQuery;
    }

    set Text(txt) {
        this._item.textContent = txt;
    }

    reset_animation() {
        this._item.style.animation = 'none';
        this._item.offsetHeight;
        this._item.style.animation = null;
    }
}

exports.Item = Item;