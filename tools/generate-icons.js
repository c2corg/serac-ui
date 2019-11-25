const fs = require('fs');
const path = require('path');
const parser = require('xml2js');

const HEADER = '// Auto-generated file by generate-icons.js';

const getJsTemplate = function(prefix, name, width, height, svgPathData) {
  return `${HEADER}

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

const ${name}: IconDefinition = ({
  prefix: '${prefix}',
  iconName: '${name}',
  icon: [
    ${width},
    ${height},
    [],
    '',
    '${svgPathData}',
  ],
} as unknown) as IconDefinition;
export default ${name};
`;
};

const getIndexDotJsFileContent = function(names) {
  const imports = names.map(name => `import ${name} from './${name}';`);

  return `${HEADER}
${imports.join('\n')}

export {
  ${names.join(',\n  ')},
};
`;
};

const isDirectory = source => fs.lstatSync(source).isDirectory();

function main() {
  const root = 'src/assets/font-awesome-custom/';

  for (let subDir of fs.readdirSync(root + 'svg')) {
    if (isDirectory(path.join(root + 'svg', subDir))) {
      const names = [];

      if (!fs.existsSync(root + 'js/' + subDir)) {
        fs.mkdirSync(root + 'js/' + subDir);
      }

      for (let file of fs.readdirSync(root + 'svg/' + subDir)) {
        if (file.endsWith('.svg')) {
          names.push(file.replace('.svg', ''));

          fs.readFile(root + 'svg/' + subDir + '/' + file, function(err, data) {
            if (err) {
              console.error('Fail: ' + err);
            }
            parser.parseString(data, function(err, result) {
              if (err) {
                console.error('Fail: ' + err);
              }
              const name = file.replace('.svg', '');

              if (result && result.svg && result.svg.path) {
                fs.writeFileSync(
                  root + 'js/' + subDir + '/' + name + '.ts',
                  getJsTemplate(
                    subDir,
                    name,
                    result.svg.$.width,
                    result.svg.$.height,
                    result.svg.path[0].$.d
                  )
                );
                console.log('Done', subDir, name);
              } else {
                fs.writeFileSync(
                  root + 'js/' + subDir + '/' + name + '.ts',
                  'export default {}'
                );
                console.error('Fail', subDir, name);
              }
            });
          });
        }
      }

      fs.writeFileSync(
        root + 'js/' + subDir + '/index.ts',
        getIndexDotJsFileContent(names)
      );
    }
  }
}

// If running this module directly then call the main function.
if (require.main === module) {
  main();
}

module.exports = main;
