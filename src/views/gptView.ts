// import axios from "axios";
import * as vscode from "vscode";
const axios = require("axios");

export class ChatViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "GPT.GPTV";

  private _view?: vscode.WebviewView;

  constructor(private readonly context: vscode.ExtensionContext) {
    this.context = context;
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
    };

    webviewView.webview.html = this.getWebviewContent();

    webviewView.webview.onDidReceiveMessage(
      async (message) => {
        switch (message.command) {
          case "ask":
            const response = await this.askChatGPT(message.text);
            webviewView.webview.postMessage({ text: response });
            break;
        }
      },
      undefined,
      this.context.subscriptions
    );
  }

  private getWebviewContent() {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>ChatGPT</title>
      </head>
      <body>
          <div>
            <h1>Chat with ChatGPT</h1>
            <input type="text" id="question" placeholder="Ask a question"/>
            <button onclick="askQuestion()">Ask</button>
            <div id="answer"></div>
          </div>
          <script>
              const vscode = acquireVsCodeApi();
              function askQuestion() {
                  const question = document.getElementById('question').value;
                  vscode.postMessage({ command: 'ask', text: question });
              }

              window.addEventListener('message', event => {
                  const message = event.data;
                  document.getElementById('answer').textContent = message.text;
              });
          </script>
      </body>
      </html>`;
  }

  private async askChatGPT(question: string): Promise<string> {
    try {
      console.log("question", question, globalThis.fetch);
      const response = await globalThis.fetch(
        "https://api.openai.com/v1/engines/gpt-3.5-turbo/completions",
        {
          method: "POST",
          body: JSON.stringify({ prompt: question, max_tokens: 150 }),
          headers: {
            Authorization: `Bearer sk-proj-2gIO10Mlzd5Fcwo1U2EjT3BlbkFJe3OTG8CNQtHwqXsKC3CP`,
          },
        }
      );
      // const response = await axios(
      //   "https://api.openai.com/v1/engines/gpt-3.5-turbo/completions",
      //   {
      //     prompt: question,
      //     max_tokens: 150,
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer sk-proj-2gIO10Mlzd5Fcwo1U2EjT3BlbkFJe3OTG8CNQtHwqXsKC3CP`,
      //     },
      //   }
      // );
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error(error);
      return "Error fetching response from ChatGPT";
    }
  }
}
