# hyper-everest
Custom Hyper.js plugin

## Instalation

First move to the hyper custom plugins folder:
```bash
cd ~/.hyper_plugins/local/
```

Clone this repo:
```bash
git clone https://github.com/eaemilio/hyper-everest.git
```

Install dependencies:
```
npm install
```

## Usage

Default theme is `moonlight`. You can change the settings of the theme by adding this to the `.hyper.js` config file:

```javascript
module.exports = {
  config: {
    ...
    hyperEverest: {
      theme: 'moonlight', // 'salmonChallis', 'moonlight', 'dark', 'moss'
      accent: 'white',
      hideControls: false,
    },
  } 
}
```

Also, add the custom plugin to the `.hyper.js` config file:
```javascript
module.exports = {
  config: {
    ...
    localPlugins: [
      ...
      "hyper-everest"
    ],
  } 
}
```
