import fs from "fs";
import { mdToPdf } from "md-to-pdf";
import path from "path";
import { i18nConfig } from "@/utils/i18n-config";

async function generatePdf() {
  const cwd = process.cwd();
  const style = path.join(cwd, "_docs/resume/pdf.css");

  await Promise.all(
    i18nConfig.locales.map(async (locale) => {
      const sourcePath = path.join(cwd, "_docs/resume/", locale, "index.md");
      const pdf = await mdToPdf(
        { path: sourcePath },
        { stylesheet: [style] },
      ).catch(console.error);

      if (!pdf) return;
      const dest = path.join(
        cwd,
        "public",
        `Kimizu_Yamasaki_Resume_${locale}.pdf`,
      );
      fs.writeFileSync(dest, pdf.content);
    }),
  );
}

void generatePdf();
