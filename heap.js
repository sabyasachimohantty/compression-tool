export default class PriorityQueue {
    constructor(compare) {
        this.heap = [];
        this.compare = compare;
    }

    enqueue(value) {
        this.heap.push(value);
        this.bubbleUp();
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let element = this.heap[index],
                parentIndex = Math.floor((index - 1) / 2),
                parent = this.heap[parentIndex];
            if (this.compare(element, parent) < 0) break;
            this.heap[index] = parent;
            this.heap[parentIndex] = element;
            index = parentIndex;
        }
    }

    dequeue() {
        let max = this.heap[0];
        let end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.sinkDown(0);
        }
        return max;
    }

    sinkDown(index) {
        let left = 2 * index + 1,
            right = 2 * index + 2,
            largest = index;

        if (
            left < this.heap.length &&
            this.compare(this.heap[left], this.heap[largest]) > 0
        ) {
            largest = left;
        }

        if (
            right < this.heap.length &&
            this.compare(this.heap[right], this.heap[largest]) > 0
        ) {
            largest = right;
        }

        if (largest !== index) {
            [this.heap[largest], this.heap[index]] = [
                this.heap[index],
                this.heap[largest],
            ];
            this.sinkDown(largest);
        }
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}