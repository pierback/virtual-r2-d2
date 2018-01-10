class Item {
    constructor (documentItem){
        this._item = documentItem;
        const itemOffset = this._item.getBoundingClientRect();
        console.log(itemOffset);
        this._width = itemOffset.width;
        this._height = itemOffset.height;

    }

    show(){
        this._item.style.display = 'block';
        if(this._width == 0){
            const itemOffset = this._item.getBoundingClientRect();
            this._width = itemOffset.width;
            this._height = itemOffset.height;
        }
    }

    hide(){
        this._item.style.display = 'none';
    }

    get Width(){
        return this._width;
    }

    get Height(){
        return this._height;
    }

    set X(x){
        this._item.style.left = Math.floor(x);
    }

    set Y(y){
        this._item.style.top = Math.floor(y);
    }

    set Animation(animationQuery){
        this._item.style.animation = animationQuery;
    }


}

exports.Item = Item;