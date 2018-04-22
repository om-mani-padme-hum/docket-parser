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


/*
const properties = {
  id: ['string', 'elementId', 'the id attribute of the element.'],
  style: ['string', 'styleList', 'the list of styles in the style attribute of the element.'],
  tag: ['string', 'tag', 'the tag attribute of the element.'],
  title: ['string', 'text', 'the title attribute of the element.']
};
*/

/*
const properties = {
  default: ['boolean', 'flag', `a boolean indicating whether the track is to be enabled if the user's preferences do not indicate that another track would be more appropriate.`],
  kind: ['string', 'kind', 'the kind of text track, can be `captions`, `chapters`, `descriptions`, `metadata`, or `subtitles`.'],
  label: ['string', 'text', 'the title of the text track.'],
  src: ['string', 'url', 'the URL of the track file, this attribute is required.'],
  srclang: ['string', 'lang', 'the language of the track text data.']
};
*/
/*
const properties = {
  autofocus: ['boolean', 'flag', 'a boolean indicating whether the text area should automatically get focus when the page loads.'],
  cols: ['number', 'columns', 'the number of characters per row in the text area.'],
  dirname: ['string', 'dir', 'the direction of the text that will be submitted.'],
  disabled: ['boolean', 'flag', 'a boolean indicating whether the text area should be disabled.'],
  form: ['string', 'formId', 'the id of the form that the text area belongs to.'],
  maxlength: ['string', 'value', 'the maximum length of characters allowed for ths input.'],
  name: ['string', 'name', 'the name of the text area.'],
  placeholder: ['string', 'value', 'the placeholder value for ths text area.'],
  readonly: ['boolean', 'flag', 'a boolean indicating whether this text area is read only.'],
  required: ['boolean', 'flag', 'a boolean indicating whether this text area is required.'],
  rows: ['number', 'value', 'the number of rows that should be visible in this text area at any given time.'],
  wrap: ['string', 'type', 'the type of text wrapping to be used in the text area, can be `hard` or `soft`.']
};
*/
/*
const properties = {
  abbr: ['string', 'elementId', 'an abbreviation for the header.'],
  colspan: ['number', 'span', 'the number of columns the header cell should span.'],
  headers: ['string', 'headers', `a list of ids of one or more other header cells this header cell is related to.`],
  rowspan: ['number', 'span', 'the number of rows the header cell should span.'],
  scope: ['string', 'type', 'the type of element this header is being used to represent, can be `col`, `colgroup`, `row`, or `rowgroup`.'],
  sorted: ['string', 'elementId', 'the sort direction of the column, can be `reversed`, `number`, `reversed number`, or `number reversed`.']
};
*/
/*
const properties = {
  media: ['string', 'query', 'a valid media query that would normally be defined in a CSS.'],
  sizes: ['string', 'sizes', 'the image sizes for different page layouts.'],
  src: ['string', 'url', 'the URL of the media file, required when used in an [Audio] or [Source] element.'],
  srcset: ['string', 'urls', 'the URLs of the image to use in different situations.'],
  type: ['string', 'type', 'the MIME-type of the resource.']
};
*/
/*
const properties = {
  autofocus: ['boolean', 'flag', 'a boolean indicating whether the select box should automatically get focus when the page loads.'],
  disabled: ['boolean', 'flag', 'a boolean indicating whether the select box should be disabled.'],
  form: ['string', 'formId', 'the id of the form that this select box belongs to.'],
  multiple: ['boolean', 'flag', 'a boolean indicating whether this is a multiple-select box.'],
  name: ['string', 'name', 'the name of the select box.'],
  required: ['boolean', 'flag', 'a boolean indicating whether this select box input is required.'],
  size: ['number', 'size', 'the size of the select box, for multiple-select boxes only.']
};
*/

/*
const properties = {
  asyncScript: ['boolean', 'flag', 'a boolean indicating whether the script should be executed asynchronously (only for external scripts).'],
  charset: ['string', 'encoding', 'the character encoding used by the script.'],
  defer: ['boolean', 'flag', 'a boolean indicating whether the script should be executed when the page has finished parsing (only for external scripts).'],
  src: ['string', 'url', 'the URL of the external script file.'],
  type: ['string', 'type', 'the media type of the script.']
};
*/
/*
const properties = {
  data: ['string', 'url', 'the URL of the resource to be used by the object.'],
  form: ['string', 'formId', 'the id of the form that this object belongs to.'],
  height: ['number', 'pixels', 'the height of the object in pixels.'],
  name: ['string', 'name', 'the name of the object.'],
  type: ['string', 'type', 'the media type of data specified in the data attribute.'],
  usemap: ['string', 'map', 'the ID of a [Map] element that should be used as a client-side iamge map.'],
  width: ['number', 'pixels', 'the width of the object in pixels.']
};
*/

