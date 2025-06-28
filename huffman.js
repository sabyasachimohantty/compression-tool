import PriorityQueue from "./heap.js"

class HuffmanNode {
    constructor(data, wt) {
        this.data = data
        this.wt = wt
        this.left = null
        this.right = null
    }
}

export default function createHuffmanTree(data) {
    
    // Create the frequency map
    const freqTable = new Map()
    for (const c of data) {
        if (freqTable.has(c)) {
            const count = freqTable.get(c)
            freqTable.set(c, count + 1)
        } else {
            freqTable.set(c, 1)
        }
    }

    // Create a minHeap and add the Huffman Nodes
    const pq = new PriorityQueue((a, b) => a.wt <= b.wt ? 1 : -1)
    for (const c of freqTable.keys()) {
        pq.enqueue(new HuffmanNode(c, freqTable.get(c)))
    }

    // Create the huffman tree
    while (pq.heap.length >= 2) {
        const leftNode = pq.dequeue()
        const rightNode = pq.dequeue()
        const newNode = new HuffmanNode(null, leftNode.wt + rightNode.wt)
        newNode.left = leftNode
        newNode.right = rightNode
        pq.enqueue(newNode)
    }

    return pq.heap[0]
}
