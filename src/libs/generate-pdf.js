const mdpdf = require("mdpdf");
const path = require("path");
const cwd = process.cwd();

const options = {
  source: path.join(cwd, "_docs/resume/index.md"),
  destination: path.join(cwd, "public/Kimizu Yamasaki - Resume.pdf"),
  styles: path.join(cwd, "_docs/resume/index.css"),
  pdf: {
    format: "A4",
    orientation: "portrait",
    border: { top: "15mm", right: "15mm", bottom: "15mm", left: "15mm" },
  },
};

mdpdf
  .convert(options)
  .then((pdfPath) => {
    console.log("PDF generated at: " + pdfPath);
  })
  .catch((err) => {
    console.error(err);
  });
