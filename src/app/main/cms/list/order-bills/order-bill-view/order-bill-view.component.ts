import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-order-bill-view',
  standalone: true,
  imports: [],
  templateUrl: './order-bill-view.component.html',
  styleUrl: './order-bill-view.component.scss'
})
export class OrderBillViewComponent {


  public downloadPDF() {
    const content = document.getElementById('base-table');
    if (content) {
      html2canvas(content).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF();
        const imgProps = doc.getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        doc.save('content.pdf');
      });
    }
  }
}
