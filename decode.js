import fs from 'fs'
import chalk from 'chalk'

export default function decode(file) {

    // Read the file
    const fileBuffer = fs.readFileSync(file)
    const headerLength = fileBuffer.readUInt32BE(0)
    
    // Extract the decoder table from the header
    const headerStr = fileBuffer.subarray(4, 4 + headerLength).toString()
    const header = JSON.parse(headerStr)
    const {decoder, extraBits} = header

    // Convert the encoded data part to binary string
    const encodedBinary = fileBuffer.subarray(4 + headerLength)
    let binaryString = ''
    for (let byte of encodedBinary) {
        binaryString += byte.toString(2).padStart(8, '0')
    }

    // Decode the data
    let code = ''
    let decodedOutput = ''
    for (let i = 0; i < binaryString.length - extraBits; i++) {
        const bit = binaryString[i]
        code = code + bit
        if (code in decoder) {
            decodedOutput = decodedOutput + decoder[code]
            code = ''
        }
    }

    // Write the decodedOutput to a file
    const outputFile = 'decompressed.txt'
    fs.writeFile(outputFile, decodedOutput, (error) => {
        if (error) {
            console.log(chalk.bold.red("Error while decompressing the file"), error)
            return
        }
        console.log(chalk.bold.greenBright("File decompressed successfully"))
    })
}
