import axios from "axios";
import * as vscode from "vscode";

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
    console.log(webviewView);
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
    };

    webviewView.webview.html = this.getWebviewContent();

    webviewView.webview.onDidReceiveMessage(
      async (message) => {
        switch (message.command) {
          case "ask":
            // const response = await this.askChatGPT(message.text);
            // webviewView.webview.postMessage({ text: response });
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
          <h1>Chat with ChatGPT</h1>
          <input type="text" id="question" placeholder="Ask a question"/>
          <button onclick="askQuestion()">Ask</button>
          <div id="answer"></div>
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
      const response = await axios.post("YOUR_CHATGPT_API_URL", {
        prompt: question,
        max_tokens: 150,
      });
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error(error);
      return "Error fetching response from ChatGPT";
    }
  }
}
