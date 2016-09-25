# Dragoman 
[![GitHub version](https://badge.fury.io/gh/NateBaldwinDesign%2FDragoman.svg)](https://badge.fury.io/gh/NateBaldwinDesign%2FDragoman) [![Build Status](https://travis-ci.org/NateBaldwinDesign/Dragoman.svg?branch=master)](https://travis-ci.org/NateBaldwinDesign/Dragoman) [![Dependency Status](https://gemnasium.com/badges/github.com/NateBaldwinDesign/aggregator.svg)](https://gemnasium.com/github.com/NateBaldwinDesign/aggregator) [![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)]()

_[drag-uh-muh n]_
noun
*1. a professional interpreter.*

Translate your web & mobile product suite into a consistent experience with universal design tokens.

## What is it?
Dragoman is a starter toolkit for creating applications from a token-based design systems approach. Using gulp and JSON "tokens", Dragoman generates multi-platform assets for core design attributes.

This allows you to aggregate disparate cross-platform applications to follow consistent design specifications.

## Getting Started

Define your paths, and the languages you intend to build your applications in the ./config.json file (_language selection in progress_). 

##### Default Design Tokens
* Colors
* Fonts
* Spacing
* Iconography
* Typography

These are the core design assets that need to be controlled cross-platform variables. You can add more tokens as you need; simply include them in the 'styles.json' token, which includes all partials for an easy import file for your CSS stylesheets.

##### Targeted Languages & Platforms
* Less
* Sass
* Scss
* Stylus
* Android XML
* iOS Swift 

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
| ├── _colors
| ├── _fonts
| ├── _icons
| ├── _spacing
| ├── _styles
| ├── _typography
```

### Future Goals
Ultimately, I would like this tool to be able to read shareable design sourcefiles and perform the translations from those. For example, this input could be:
* Craft (by InVision) Libraries
* Adobe Libraries
* System color palettes (.clr files)
* Incorporate documentation as tokens
* Configure a version to work with Fabricator