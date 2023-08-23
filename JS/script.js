// reference to DOM elements
// title and meta
const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");

//heading values
const headingInput = document.getElementById("heading");
const headingSizeSelect = document.getElementById("heading-size");
const headingBgSelect = document.getElementById("heading-bg");
const headingColorSelect = document.getElementById("heading-color");
const headingAlignSelect = document.getElementById("heading-align");

// paragraph values
const paraTextInput = document.getElementById("paragraph-text");
const paraFontSize = document.getElementById("para-font-size");
const paraTextColor = document.getElementById("para-text-color");
const paraBgColor = document.getElementById("para-bg-color");
const paraTextAlign = document.getElementById("para-text-align");

// preview frame
const previewFrame = document.getElementById("preview-frame");

// buttons
const copyButton = document.getElementById("copy-button");
// result area
const resultArea = document.getElementById("result");

// Adding event listeners to buttons
copyButton.addEventListener("click", copyToClipboard);

// adding event listeners for all inputs
document.querySelectorAll(".updateHTML").forEach((item) => {
  item.addEventListener("change", generateHTML);
});

function generateHTML() {
  // reading values
  // title and meta
  const pageTitle = titleInput.value;
  const content = descInput.value;
  // heading section
  const heading = headingInput.value;
  const headingSize = headingSizeSelect.value;
  const headingBg = headingBgSelect.value;
  const headingColor = headingColorSelect.value;
  const headingAlign = headingAlignSelect.value;

  // paragraph section
  const paraTextInputValue = paraTextInput.value;
  const paraFontSizeValue = paraFontSize.value;
  const paraTextColorValue = paraTextColor.value;
  const paraBgColorValue = paraBgColor.value;
  const paraTextAlignValue = paraTextAlign.value;

  // checking to show a specific element or not
  let showHeading = true,
    showParagraph = true;
  showHeadSection = true;
  showBodySection = false;
  showStyleSection = true;

  // to show Head or not
  if (pageTitle.length === 0 && content.length === 0) {
    showHeadSection = false;
  }
  if (heading.length === 0) {
    showHeading = false;
  }
  if (paraTextInputValue.length === 0) {
    showParagraph = false;
  }

  if (showHeading || showParagraph) {
    showBodySection = true;
  }

  // adding styling to generated code
  var headingStyle, paragraphStyle;
  if (showHeading) {
    headingStyle = `${headingSize}{background-color:${headingBg};color:${headingColor};text-align:${headingAlign}}`;
  } else {
    headingStyle = "";
  }

  if (showParagraph) {
    paragraphStyle = `p{font-size:${paraFontSizeValue}px; color:${paraTextColorValue};background-color:${paraBgColorValue};text-align:${paraTextAlignValue}}`;
  } else {
    paragraphStyle = "";
  }
  if (headingStyle.length === 0 && paragraphStyle.length === 0) {
    showStyleSection = false;
  }
  var styleSection;
  if (showStyleSection) {
    styleSection = `<style>
  ${headingStyle}
  ${paragraphStyle}
  </style>`;
  } else {
    styleSection = "";
  }

  // adding components to generated code
  var headingBody, paragraphBody;
  if (showHeading) {
    headingBody = `<${headingSize}>${heading}</${headingSize}>`;
  } else {
    headingBody = "";
  }

  if (showParagraph) {
    paragraphBody = `<p>${paraTextInputValue}</p>`;
  } else {
    paragraphBody = "";
  }
  var bodySection;
  if (showBodySection) {
    bodySection = `<body>
  ${headingBody}
  ${paragraphBody}
  </body>`;
  } else {
    bodySection = "";
  }
  var htmlCode = "";
  if (showHeadSection) {
    htmlCode = `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="description" content="${content}">
  <title>${pageTitle}</title>
  ${styleSection}
  </head>
  ${bodySection}
  </html>`;
  } else {
    htmlCode = `${styleSection}
    ${bodySection}`;
  }

  console.log(htmlCode);
  resultArea.value = htmlCode;

  displayPreview(); //update Preview on HTML Change
}

function copyToClipboard() {
  const resultTextArea = document.getElementById("result");
  const textToCopy = resultTextArea.value;

  navigator.clipboard.writeText(textToCopy).then(() => {
    console.log("text copied to clipboard");
  });
  alert("Code copied to clipboard");
}

function displayPreview() {
  const htmlCode = document.getElementById("result");
  previewFrame.srcdoc = htmlCode.value;
}
