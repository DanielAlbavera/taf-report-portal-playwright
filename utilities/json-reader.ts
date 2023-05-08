import fs from 'fs';

//By Terminal: './business/data/test-data.json'
//By Test xExtension: '../business/data/test-data.json'
const jsonPath: string = './business/data/test-data.json';
const jsonFile = fs.readFileSync(jsonPath); 
const jsonData = JSON.parse(jsonFile.toString());

export function getLaunchesDataSets(): [] {
    return jsonData['launches'];
}