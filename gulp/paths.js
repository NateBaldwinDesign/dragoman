//===========================================//
// SET THE PATH TO YOUR SOURCE & DESTINATION
// [1] Path to your source JSON files
// [2] Path to distribute variable files
//===========================================//
// pathToTokens  = './tokens/',
// pathToDist    = './dest/',
// pathToTemp    = './temp/';


var paths = {
      tokens: 'tokens/',
      dist: 'dist/', 
      temp: 'temp'
    };

module.exports = {
    tokens: paths.tokens,
    dist: paths.dist,
    temp: paths.temp
}