# json2clr

Create color palette file (.clr) from JSON

## Usage

```shell
$ json2clr -n PalleteName -i input.json -o output.clr
```

## Input JSON format

```json
[
  { "name": "background black hex", "hex": "191919" },
  { "name": "background black hex with A", "hex": "191919FF" },
  { "name": "rgb color 255", "r": "255", "g": "0", "b": "100" },
  { "name": "rgb color 1.0", "r": "1.0", "g": "0.0", "b": "0.5", "a": "0.8" }
]
```

--------------------------

# clr2json

Create color JSON file from color palette (.clr)

## Usage

```shell
$ clr2json -i input.clr -o output.json
```
