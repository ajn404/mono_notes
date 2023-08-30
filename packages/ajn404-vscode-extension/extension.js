// vscode编辑器api入口
const vscode = require("vscode");
/**
 * 此生命周期方法在插件激活时执行
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "extension.helloWorld",
    function () {
      // 在编辑器右下角展示一个message box
      vscode.window.showInformationMessage("宁辉岳 nb!");
    }
  );

  vscode.languages.registerHoverProvider("typescript", {
    provideHover(document, position, token) {
      const md = new vscode.MarkdownString(
        `![](https://ajn404.gitee.io/note/images/logo.svg)`
      );

      return {
        contents: [md],
      };
    },
  });

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// 当插件被设置为无效时执行此生命周期钩子
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
