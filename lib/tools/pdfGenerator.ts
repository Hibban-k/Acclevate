export async function generatePDF(elementId: string, filename: string = 'document.pdf') {
    const element = document.getElementById(elementId);
    if (!element) {
        alert('Document element not found');
        return;
    }

    let documentHTML = element.outerHTML;
    
    // Architect Fix: Puppeteer renders an isolated HTML string, meaning relative paths (like /images/bg.png) will break.
    // We must convert all relative image paths to absolute URLs based on the current frontend domain.
    const baseUrl = window.location.origin;
    documentHTML = documentHTML.replace(/url\(['"]?(\/images\/[^'"]+)['"]?\)/g, `url('${baseUrl}$1')`);
    documentHTML = documentHTML.replace(/src=["'](\/logo\.png)["']/g, `src="${baseUrl}$1"`);
    documentHTML = documentHTML.replace(/src=["'](\/images\/[^'"]+)["']/g, `src="${baseUrl}$1"`);

    // Construct the final HTML payload for the backend
    // We inject Tailwind CSS, the Google Fonts, and the exact print configurations
    const finalHtmlPayload = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Inter:wght@100..900&display=swap" rel="stylesheet">
            <style>
                :root {
                    --font-sans: 'Inter', sans-serif;
                    --font-heading: 'Geist', serif;
                }
                body {
                    margin: 0;
                    padding: 0;
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                    font-family: var(--font-sans);
                }
                @page {
                    size: A4;
                    margin: 0;
                }
            </style>
        </head>
        <body class="bg-white">
            ${documentHTML}
        </body>
        </html>
    `;

    try {
        // In production, configure NEXT_PUBLIC_PDF_SERVICE_URL in your .env
        const backendUrl = process.env.NEXT_PUBLIC_PDF_SERVICE_URL || 'http://localhost:5000';
        
        const response = await fetch(`${backendUrl}/generate-pdf`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ html: finalHtmlPayload })
        });

        if (!response.ok) {
            throw new Error('Backend failed to generate PDF');
        }

        // Convert response buffer to Blob and trigger browser download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        
        // Cleanup
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

    } catch (error) {
        console.error('PDF Generation Error:', error);
        alert('Failed to generate PDF. Make sure your Express backend is running on port 5000!');
    }
}
