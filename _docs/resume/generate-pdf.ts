import { mdToPdf } from "md-to-pdf";
import path from "path";

async function generatePdf() {
  const cwd = process.cwd();
  const style = path.join(cwd, "_docs/resume/pdf.css");
  const sourcePath = path.join(cwd, "_docs/resume/", "en-US", "index.md");
  const dest = path.join(cwd, "public", `Kimizu_Yamasaki_Resume.pdf`);

  await mdToPdf(
    { path: sourcePath },
    {
      dest,
      stylesheet: [style],
      pdf_options: {
        format: "a4",
        margin: {
          top: "15mm",
          right: "20mm",
          bottom: "15mm",
          left: "20mm",
        },
      },
      launch_options: { args: ["--no-sandbox"] },
    },
  ).catch(console.error);
}

void generatePdf();
