
/*const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');
require('dotenv').config();

new OpenAI({apiKey:"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"})
// const openai = new OpenAI(process.env.OPENAI_API_KEY);

async function getCompletion(prompt, model = "gpt-3.5-turbo") {
    const messages = [{ role: "user", content: prompt }];
    try {
        const response = await OpenAI.chat.completions.create({
            model: model,
            messages: messages,
            temperature: 0,
        });
        return response.choices && response.choices[0] && response.choices[0].message && response.choices[0].message.content;
    } catch (error) {
        console.error(`Error getting completion: ${error}`);
        return null;
    }
}

function readJsonFile(jsonFilePath) {
    try {
        const data = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
        // Adjust based on your JSON structure
        return data && data.acceptance_criteria;
    } catch (error) {
        console.error(`Error reading or parsing ${jsonFilePath}: ${error}`);
        return null;
    }
}

function createFile(codeResponse, folderPath = "Output_cursor", fileName = "data.txt") {
    fs.mkdirSync(folderPath, { recursive: true });
    const filePath = path.join(folderPath, fileName);
    fs.writeFileSync(filePath, codeResponse);
    console.log(`File '${fileName}' created in folder '${folderPath}'.`);
}

const detail = readJsonFile("data_json.json");
console.log(detail);

const prompt = `let, you are a developer and you have to give code in suitable  programing language as 
    mentioned description in ${detail}.you have to give code only response,
    if there is non code or text which provide code description it should be 
    comented like given below example:
    
    //Here, is the code for printing hello world:

    print("hello wolrd:")
    
    `;

getCompletion(prompt, "gpt-4-1106-preview")
    .then(codeResponse => {
        if (codeResponse) {
            console.log(codeResponse);
            createFile(codeResponse, "Output_cursor", "data.txt");
        } else {
            console.error('No completion generated');
        }
    })
    .catch(error => console.error(`Error getting completion: ${error}`));
*/

const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');
require('dotenv').config();
const fullPath = path.join("sanjay/transcription/cursor_swostika/CURSOR/urllink");

const openai = new OpenAI({ apiKey: "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" });

async function getCompletion(prompt, model = "gpt-3.5-turbo") {
    const messages = [{ role: "user", content: prompt }];
    try {
        const response = await openai.chat.completions.create({
            model: model,
            messages: messages,
            temperature: 0,
        });
        return response.choices && response.choices[0] && response.choices[0].message && response.choices[0].message.content;
    } catch (error) {
        console.error(`Error getting completion: ${error}`);
        return null;
    }
}

function readJsonFile(jsonFilePath) {
    try {
        const data = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
        // Adjust based on your JSON structure
        return data && data['data'][0]['acceptance_criteria'];
    } catch (error) {
        console.error(`Error reading or parsing ${jsonFilePath}: ${error}`);
        return null;
    }
}

function createFile(codeResponse, folderPath = "Output_cursor", fileName = "data.txt") {
    fs.mkdirSync(folderPath, { recursive: true });
    const filePath = path.join(folderPath, fileName);
    fs.writeFileSync(filePath, codeResponse);
    console.log(`File '${fileName}' created in folder '${folderPath}'.`);
}

const detail = readJsonFile(path.join("data_json.json"));


console.log(detail);

const prompt = `let, you are a developer and you have to give code in suitable programing language as 
    mentioned description in ${detail}.you have to give code only response,
    if there is non code or text which provide code description it should be 
    comented like given below example:
    
    //Here, is the code for printing hello world:

    print("hello wolrd:")
    
    `;

getCompletion(prompt, "gpt-4-1106-preview")
    .then(codeResponse => {
        if (codeResponse) {
            console.log(codeResponse);
            createFile(codeResponse, "Output_cursor", "data.txt");
        } else {
            console.error('No completion generated');
        }
    })
    .catch(error => console.error(`Error getting completion: ${error}`));


    // console.log(prompt);
    console.log(path)