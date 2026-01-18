import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlosService } from '../../services/plos';
import { Article } from '../../models/article';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-article-table',
  imports: [CommonModule, FormsModule],
  templateUrl: './article-table.html',
  styleUrl: './article-table.css',
})
export class ArticleTable implements OnInit {
  articles: Article[] = [];
  loading: boolean = true;
  searchTerm: string = '';

  constructor(
    private plosService: PlosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    this.loading = true;
    const term = this.searchTerm || 'university';
    this.plosService.getArticles(term, 'title').subscribe({
      next: (data) => {
        this.articles = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading articles:', err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  clear(): void {
    this.searchTerm = '';
    this.search();
  }

  downloadPDF(): void {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Scientific Articles - PLOS', 14, 22);
    
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 30);

    const tableData = this.articles.map(article => [
      article.title_display || 'N/A',
      article.journal || 'N/A',
      article.publication_date ? new Date(article.publication_date).toLocaleDateString() : 'N/A',
      article.id || 'N/A'
    ]);

    autoTable(doc, {
      head: [['Title', 'Journal', 'Publication Date', 'DOI']],
      body: tableData,
      startY: 35,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [15, 118, 110] },
      columnStyles: {
        0: { cellWidth: 70 },
        1: { cellWidth: 35 },
        2: { cellWidth: 30 },
        3: { cellWidth: 45 }
      }
    });

    doc.save('plos-articles.pdf');
  }
}