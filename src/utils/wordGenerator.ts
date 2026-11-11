export interface ProjectFile {
  id: string;
  language: 'kk' | 'ru' | 'en';
  langName: string;
  fileName: string;
  title: string;
  description: string;
  badge: string;
  theme: string;
  size: string;
  content: string;
}

export function convertTextToWordHtml(title: string, rawText: string, langName: string): string {
  const lines = rawText.split('\n');
  let htmlBody = '';
  
  let inTitleBlock = false;
  let titleText = '';
  
  let currentSectionTitle = '';
  let currentSectionLines: string[] = [];
  
  const sections: { title: string; paragraphs: string[] }[] = [];
  
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    
    // Check for title block
    if (line.startsWith('=====')) {
      if (!inTitleBlock && titleText === '') {
        inTitleBlock = true;
        i++;
        continue;
      } else if (inTitleBlock) {
        inTitleBlock = false;
        i++;
        continue;
      }
    }
    
    if (inTitleBlock) {
      if (line) titleText += (titleText ? ' ' : '') + line;
      i++;
      continue;
    }
    
    // Check for sections
    if (i < lines.length - 1 && lines[i+1].trim().startsWith('-----')) {
      // If we had a previous section, push it
      if (currentSectionTitle || currentSectionLines.length > 0) {
        sections.push({
          title: currentSectionTitle || 'ЖОБА МӘЛІМЕТІ / ИНФОРМАЦИЯ',
          paragraphs: [...currentSectionLines]
        });
        currentSectionLines = [];
      }
      currentSectionTitle = line.replace(':', '');
      i += 2; // skip section title and the line of dashes
      continue;
    }
    
    if (line) {
      currentSectionLines.push(line);
    } else {
      if (currentSectionLines.length > 0 && currentSectionLines[currentSectionLines.length - 1] !== '') {
        currentSectionLines.push(''); // blank line inside section
      }
    }
    i++;
  }
  
  // Push final section
  if (currentSectionTitle || currentSectionLines.length > 0) {
    sections.push({
      title: currentSectionTitle,
      paragraphs: [...currentSectionLines]
    });
  }
  
  if (!titleText) {
    titleText = title;
  }
  
  htmlBody += `
    <div class="header">
      <div class="title">${titleText}</div>
      <div class="subtitle">Қауіпсіздік инфрақұрылымының ресми құжаты • ${langName}</div>
    </div>
  `;
  
  sections.forEach(sec => {
    if (!sec.title && sec.paragraphs.length === 0) return;
    
    if (sec.title) {
      htmlBody += `<h2>${sec.title}</h2>`;
    }
    
    let listOpen = false;
    let listType: 'ol' | 'ul' | null = null;
    
    sec.paragraphs.forEach(pLine => {
      const trimmed = pLine.trim();
      if (!trimmed) {
        if (listOpen) {
          htmlBody += listType === 'ol' ? '</ol>' : '</ul>';
          listOpen = false;
          listType = null;
        }
        return;
      }
      
      const numMatch = trimmed.match(/^(\d+)[\.\)]\s*(.*)$/);
      const bulletMatch = trimmed.match(/^[\-\*]\s*(.*)$/);
      
      if (numMatch) {
        if (!listOpen || listType !== 'ol') {
          if (listOpen) {
            htmlBody += listType === 'ol' ? '</ol>' : '</ul>';
          }
          htmlBody += '<ol>';
          listOpen = true;
          listType = 'ol';
        }
        htmlBody += `<li>${numMatch[2]}</li>`;
      } else if (bulletMatch) {
        if (!listOpen || listType !== 'ul') {
          if (listOpen) {
            htmlBody += listType === 'ol' ? '</ol>' : '</ul>';
          }
          htmlBody += '<ul>';
          listOpen = true;
          listType = 'ul';
        }
        htmlBody += `<li>${bulletMatch[1]}</li>`;
      } else {
        if (listOpen) {
          htmlBody += listType === 'ol' ? '</ol>' : '</ul>';
          listOpen = false;
          listType = null;
        }
        htmlBody += `<p class="section-content">${trimmed}</p>`;
      }
    });
    
    if (listOpen) {
      htmlBody += listType === 'ol' ? '</ol>' : '</ul>';
    }
  });
  
  const fullHtml = `
  <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
  <head>
    <meta charset="utf-8">
    <title>${titleText}</title>
    <!--[if gte mso 9]>
    <xml>
      <w:WordDocument>
        <w:View>Print</w:View>
        <w:Zoom>100</w:Zoom>
        <w:DoNotOptimizeForBrowser/>
      </w:WordDocument>
    </xml>
    <![endif]-->
    <style>
      body {
        font-family: 'Georgia', 'Times New Roman', serif;
        font-size: 11.5pt;
        line-height: 1.6;
        color: #1e293b;
        margin: 1in;
      }
      .header {
        text-align: center;
        margin-bottom: 35px;
        border-bottom: 3px double #1e3a8a;
        padding-bottom: 20px;
      }
      .title {
        font-family: 'Calibri', 'Arial', sans-serif;
        font-size: 20pt;
        font-weight: bold;
        color: #1e3a8a;
        margin-bottom: 8px;
        line-height: 1.2;
      }
      .subtitle {
        font-family: 'Calibri', 'Arial', sans-serif;
        font-size: 10.5pt;
        color: #64748b;
        font-style: italic;
      }
      h2 {
        font-family: 'Calibri', 'Arial', sans-serif;
        font-size: 13.5pt;
        font-weight: bold;
        color: #0f172a;
        margin-top: 30px;
        margin-bottom: 12px;
        border-bottom: 1px solid #cbd5e1;
        padding-bottom: 4px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .section-content {
        margin-bottom: 12px;
        text-align: justify;
        text-indent: 0.25in;
      }
      ol, ul {
        margin-left: 25px;
        margin-top: 5px;
        margin-bottom: 15px;
        padding-left: 0;
      }
      li {
        margin-bottom: 6px;
        text-align: justify;
      }
      .footer {
        text-align: center;
        font-size: 9pt;
        color: #94a3b8;
        margin-top: 60px;
        border-top: 1px solid #e2e8f0;
        padding-top: 12px;
        font-family: 'Calibri', 'Arial', sans-serif;
      }
    </style>
  </head>
  <body>
    ${htmlBody}
    <div class="footer">
      Астана қаласы, Колледж қауіпсіздік инфрақұрылымы және мониторингі департаменті © 2026
    </div>
  </body>
  </html>
  `;
  return fullHtml;
}
