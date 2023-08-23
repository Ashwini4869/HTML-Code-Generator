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

// preview frame
const previewFrame = document.getElementById("preview-frame");

// buttons
const copyButton = document.getElementById("copy-button");
const generateButton = document.getElementById("generate-button");

// result area
const resultArea = document.getElementById("result");

// Adding event listeners to buttons
generateButton.addEventListener("click", generateHTML);
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

  const htmlCode = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
	<meta name="description" content="${content}">
    <title>${pageTitle}</title>
	<style>
	${headingSize}{background-color:${headingBg};color:${headingColor};text-align:${headingAlign}}
	</style>
  </head>
  <body>
   <${headingSize}>${heading}</${headingSize}>
  </body>
</html>`;
  resultArea.value = htmlCode;

  // update Preview
  displayPreview();
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
