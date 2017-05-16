export default class Data {

    constructor (groups, UI) {
        this.groups = groups;
        this.UI     = UI;

        this._data = [];

        this.directDraw = false;

        this.initialize();
    }

    draw() {
        this._data.forEach((arr, x) => {
            arr.forEach((point, y) => {
                this.UI.setElementValue(x, y, point.value);
            })
        })
    }

    set (x, y, v) {
        if(this.directDraw) {
            this.UI.setElementValue(x, y, v);
        }
        this.setValue(x, y, v);
    }

    setValue (x, y, v) {
        this._data[ x ][ y ].history.push(v);
        this._data[ x ][ y ].value = v;
    }

    clearValue(x, y) {
        this._data[x][y].value = 0;
    }

    get (x, y) {
        return this._data[ x ][ y ];
    }

    getValue (x, y) {
        return this.get(x, y).value;
    }

    initialize () {
        for ( let y = 0; y < 9; y++ ) {
            for ( let x = 0; x < 9; x++ ) {

                if ( !this._data[ x ] ) this._data[ x ] = [];
                this._data[ x ][ y ] = {
                    value:   0,
                    history: [],
                    group:   this.findGroup(x, y)
                };
            }
        }

        this.groups.forEach(group => {
            group.getPoints = () => {
                let points = [];
                group.fields.forEach(field => {
                    points.push(this.get(field.x, field.y));
                });
                return points;
            };
            group.fields.forEach(field => {
                if ( field.value > 0 ) {
                    this._data[ field.x ][ field.y ].value    = field.value;
                    this._data[ field.x ][ field.y ].editable = false;

                    this.UI.setElementValue(field.x, field.y, field.value);
                }
            });
        });
    }

    findGroup (x, y) {
        let _group;
        this.groups.forEach(group => {
            let match = group.fields.find(field => {
                return field.x === x && field.y === y;
            });
            if ( match ) _group = group;
        });
        return _group;
    }

    getColumn (y) {
        return this._data[ y ].map(point => {
            return point.value;
        });
    }

    getRow (x) {
        let arr = [];
        for ( let i = 0; i < 9; i++ ) {
            arr.push(this._data[ i ][ x ].value);
        }
        return arr;
    }

    getBlock (x, y) {
        let _x      = (x - x % 3),
            _xLimit = _x + 3,
            _y      = (y - y % 3),
            _yLimit = _y + 3,
            arr     = [];

        for ( let a = _x; a < _xLimit; a++ ) {
            for ( let b = _y; b < _yLimit; b++ ) {
                arr.push(this.getValue(a, b));
            }
        }

        return arr;
    }

}