export function convertBlocksToHTML(blocks: any) {
  if (!blocks) return
  let html = ''
  let headerLevel = ''
  let imageUrl = ''

  for (const block of blocks) {
    switch (block.type) {
      case 'Header':
        headerLevel = block.data.level || 1
        html += `<h${headerLevel}>${block.data.text}</h${headerLevel}>\n`
        break
      case 'paragraph':
        html += `<p>${block.data.text}</p>\n`
        break
      case 'List':
        if (block.data.style === 'unordered') {
          html += '<ul>\n'
          for (const item of block.data.items) {
            html += `<li>${item}</li>\n`
          }
          html += '</ul>\n'
        } else if (block.data.style === 'ordered') {
          html += '<ol>\n'
          for (const item of block.data.items) {
            html += `<li>${item}</li>\n`
          }
          html += '</ol>\n'
        }
        break
      case 'Image':
        imageUrl = block.data.file.url
        html += `<img src="http://studyin-uzbekistan.uz/${imageUrl}" alt="${block.data.caption}" />\n`
        break
      case 'Quote':
        html += `<blockquote><p>${block.data.text}</p>\n <div class="mt-3 flex-y-center gap-3"><div class="w-0.5 h-[26px] rounded-[10px] bg-blue" ></div><p class="text-xl !leading-130 !font-bold text-dark">${block.data.caption}</p></div></blockquote>\n`
        break
      case 'Code':
        html += `<pre><code>${block.data.code}</code></pre>\n`
        break
      case 'Delimiter':
        html += '<hr />\n'
        break
      default:
        // Handle any other block types here, if needed
        break
    }
  }

  return html
}
