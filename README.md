# Dragoman 
[![GitHub version](https://badge.fury.io/gh/NateBaldwinDesign%2FDragoman.svg)](https://badge.fury.io/gh/NateBaldwinDesign%2FDragoman) [![Build Status](https://travis-ci.org/NateBaldwinDesign/Dragoman.svg?branch=master)](https://travis-ci.org/NateBaldwinDesign/Dragoman) [![Dependency Status](https://gemnasium.com/badges/github.com/NateBaldwinDesign/aggregator.svg)](https://gemnasium.com/github.com/NateBaldwinDesign/aggregator) [![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)]()

_[drag-uh-muh n]_
noun
1. a professional interpreter.

Translate your web & mobile product suite into a consistent experience with universal design tokens.

## What is it?
Dragoman is a plugin for creating applications with a token-based design systems approach. Using gulp with yaml "tokens", Dragoman generates multi-platform assets for core design attributes.

This allows you build unified & consistent applications with a core set of *cross-platform variables*

#### Targeted Languages & Platforms
* Less
* Sass
* Scss
* Stylus
* Android XML
* iOS Swift 

## Getting Started

Define your paths, and the languages you intend to build your applications in the ./config.json file (_language selection in progress_). 

``` bash
$ gulp dragoman-[options]
```

#### Options:
* [default] - translates tokens to all languages
* scss
* sass
* less
* stylus
* android (xml)
* ios (swift)
* [option]-icons - generates icons along with language translation
* web - translates all web languages & generates icons
* mobile - translates android, ios, & generates icons for both

eg. If you want to translate tokens into .less along with web iconography, run:

``` bash
$ gulp dragoman-less-icons
```
----

#### Default Design Tokens
* Colors
* Fonts
* Spacing
* Iconography
* Typography

These are the core design assets that need to be controlled cross-platform variables. You can add more tokens as you need; simply include them in the 'styles.yml' token, which includes all partials for an easy import file for your CSS stylesheets.

#### Writing Variables in Tokens:
When using a variable as a value, use `%` prefix. Defining a variable (as the key), no prefix is necessary.

```yaml
my-color: "%color-primary"
```


### Example
Default color.yml file

```yaml
color:
  orange: "#f26322"
  purple: "#783084"
  light-green: "#52ff7a"
```
Output as Scss:

```sass
$color-orange: #f26322;
$color-purple: #783084;
$color-light-green: #52ff7a;
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
    return UIColor(red: 242/255.0, green: 99/255.0, blue: 34/255.0, alpha: 1.0; 
  }

  class func color-purple() -> UIColor {
    return UIColor(red: 120/255.0, green: 48/255.0, blue: 132/255.0, alpha: 1.0; 
  }

  class func color-light-green() -> UIColor {
    return UIColor(red: 82/255.0, green: 255/255.0, blue: 122/255.0, alpha: 1.0; 
  }
}
```

### Future Goals
Ultimately, I would like this tool to be able to read shareable design sourcefiles and perform the translations from those. For example, this input could be:
* Craft (by InVision) Libraries
* Adobe Libraries
* System color palettes (.clr files)
* Incorporate documentation in tokens