/*
const properties = {
  form: ['string', 'formId', 'the id of the form that this meter belongs to.'],
  high: ['number', 'value', 'the range that is considered to be a high value.'],
  low: ['number', 'value', 'the range that is considered to be a low value.'],
  max: ['number', 'value', 'the maximum value of the range.'],
  min: ['number', 'value', 'the minimum value of the range.'],
  optimum: ['number', 'value', 'the optimal value for the gauge.'],
  value: ['number', 'value', 'the current value of the gauge.']
};
*/

/*
const properties = {
  label: ['string', 'text', 'the name of the menu item, as shown to the user.'],
  type: ['string', 'type', 'the type of menu item, default is `command`, can be `checkbox`, `command`, `radio`.'],
  command: ['string', 'role', 'the abstract command role that this menu item plays.'],
  icon: ['string', 'url', 'the URL to be used for the menu item icon.'],
  radiogroup: ['string', 'group', 'the name of the group of commands that will be toggled when the menu item itself is toggled, only for type `radio`.'],
  disabled: ['boolean', 'flag', 'a boolean indicating whether this menu item is disabled.'],
  checked: ['boolean', 'flag', 'a boolean indicating whether this menu item is active.'],
  default: ['boolean', 'flag', 'a boolean indicating whether this is the default menu item.']
};
*/
/*
const properties = {
  crossorigin: ['string', 'type', 'whether to allow links from third-party sites that allow cross-origin access, can be `anonymous` or `use-credentials`.'],
  href: ['string', 'url', 'the URL of the linked document.'],
  hreflang: ['string', 'lang', 'the language of the linked document.'],
  media: ['string', 'device', 'the media device that the linked document is optimized for.'],
  rel: ['string', 'relationship', 'the relationship between the current document and the linked document.  This value is equired.'],
  sizes: ['string', 'size', 'the size of the icon, only for rel `icon`.'],
  type: ['string', 'media', 'the media type of the linked document.']
};
*/

/*
const properties = {
  accept: ['string', '', 'the types of files that the server accepts (only for input type `file`.'],
  alt: ['string', 'text', 'the alternate text for the input.'],
  autocomplete: ['string', 'flag', 'a flag inicating whether the browser should enable autocomplete for this input, can be `on` or `off`.'],
  autofocus: ['boolean', 'flag', 'a boolean indicating whether the button should automatically get focus when the page loads.'],
  checked: ['boolean', 'flag', 'a boolean indicating whether this input should be checked on page load, only for input types `checkbox` or `radio`.'],
  dirname: ['string', 'dir', 'the direction of the text that will be submitted.'],
  disabled: ['boolean', 'flag', 'a boolean indicating whether the button should be disabled.'],
  form: ['string', 'formId', 'the id of the form that the button belongs to.'],
  formaction: ['string', 'action', 'where to send the form-data when a form is submitted, only for type="submit".'],
  formenctype: ['string', 'enctype', 'how the form-data should be encoded before sending it to a server, only for type="submit".'],
  formmethod: ['string', 'method', 'the HTTP method used to send the data, only for type="submit".'],
  formnovalidate: ['boolean', 'flag', 'a boolean indicating whether the form-data should not be validated on submission, only for type="submit".'],
  formtarget: ['string', 'target', 'where to display the response after submitting the form, only for type="submit".'],
  height: ['number', 'pixels', 'the height of the input in pixels, only if input is of type `image`.'],
  list: ['string', 'list', 'the id of a [DataList] element that contains pre-defined options for this input.'],
  max: ['string', 'value', 'the maximum value for ths input.'],
  maxlength: ['string', 'value', 'the maximum length of characters allowed for ths input.'],
  min: ['string', 'value', 'the minimum value for ths input.'],
  multiple: ['boolean', 'flag', 'a boolean indicating whether multiple values can be entered in this input.'],
  name: ['string', 'name', 'the name of the input.'],
  pattern: ['string', 'regex', `a regular expression that this input's value is validated against.`],
  placeholder: ['string', 'value', 'the placeholder value for ths input.'],
  readonly: ['boolean', 'flag', 'a boolean indicating whether this input is read only.'],
  required: ['boolean', 'flag', 'a boolean indicating whether this input is requiredy.'],
  size: ['number', 'size', 'the size of this input in characters.'],
  src: ['string', 'url', 'the URL of the image to use as a submit button (only for input type `image`).'],
  step: ['number', 'value', 'the step value for ths input.'],
  type: ['string', 'flag', 'the input type.'],
  value: ['string', 'value', 'the initial value for ths input.'],
  width: ['number', 'pixels', 'the width of the input in pixels, only if input is of type `image`.']
};
*/

