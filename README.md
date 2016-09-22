# Dragoman 
[![GitHub version](https://badge.fury.io/gh/NateBaldwinDesign%2FDragoman.svg)](https://badge.fury.io/gh/NateBaldwinDesign%2FDragoman) [![Build Status](https://travis-ci.org/NateBaldwinDesign/Dragoman.svg?branch=master)](https://travis-ci.org/NateBaldwinDesign/Dragoman) [![Dependency Status](https://gemnasium.com/badges/github.com/NateBaldwinDesign/Dragoman.svg)](https://gemnasium.com/github.com/NateBaldwinDesign/Dragoman) [![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)]()

_[drag-uh-muh n]_
noun
1. a professional interpreter.

Translate your web & mobile product suite into a consistent experience with universal design tokens.

## What is it?
Aggregator is a starter toolkit for creating applications from a token-based design systems approach. Using gulp and JSON "tokens", Aggregator generates multi-platform assets for core design attributes.

This allows you to aggregate disparate cross-platform applications to follow consistent design specifications.

##### Default Design Attributes
* Colors
* Fonts
* Global Spacing
* Iconography

##### Targeted Languages & Platforms
* Web / Less
* Web / Sass
* Web / Scss
* Web / Stylus
* Android / XML
* iOS / Swift 

### Example
Default color.json file

```json
{
  "color": {
    "orange": "#f26322",
    "purple": "#783084",
    "light-green": "#52ff7a"
  }
}
```
Output as Sass:

```sass
$color-orange: #f26322
$color-purple: #783084
$color-light-green: #52ff7a
```
Output as Android XML:

```xml
<?xml version="1.0" encoding="utf-8"?> 
<resources> 
    <color name="color-orange">#f26322</color>
    <color name="color-purple">#783084</color>
    <color name="color-light-green">#52ff7a</color>
</resources> 
```
Output as iOS Swift: _(in progress)_

```swift
import UIKit
extension UIColor {
  class func color-orange() -> UIColor {
    return UIColor(242.0/255.0, 99.0/255.0, 34.0/255.0, alpha: 1; 
  }

  class func color-purple() -> UIColor {
    return UIColor(120.0/255.0, 48.0/255.0, 132.0/255.0, alpha: 1; 
  }

  class func color-light-green() -> UIColor {
    return UIColor(82.0/255.0, 255.0/255.0, 122.0/255.0, alpha: 1; 
  }
}
```

### Directory Structure

```
tokens/
├── global/
| ├── _colors
| ├── _fonts
├── components/
| ├── component-1/
| | ├── _light
| | ├── _dark
| | ├── _variables
| | ├── _component-1
```

### Component Structure
#### _(theme)
Light and Dark themes allow abstraction of color mapping to generate multiple instances of a component based on theme.
#### _variables
Component-specific variables are mapped here as an added abstraction layer
#### _(component-name)
This file is where the actual CSS will be translated. If using specific properties that do not need to be mapped as a variable, they will be declared here.
#### docs-(component-name).md
Markdown file for modular documentation. 

### Future Goals
Ultimately, I would like this tool to be able to read shareable design sourcefiles and perform the translations from those. For example, this input could be:
* Craft (by InVision) Libraries
* Adobe Libraries
* System color palettes (.clr files)