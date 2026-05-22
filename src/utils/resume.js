/**
 * Opens the real PDF resume for download.
 * The PDF lives at /public/Hanumanth_Reddy_Resume-AEM-2026.pdf
 */
export function openResume() {
  const link = document.createElement("a");
  link.href = "/Hanumanth_Reddy_Resume-AEM-2026.pdf";
  link.download = "Hanu_Reddy_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
