module.exports = {
  "plugins": [
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        "autoprefixer": {
          "flexbox": "no-2009"
        },
        "stage": 3,
        "features": {
          "custom-properties": false
        }
      }
    ],
    [
      '@fullhuman/postcss-purgecss',
      {
        content: [
            './pages/**/*.{js,jsx,ts,tsx}',
            './components/**/*.{js,jsx,ts,tsx}'
        ],
        defaultExtractor: content => {
            // Capture as liberally as possible, including things like `h-(screen-1.5)`
            const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []
  
            // Capture classes within other delimiters like .block(class="w-1/2") in Pug
            const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || []
  
            return broadMatches.concat(innerMatches)
        },

        safelist: {
            standard: ['html', 'body', 'btn'],
            deep: [/^mouseover/, /^mouseOver/, /^nav/, , /^modal/]
          },
      }
    ],
  ]
}