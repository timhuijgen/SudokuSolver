export default class Solver {

    constructor(Data) {
        this.Data = Data;
        this.interval = null;
        this.iterations = 0;
        this.currentPoint = {
            x: 0,
            y: 0
        };
        this.done = false;
        this.startTime = null;
    }

    run(a) {
        this._init(a);
        this._run(a);

        this.Data.draw();
    }

    _run(c) {
        for(let i = 0; i < c; i++) {
            if(this.done) {
                break;
            }
            this.step();
        }

        if(this.iterations % 10000 === 0)  console.clear();

        if(this.done) {
            this._finish();
        }
    }

    _init(a) {
        console.log('==== Running Solver for [%s] steps ====', a);
        this.startTime = new Date();
    }

    _finish() {
        console.clear();
        let end = new Date(),
            elapsed = ((end.getTime() - this.startTime.getTime()) / 1000);
        console.log('==== Finished with [%s] steps ====', this.iterations);
        console.log('==== Time elapsed: %s ====', elapsed);
        console.log('==== %s Iterations per second ====', (this.iterations / elapsed));
    }

    runSteps(i = 16.6) {
        this._init('~');
        this.Data.directDraw = true;
        this.interval = setInterval(this._run.bind(this, 1), i);
    }

    stop() {
        clearInterval(this.interval);
    }

    nextPoint() {
        this.currentPoint.x++;
        if(this.currentPoint.x === 9) {
            this.currentPoint.x = 0;
            this.currentPoint.y++;
        }
        if(this.currentPoint.y === 9) {
            clearInterval(this.interval);
            this.Data.draw();
            this.done = true;
        }
    }

    previousPoint() {
        this.currentPoint.x--;
        if(this.currentPoint.x === -1) {
            this.currentPoint.x = 8;
            this.currentPoint.y--;
        }
    }

    step() {
        this.iterations++;
        let value = this.getPossibleValue();
        console.log('I: %s - Step for point (%s, %s): %s', this.iterations, this.currentPoint.x, this.currentPoint.y, value);

        if(value !== false) {
            this.Data.set(this.currentPoint.x, this.currentPoint.y, value);
            this.nextPoint();
        } else {
            this.Data.set(this.currentPoint.x, this.currentPoint.y, 0);
            this.Data.get(this.currentPoint.x, this.currentPoint.y).history = [];
            this.previousPoint();
        }
    }

    getPossibleValue() {
        let point = this.Data.get(this.currentPoint.x, this.currentPoint.y);

        if(!point) throw new Error('Point (' + this.currentPoint.x + ', ' + this.currentPoint.y + ') not found');

        if(point.hasOwnProperty('editable') && point.editable === false) return point.value;

        this.Data.clearValue(this.currentPoint.x, this.currentPoint.y);

        let row = this.Data.getRow(this.currentPoint.y),
            column = this.Data.getColumn(this.currentPoint.x),
            block = this.Data.getBlock(this.currentPoint.x, this.currentPoint.y),
            points = point.group.getPoints(),
            group = points.filter(point => { return point.value > 0; }).map(point => { return point.value; }),
            usedValues = row.concat(column, block, point.history, group);

        let pointsToDo = points.filter(point => { return point.value === 0}).length,
            total = point.group.total,
            isLastPoint = pointsToDo === 1,
            groupSum = points.map(point => { return point.value}).sum();

        let min = 1,
            max = Math.min(total - minMargin(pointsToDo - 1), total - groupSum, 9);

        if(isLastPoint) {
            min = total - groupSum;
            max = min;
        }

        return uniqueValue(usedValues, min, max);
    }

}