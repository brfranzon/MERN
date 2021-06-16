const yaml = require('js-yaml')
const path = require('path')
const fs = require('fs')

const args = process.argv.slice(2);

const convertYamlToJson = () => {
  console.log('converting yaml to json')
  const doc = yaml.load(fs.readFileSync(path.join(process.cwd(), 'translations.yaml'), 'utf8'))
  if (doc) {
    fs.writeFileSync(path.join(process.cwd(), 'src', 'translations.json'), JSON.stringify(doc, null, 2), 'utf8')
  }
}

if(args.includes('--watch')){
  fs.watchFile('translations.yaml', () => convertYamlToJson());
}

convertYamlToJson();