# Aggregator 
[![Build Status](https://travis-ci.org/NateBaldwinDesign/aggregator.svg?branch=development)](https://travis-ci.org/NateBaldwinDesign/aggregator) [![GitHub version](https://badge.fury.io/gh/NateBaldwinDesign%2Faggregator.svg)](https://badge.fury.io/gh/NateBaldwinDesign%2Faggregator) [![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)]()

Aggregate your web & mobile product suite into a consistent experience with universally translated design tokens.

## What is it?
Aggregator is a starter toolkit for creating applications from a token-based design systems approach. Using gulp and JSON "tokens", Aggregator generates multi-platform assets for core design attributes.

This allows you to aggregate disparate cross-platform applications to follow consistent design specifications.

*Aggregator is still in-progress, so there are still plenty of holes to fix*

##### Default Design Attributes
* Colors
* Font size
* Line-height
* Font-stacks
* Global margins
* Global padding
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

### Future Goals
Ultimately, I would like this tool to be able to read shareable design sourcefiles and perform the translations from those. For example, this input could be:
* Craft (by InVision) Libraries
* Adobe Libraries
* System color palettes (.clr files)