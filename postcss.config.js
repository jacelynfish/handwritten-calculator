module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-autoreset')({
        reset: {
            margin: 0,
            padding: 0,
             borderRadius: 0
         }
     })
 ]
}
