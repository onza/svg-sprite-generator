# SVG Sprite generation via gulp tasks
### A simple - already often described - method for the automated creation of SVG sprites.
[Watch Demo](https://onza.github.io/svg-sprite-generator/)

## How does this work
Put SVG files in the icon source directory, the gulp tasks will create the sprite file.<br>
Icons can be added or deleted at any time, the sprite file is automatically updated.

### Styling examples
The appearance such as icon color, size, etc. can be changed by utility classes. Examples of styling are included.<br>
For the SVG files, ``<svg fill="currentColor" `` is required as a color value for color manipulation via css.

## Requirements
- Node
- NPM
- Gulp CLI

## Usage
1. Download Repository
2. Run ``npm install``
3. Run ``gulp``

## Usage in HTML
```
<svg class="icon" title="what_it_is icon" role="img">
  <use xlink:href="#{icon_file_name}"></use>
</svg>
```
Before the closing body of the HTML file put the sprite file to avoid additional requests.
```
<div style="display:none;">
  {Content of the SVG sprite file}
</div>
```
Another possibility is to give each icon the path to the sprite file.