const fs = require('fs');

const properties = {
  autoplay: ['boolean', 'flag', 'a boolean indicating whether the video should start playing as soon as it is ready.'],
  controls: ['boolean', 'flag', 'a boolean indicating whether the video controls should be displayed.'],
  height: ['number', 'pixels', 'the height of the video in pixels.'],
  loop: ['boolean', 'flag', 'a boolean indicating whether the video should start over again, every time it is finished.'],
  muted: ['boolean', 'flag', 'a boolean indicating whether the video output should be muted.'],
  poster: ['string', 'url', 'the URL of an image to be shown while the video is downloading, or until the user hits the play button.'],
  preload: ['string', 'method', 'the preferred method for loading the video.'],
  src: ['string', 'url', 'the URL of the video file.'],
  width: ['number', 'pixels', 'the width of the video in pixels.']
};

let markup = '';

Object.keys(properties).forEach((property) => {
  markup += ' '.repeat(2) + `/**\n`;
  markup += ' '.repeat(2) + ` * @signature ${property}()\n`;
  markup += ' '.repeat(2) + ` * @added v0.1.0\n`;
  markup += ' '.repeat(2) + ` * @updated v0.2.0\n`;
  markup += ' '.repeat(2) + ` * @returns ${properties[property][0]}\n`;
  markup += ' '.repeat(2) + ` * @description Gets ${properties[property][2]}\n`;
  markup += ' '.repeat(2) + ` *\n`;
  markup += ' '.repeat(2) + ` * @signature ${property}(${properties[property][1]})\n`;
  markup += ' '.repeat(2) + ` * @added v0.1.0\n`;
  markup += ' '.repeat(2) + ` * @updated v0.2.0\n`;
  markup += ' '.repeat(2) + ` * @param ${properties[property][1]} ${properties[property][0]}\n`;
  markup += ' '.repeat(2) + ` * @returns this\n`;
  markup += ' '.repeat(2) + ` * @throws TypeError if \`${properties[property][1]}\` is not a valid [${properties[property][0]}]\n`;
  markup += ' '.repeat(2) + ` * @description Sets ${properties[property][2]}\n`;
  markup += ' '.repeat(2) + ` */\n`;
  markup += ' '.repeat(2) + `${property}(arg1) {\n`;
  markup += ' '.repeat(2) + `  /** Getter */\n`;
  markup += ' '.repeat(2) + `  if ( arg1 === undefined )\n`;
  markup += ' '.repeat(2) + `    return this._${property};\n\n`;

  markup += ' '.repeat(2) + `  /** Setter */\n`;

  if ( properties[property][0] == 'string' || properties[property][0] == 'number' || properties[property][0] == 'boolean' )
    markup += ' '.repeat(2) + `  else if ( typeof arg1 == '${properties[property][0]}' )\n`;
  else if ( properties[property][0] == 'Array' )
    markup += ' '.repeat(2) + `  else if ( typeof arg1 == 'object' && arg1.constructor.name == '${properties[property][0]}' )\n`;
  else
    markup += ' '.repeat(2) + `  else if ( arg1 === null || ( typeof arg1 == 'object' && arg1.constructor.name == '${properties[property][0]}' ) )\n`;
  
  markup += ' '.repeat(2) + `    this._${property} = arg1;\n\n`;

  markup += ' '.repeat(2) + `  /** Handle errors */\n`;
  
  if ( properties[property][0] == 'string' || properties[property][0] == 'number' || properties[property][0] == 'boolean' || properties[property][0] == 'Array' ) {
    markup += ' '.repeat(2) + `  else if ( arg1 === null )\n`;
    markup += ' '.repeat(2) + `    throw new TypeError(\`\${this.constructor.name}.${property}(null): Invalid signature .\`);\n`;
  }
  
  markup += ' '.repeat(2) + `  else\n`;
  markup += ' '.repeat(2) + `    throw new TypeError(\`\${this.constructor.name}.${property}(\${arg1.constructor.name}): Invalid signature .\`);\n\n`;

  markup += ' '.repeat(2) + `  /** Allow for call chaining */\n`;
  markup += ' '.repeat(2) + `  return this;\n`;
  markup += ' '.repeat(2) + `}\n\n`;
});

fs.writeFileSync('helper-out.js', markup);