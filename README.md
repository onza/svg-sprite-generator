# SVG Sprite generation via gulp tasks
A method for the automated creation of SVG sprites 

## What does it do?
Put SVG files in the icon source directory, the gulp tasks create the sprite file.<br>
Icons can be added or deleted at any time, the sprite file is automatically updated.

### Styling examples
The appearance such as icon color, size, etc. can be changed by utility classes.<br>
For the SVG files, ``<svg fill="currentColor" `` is required as a color value for color manipulation.

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
At the end of the HTML file is the sprite file to avoid additional requests.
```
<div class="is-hidden">
  {Content of the SVG sprite file}
</div>
```
Or you can adjust the path of each individual icon. 