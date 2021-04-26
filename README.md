# SVG Sprite generation (via Gulp)
### A simple - already often described - method for the automated creation of SVG sprites.
[Watch Demo](https://onza.github.io/svg-sprite-generator/)

## Features:
- Icons can be added or deleted at any time, the sprite file is automatically updated via Gulp task.
- The appearance such as icon color, size, etc. can be changed by utility classes. Examples of styling are included.<br>
For the SVG files, ``<svg fill="currentColor" `` is required as a color value for color manipulation via css.
- The sprite file is injected directly into the HTML file.
- Material Icons/Google Icons are renamed (`_black_24dp` is deleted) in order to shorten the file names & sprite svg id´s. 

## Requirements
- Node
- NPM
- Gulp CLI

## Usage
1. Download Repository
2. Run ``npm install``
3. Run ``gulp build`` or ``gulp build watch`` to run the tasks automatically when changes are made to the icon folder, the HTML file or the styles.

## Usage in HTML
```
<svg class="icon" title="what_it_is icon" role="img">
  <use xlink:href="#{icon_file_name}"></use>
</svg>
```
Put the sprite file before the closing body of the HTML file if not done via task.
```
<div style="display:none;">
  {Content of the SVG sprite file}
</div>
```
Another possibility is to give each icon the path to the sprite file.