
class Heap {

    constructor() {
        this.items = [];
    }

    #swap(i, j) {
        const tmp = this.items[i]
        this.items[i] = this.items[j]
        this.items[j] = tmp
        return
    }

    #left(i) {
        return 2 * i + 1
    }

    #right(i) {
        return 2 * i + 2
    }

    #parent(i) {
        return Math.floor((i - 1) / 2)
    }

    #upheap(i) {
        while (i > 0) {
            let par = this.#parent(i)
            if (this.items[par] > this.items[i]) {
                this.#swap(i, par)
                i = par
            } else {
                return
            }
        }
    }

    #downheap(i) {
        let minIndex = i
        while (i < this.items.length) {
            const left = this.#left(i)
            const right = this.#right(i)
            if (left < this.items.length && this.items[left] < this.items[minIndex]) {
                minIndex = left
            }
            if (right < this.items.length && this.items[right] < this.items[minIndex]) {
                minIndex = right
            }
            if (minIndex === i) {
                return
            }
            this.#swap(i, minIndex)
            i = minIndex
        }
    }

    peek() {
        try {    
            return this.items[0];
        } catch (error) {
            throw new Error('The heap is empty')
        }
    }

    add(val) {
        this.items.push(val);
        let i = this.items.length - 1
        if (i === 0) {
            return
        }
        this.#upheap(i)
    }

    remove() {
        try {
            const val = this.items[0]
            this.items[0] = this.items.pop()
            this.#downheap(0)
            return val
        } catch (error) {
            throw new Error('Cannot remove from an empty heap')
        }
    }

    heapify(arr) {
        this.items = arr
        let i = this.#parent(this.items.length - 1)
        while (i >= 0) {
            this.#downheap(i)
            i--
        }
    }
}

// try {
//     const heap = new Heap()
//     heap.heapify([10, -50, 78, 1, 0, 67])
//     // heap.add(20)
//     // heap.add(15)
//     // heap.add(100)
//     // heap.add(-10)
//     // heap.add(200)
//     console.log(heap.remove())
//     console.log(heap.remove())
//     console.log(heap.remove())
//     console.log(heap.remove())
//     console.log(heap.peek())
// } catch (error) {
//     console.log(error)
// }