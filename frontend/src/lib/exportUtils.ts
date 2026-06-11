import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

/**
 * Plantilla de Exportación a PDF
 */
export function exportToPDF(
  columns: string[],
  data: any[][],
  title: string,
  filename: string
) {
  const doc = new jsPDF("p", "pt", "a4");

  // Configuración de logo / estilo del título
  doc.setFontSize(20);
  doc.setTextColor(30, 41, 59); // slate-800
  doc.text(title, 40, 40);

  // Subtítulo con la fecha
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text(
    `Fecha de generación: ${new Date().toLocaleDateString("es-PE")}`,
    40,
    55
  );

  autoTable(doc, {
    startY: 70,
    head: [columns],
    body: data,
    styles: {
      font: "helvetica",
      fontSize: 10,
      cellPadding: 6,
    },
    headStyles: {
      fillColor: [30, 41, 59], // bg-slate-800
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252], // bg-slate-50
    },
    margin: { top: 70 },
  });

  doc.save(filename);
}

/**
 * Plantilla de Exportación a Excel
 */
export function exportToExcel(
  dataObjects: Record<string, any>[],
  filename: string
) {
  const worksheet = XLSX.utils.json_to_sheet(dataObjects);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte");

  // Descarga el archivo
  XLSX.writeFile(workbook, filename);
}

/**
 * Plantilla de Impresión Unificada
 */
export function printTable(
  tableHtml: string,
  title: string
) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Por favor, permita las ventanas emergentes para imprimir.");
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            padding: 20px; 
            color: #1e293b;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #cbd5e1;
            padding-bottom: 10px;
          }
          h1 { 
            margin: 0;
            color: #0f172a; 
            font-size: 24px;
          }
          .date {
            color: #64748b;
            font-size: 14px;
            margin-top: 5px;
          }
          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-top: 20px; 
            font-size: 14px;
          }
          th, td { 
            border: 1px solid #e2e8f0; 
            padding: 12px; 
            text-align: left; 
          }
          th { 
            background-color: #f8fafc; 
            font-weight: 600; 
            color: #475569; 
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 0.05em;
          }
          tr:nth-child(even) { 
            background-color: #f8fafc; 
          }
          .footer { 
            margin-top: 40px; 
            text-align: center; 
            font-size: 12px; 
            color: #94a3b8; 
          }
          /* Ocultar elementos no deseados en impresión como botones si es que hay en el HTML clonado */
          .no-print, button, a {
            display: none !important;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${title}</h1>
          <div class="date">Generado el ${new Date().toLocaleDateString("es-PE", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
        </div>
        ${tableHtml}
        <div class="footer">
          <p>Sistema Administrativo Cerámica - Documento autogenerado</p>
        </div>
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();

  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
}
