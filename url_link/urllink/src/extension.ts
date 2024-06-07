
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as child_process from 'child_process';
import axios from 'axios';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('urllink.link', async () => {
        // Prompt the user for the URL
        const url = await vscode.window.showInputBox({ prompt: 'Enter the URL' });

        if (!url) {
            vscode.window.showErrorMessage('No URL provided');
            return;
        }

        try {
            const response = await axios.get(url);

            // Convert the data to JSON
            const data = JSON.stringify(response.data, null, 2);
        

            // Save the data to a JSON file
            const filePath = path.join( 'data_new.txt');
            fs.writeFileSync(filePath, data);

            vscode.window.showInformationMessage(`Data saved to ${filePath}`);

            // The path to the Python script
            // const activateScript = path.join('sanjay/transcription/venv', 'activate')
            

            // const command = `${activateScript} && python cursor_json.py`;



            const scriptPath = path.join( 'cursor_json.js');
            console.log(scriptPath)

            // Run the Python script
            child_process.exec(scriptPath, (error, stdout, stderr) => {
                if (error) {
                    vscode.window.showErrorMessage(`Error running js script: ${error}`);
                } else if (stderr) {
                    vscode.window.showErrorMessage(`nodejs script error: ${stderr}`);
                } else {
                    vscode.window.showInformationMessage(`nodejs script output: ${stdout}`);
                }
            });
        } catch (error) {
            vscode.window.showErrorMessage(`Error fetching data: ${error}`);
        }
    });


    context.subscriptions.push(disposable);
}

export function deactivate() {}

