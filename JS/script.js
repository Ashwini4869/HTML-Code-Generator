// reference to DOM elements
const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const copyButton = document.getElementById("copy-button");
const generateButton = document.getElementById("generate-button");

const resultArea = document.getElementById("result");

generateButton.addEventListener("click", generateHTML);
copyButton.addEventListener("click", copyToClipboard);

function generateHTML() {
  const pageTitle = titleInput.value;
  const content = descInput.value;

  const htmlCode = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
	<meta name="description" content="${content}">
    <title>${pageTitle}</title>
  </head>
  <body>
  </body>
</html>`;
  resultArea.value = htmlCode;
}

function copyToClipboard() {
  const resultTextArea = document.getElementById("result");
  const textToCopy = resultTextArea.value;

  navigator.clipboard.writeText(textToCopy).then(() => {
    console.log("text copied to clipboard");
  });
}
