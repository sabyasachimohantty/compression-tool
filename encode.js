import fs from 'fs'
import chalk from 'chalk'

export default function encode(tree, data, file) {

    // Create the encoding table
    const encoder = new Map()
    function traverse(node, code) {
        if (node.left === null && node.right === null) {
            encoder.set(node.data, code)
            return
        }

        traverse(node.left, code + '0')
        traverse(node.right, code + '1')

    }
    traverse(tree, '')

    // Create the encoded binary string
    let encodedOutput = ''
    for (const c of data) {
        encodedOutput = encodedOutput + encoder.get(c)
    }

    // Create the decoder table
    const decoder = new Map()
    for (const c of encoder.keys()) {
        decoder.set(encoder.get(c), c)
    }

    // Create a header
    const extraBits = encodedOutput.length % 8
    const header = {
        decoder: Object.fromEntries(decoder),
        extraBits
    }
    const headerStr = JSON.stringify(header)
    const headerBuffer = Buffer.from(headerStr)

    // Add a separator
    const headerLengthBuffer = Buffer.alloc(4)
    headerLengthBuffer.writeUInt32BE(headerBuffer.length)
    
    // convert the binary string to bytes
    encodedOutput = encodedOutput + '0' * extraBits
    const bytes = []
    for (let i = 0; i < encodedOutput.length; i += 8) {
        const byteString = encodedOutput.substring(i, i + 8)
        const byteValue = parseInt(byteString, 2)
        bytes.push(byteValue)
    }
    const buffer = Buffer.from(bytes)

    // Write to the output file
    const outputFile = 'compressed.txt'
    fs.writeFile(outputFile, Buffer.concat([
        headerLengthBuffer,
        headerBuffer,
        buffer
    ]), (error) => {
        if (error) {
            console.log(chalk.red('Error while writing the binary'), error)
            return
        }
        console.log(chalk.bold.blue('File successfully compressed'))

        // Calculate percentage of memory saved
        const inputFileSize = getFileSize(file)
        const outputFileSize = getFileSize(outputFile)
        const memorySaved = inputFileSize - outputFileSize
        const savingPercentage = (memorySaved / inputFileSize) * 100
        console.log(chalk.green(`${chalk.bold(savingPercentage)} % of memory is saved`))

    })
    

}

function getFileSize(file) {
    const stat = fs.statSync(file)
    return stat.size
}