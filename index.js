import fs from 'fs/promises';

async function countFrequency(file) {
    const data = await fs.readFile(file, 'utf-8')
    const frequencyTable = {}
    for (const c of data) {
        if (c in frequencyTable) {
            frequencyTable[c] += 1
        } else {
            frequencyTable[c] = 1
        }
    }
    console.log(frequencyTable['X'])
    console.log(frequencyTable['t'])

}

await countFrequency('test.txt')