import fs from "fs";
import { mdToPdf } from "md-to-pdf";
import path from "path";

async function generatePdf() {
  const cwd = process.cwd();
  const style = path.join(cwd, "_docs/resume/pdf.css");
  const sourcePath = path.join(cwd, "_docs/resume/", "en-US", "index.md");
  const pdf = await mdToPdf(
    { path: sourcePath },
    { stylesheet: [style] },
  ).catch(console.error);

  if (!pdf) return;
  const dest = path.join(cwd, "public", `Kimizu_Yamasaki_Resume.pdf`);
  fs.writeFileSync(dest, pdf.content);
}

void generatePdf();
