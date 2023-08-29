// reference to DOM elements
// title and meta elements
const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");

//heading elements
const headingInput = document.getElementById("heading");
const headingSizeSelect = document.getElementById("heading-size");
const headingBgSelect = document.getElementById("heading-bg");
const headingColorSelect = document.getElementById("heading-color");
const headingAlignSelect = document.getElementById("heading-align");

// paragraph elements
const paraTextInput = document.getElementById("paragraph-text");
const paraFontSize = document.getElementById("para-font-size");
const paraTextColor = document.getElementById("para-text-color");
const paraBgColor = document.getElementById("para-bg-color");
const paraTextAlign = document.getElementById("para-text-align");

// button elements
const btnTextInput = document.getElementById("btn-text");
const btnPaddingXInput = document.getElementById("btn-padding-x");
const btnPaddingYInput = document.getElementById("btn-padding-y");
const btnBorderInput = document.getElementById("btn-border");
const btnBorderRadiusInput = document.getElementById("btn-border-radius");
const btnBgColorInput = document.getElementById("btn-bg-color");
const btnTextColorInput = document.getElementById("btn-text-color");

// preview frame
// const previewFrame = document.getElementById("preview-frame");
const previewWindow = document.getElementById("preview-window");

// buttons
const copyButton = document.getElementById("copy-button");
// result area
const resultArea = document.getElementById("result");

// Adding event listeners to button
copyButton.addEventListener("click", copyToClipboard);

// adding event listeners for all inputs
document.querySelectorAll(".updateHTML").forEach((item) => {
  item.addEventListener("change", generateHTML);
});

previewWindow.addEventListener("DOMCharacterDataModified", function () {
  const newContent = previewWindow.innerHTML;
  updateHTML(newContent);
});

function removeNBSP(htmlString) {
  const modHtmlString = htmlString.replaceAll(/&nbsp;/g, " ");
  return modHtmlString;
}

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

  // button section
  const btnTextValue = btnTextInput.value;
  const btnPaddingXValue = btnPaddingXInput.value;
  const btnPaddingYValue = btnPaddingYInput.value;
  var btnBorderValue;
  if (!btnBorderInput.checked) {
    btnBorderValue = "border:none;";
  } else {
    btnBorderValue = "";
  }
  const btnBorderRadiusValue = btnBorderRadiusInput.value;
  const btnBgColorValue = btnBgColorInput.value;
  const btnTextColorValue = btnTextColorInput.value;

  // checking to show a specific element or not
  let showHeading = true,
    showParagraph = true;
  showButton = true;
  showHeadSection = true;
  showBodySection = false;
  showStyleSection = true;

  // to show Head or not
  if (pageTitle.length === 0 && content.length === 0) {
    showHeadSection = false;
  }
  // to show heading or not
  if (heading.length === 0) {
    showHeading = false;
  }
  // to show paragraph or not
  if (paraTextInputValue.length === 0) {
    showParagraph = false;
  }
  // to show button or not
  if (btnTextValue.length === 0) {
    showButton = false;
  }
  // to show body section or not
  if (showHeading || showParagraph || showButton) {
    showBodySection = true;
  }
  // adding styling to generated code for components
  var headingStyle, paragraphStyle, buttonStyle;
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

  if (showButton) {
    buttonStyle = `button{padding:${btnPaddingYValue}px ${btnPaddingXValue}px;${btnBorderValue}border-radius:${btnBorderRadiusValue}px;background-color:${btnBgColorValue};color:${btnTextColorValue}}`;
  } else {
    buttonStyle = "";
  }

  if (
    headingStyle.length === 0 &&
    paragraphStyle.length === 0 &&
    buttonStyle.length === 0
  ) {
    showStyleSection = false;
  }
  var styleSection;
  if (showStyleSection) {
    styleSection = `<style> 
     ${headingStyle}
     ${paragraphStyle}
     ${buttonStyle}
  </style>`;
  } else {
    styleSection = "";
  }

  // adding components to generated code
  var headingBody, paragraphBody, buttonBody;
  if (showHeading) {
    headingBody = `<${headingSize} contenteditable>${heading}</${headingSize}>`;
  } else {
    headingBody = "";
  }

  if (showParagraph) {
    paragraphBody = `<p contenteditable>${paraTextInputValue}</p>`;
  } else {
    paragraphBody = "";
  }
  if (showButton) {
    buttonBody = `<button contenteditable>${btnTextValue}</button>`;
  } else {
    buttonBody = "";
  }
  var bodySection;
  if (showBodySection) {
    bodySection = `<body>
  ${headingBody}
  ${paragraphBody}
  ${buttonBody}
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
  // to remove contenteditable from preview
  let previewhtmlCode = htmlCode.replaceAll(" contenteditable", "");
  resultArea.value = removeNBSP(previewhtmlCode);

  displayPreview(htmlCode); //update Preview on HTML Change
}

function copyToClipboard() {
  const resultTextArea = document.getElementById("result");
  const textToCopy = resultTextArea.value;

  navigator.clipboard.writeText(textToCopy).then(() => {
    console.log("text copied to clipboard");
  });
  alert("Code copied to clipboard");
}

function displayPreview(htmlCode) {
  previewWindow.innerHTML = htmlCode;
}

function updateHTML(newContent) {
  const resultArea = document.getElementById("result");
  // without contenteditable=""
  let previewString = removeNBSP(
    newContent.replaceAll(' contenteditable=""', "")
  );
  resultArea.value = previewString;
  updateInputs(previewString);
}

function updateInputs(htmlString) {
  console.log(htmlString);
  var hPattern = /<h[1-6][^>]*>([^<]*)<\/h[1-6]>/;
  var headingMatch = htmlString.match(hPattern);

  if (headingMatch) {
    var hValue = headingMatch[1].trim();
    console.log(hValue);
  } else {
    var hValue = "";
    console.log("hvalue not found");
  }

  headingInput.value = removeNBSP(hValue);
  var pPattern = /<p[^>]*>([^<]*)<\/p>/;
  var paragraphMatch = htmlString.match(pPattern);

  if (paragraphMatch) {
    var pValue = paragraphMatch[1].trim();
    console.log(pValue);
  } else {
    var pValue = "";
    console.log("pvalue not found");
  }

  paraTextInput.value = removeNBSP(pValue);

  var buttonPattern = /<button[^>]*>([^<]*)<\/button>/;
  var buttonMatch = htmlString.match(buttonPattern);

  if (buttonMatch) {
    var buttonValue = buttonMatch[1].trim();
    console.log(buttonValue);
  } else {
    var buttonValue = "";
    console.log("button value not found");
  }

  btnTextInput.value = removeNBSP(buttonValue);
}