/*
const properties = {
  alt: ['string', 'text', 'the alternate text for the image.'],
  crossorigin: ['string', 'type', 'whether to allow images from third-party sites that allow cross-origin access to be used with canvas, can be `anonymous` or `use-credentials`.'],
  height: ['number', 'pixels', 'the height of the image in pixels.'],
  ismap: ['boolean', 'flag', 'a boolean indicating whether this is a server-side image map.'],
  longdesc: ['string', 'url', 'a URL to a document with a long description of the image.'],
  sizes: ['string', 'device', 'any specific image sizes for different page layouts.'],
  src: ['string', 'url', 'the URL of the image.'],
  srcset: ['string', 'urls', 'the URLs of the image to use in different situations.'],
  usemap: ['string', 'method', 'the ID of a [Map] element that should be used as a client-side iamge map.'],
  width: ['number', 'pixels', 'the width of the image in pixels.']
};
*/

/*
const properties = {
  acceptCharset: ['string', 'charset', 'the character encodings that are to be used for the form submission.'],
  action: ['string', 'url', 'the URL of the document that this form submit its data to.'],
  autocomplete: ['string', 'flag', 'a flag inicating whether the browser should enable autocomplete for this form, can be `on` or `off`.'],
  enctype: ['string', 'enctype', 'the encoding used to send the form data to the server, can be `application/x-www-form-urlencoded`, `multipart/form-data`, or `text/plain`.'],
  method: ['string', 'method', 'the HTTP method used to send the data.'],
  name: ['string', 'name', 'the name of the form.'],
  novalidate: ['boolean', 'flag', 'a boolean indicating whether the form-data should not be validated on submission.'],
  target: ['string', 'target', 'where to display the response after submitting the form, can be `_blank`, `_self`, `_parent`, or `_top`.'],
};
*/

/*
const properties = {
  autofocus: ['boolean', 'flag', 'a boolean indicating whether the button should automatically get focus when the page loads.'],
  disabled: ['boolean', 'flag', 'a boolean indicating whether the button should be disabled.'],
  form: ['string', 'formId', 'the ID of the form that the button belongs to.'],
  formaction: ['string', 'action', 'where to send the form-data when a form is submitted, only for type="submit".'],
  formenctype: ['string', 'enctype', 'how the form-data should be encoded before sending it to a server, only for type="submit".'],
  formmethod: ['string', 'method', 'the HTTP method used to send the data, only for type="submit".'],
  formnovalidate: ['boolean', 'flag', 'a boolean indicating whether the form-data should not be validated on submission, only for type="submit".'],
  formtarget: ['string', 'target', 'where to display the response after submitting the form, only for type="submit".'],
  name: ['string', 'name', 'the name of the button.'],
  type: ['string', 'flag', 'the button type'],
  value: ['string', 'flag', 'the initial button value.']
};
*/

/*
const properties = {
  autoplay: ['boolean', 'flag', 'a boolean indicating whether the audio should start playing as soon as it is ready.'],
  controls: ['boolean', 'flag', 'a boolean indicating whether the audio controls should be displayed.'],
  loop: ['boolean', 'flag', 'a boolean indicating whether the audio should start over again, every time it is finished.'],
  muted: ['boolean', 'flag', 'a boolean indicating whether the audio output should be muted.'],
  preload: ['string', 'method', 'the preferred method for loading the audio.'],
  src: ['string', 'url', 'the URL of the audio file.']
};
*/
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
  markup += ' '.repeat(2) + `    throw new TypeError(\`\${this.constructor.name}.${property}(\${arg1.constructor.name}): Invalid signature .\`);\n\n`;

  markup += ' '.repeat(2) + `  /** Allow for call chaining */\n`;
  markup += ' '.repeat(2) + `  return this;\n`;
  markup += ' '.repeat(2) + `}\n\n`;
});

fs.writeFileSync('helper-out.js', markup);