const fs = require('fs');

const properties = {
  autoplay: ['boolean', 'flag', 'a boolean indicating whether the audio should start playing as soon as it is ready.'],
  controls: ['boolean', 'flag', 'a boolean indicating whether the audio controls should be displayed.'],
  loop: ['boolean', 'flag', 'a boolean indicating whether the audio should start over again, every time it is finished.'],
  muted: ['boolean', 'flag', 'a boolean indicating whether the audio output should be muted.'],
  preload: ['string', 'method', 'the preferred method for loading the audio.'],
  src: ['string', 'url', 'the URL of the audio file.']
};

/*
const properties = {
  alt: ['string', 'text', 'the alternate text for the area.  Required if the href attribute is present.'],
  coords: ['string', 'coordinates', 'the coordinates of the area.'],
  download: ['string', 'filename', 'the filename of the file that should be downloaded upon clicking this area link.'],
  href: ['string', 'url', 'the url the area link goes to.'],
  hreflang: ['string', 'lang', 'the language of the linked document.'],
  media: ['string', 'device', 'the media device that the linked document is optimized for.'],
  rel: ['string', 'relationship', 'the relationship between the current document and the linked document.'],
  shape: ['string', 'shape', 'the shape of the area (default, rect, circle, poly).'],
  target: ['string', 'method', 'the method used to open the linked document.'],
  type: ['string', 'media', 'the media type of the linked document.']
};
*/

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
  markup += ' '.repeat(2) + `    throw new TypeError(\`\${this.constructor.name}.${property}(\${typeof arg1}): Invalid signature .\`);\n\n`;

  markup += ' '.repeat(2) + `  /** Allow for call chaining */\n`;
  markup += ' '.repeat(2) + `  return this;\n`;
  markup += ' '.repeat(2) + `}\n\n`;
});

fs.writeFileSync('helper-out.js', markup);