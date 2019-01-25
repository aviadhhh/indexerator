# indexerator 

## Features

vscode extension that auto generate index.ts/index.js file that export all current folder

```
project
│
└───folder1
│   │   file011.ts
│   │   file012.ts

```

It creates index.ts
```
project
│
└───folder1
│   │   file011.ts
│   │   file012.ts
|   |   index.ts

```

and index.ts will look like:
```javascript
export * from './file011';
export * from 'file012';
export * from 'file011';

```



Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

Right click on a folder in your project and you'll get the 'indexerator' option

![indexerator](screenshot.jpg)

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.


## Known Issues

No bugs, feel free to tell me about bugs.

## Release Notes

First release, any suggestion are welcome.

created by me- Aviad Hemo.

**Enjoy!**
