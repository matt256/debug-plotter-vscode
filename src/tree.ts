import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

export class DebugPlotterTreeProvider implements vscode.TreeDataProvider<Dependency> {
  constructor(private workspaceRoot: string) {
    console.log('i was here');
  }
  
  getTreeItem(element: Dependency): vscode.TreeItem {
    return element;
  }

  getChildren(element?: Dependency): Thenable<Dependency[]> {
    if (!this.workspaceRoot) {
      vscode.window.showInformationMessage('No dependency in empty workspace');
      return Promise.resolve([]);
    }

    if (element) {
        return Promise.resolve([]);
    } else {
        return Promise.resolve(this.getThings());

        }
    }
  
  private getThings():Dependency[]{
    return [new Dependency("thing1",vscode.TreeItemCollapsibleState.None)];
  }

  private pathExists(p: string): boolean {
    try {
      fs.accessSync(p);
    } catch (err) {
      return false;
    }
    return true;
  }
}

class Dependency extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
  }

  iconPath = {
    light: path.join(__filename, '..', '..', 'resources', 'light', 'dependency.svg'),
    dark: path.join(__filename, '..', '..', 'resources', 'dark', 'dependency.svg')
  };
}
