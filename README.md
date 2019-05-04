# indexerator 

## Features

* vscode index generator.  
vscode extension that auto generate ```index.ts``` or ```index.js``` file that export all current folder

File name can be change in settings.
Example:
```json
"indexerator.exportFileName": "public_api"
```

- you can change the quote style in the settings- default style is single quote
```json
"indexerator.quote" : "double"
```
or 
```json
"indexerator.quote" : "single"
```

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
export * from './file012';
export * from './file011';

```




Right click on a folder in your project and you'll get the 'indexerator' option

![indexerator](https://gitlab.com/aviadhemo/screenshot/raw/master/screenshot.jpg)



## Known Issues

No bugs, feel free to report on bugs or create a PR that fix it.

## Release Notes

Fixed- Extension crashes on empty folders.

[Changelog](CHANGELOG.md)

created by Aviad Hemo.

**Enjoy!**
