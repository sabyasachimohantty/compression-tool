import createHuffmanTree from "./huffman.js"
import encode from "./encode.js"
import fs from 'fs'

export default function compress(file) {
    const data = fs.readFileSync(file, 'utf-8')
    const tree = createHuffmanTree(data)
    encode(tree, data, file)
}