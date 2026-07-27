const fs = require('fs');

const files = [
  'app/page.tsx',
  'app/rooms/page.tsx',
  'components/rooms/RoomFilterPanel.tsx',
  'components/rooms/RoomCard.tsx',
  'components/Footer.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  const classRegex = /className=(["'])(.*?)\1/g;
  
  content = content.replace(classRegex, (match, quote, classStr) => {
    let classes = classStr.split(/\s+/);
    let newClasses = [];
    
    classes.forEach(c => {
      if (c.startsWith('dark:')) {
        newClasses.push(c.replace('dark:', ''));
      } else {
        const lightClassesToRemove = [
          'bg-white', 'text-gray-900', 'text-gray-800', 'text-gray-700', 'text-gray-600', 'text-gray-500', 
          'bg-gray-50', 'bg-gray-100', 'bg-gray-200', 'bg-gray-300',
          'border-gray-100', 'border-gray-200', 'border-gray-300',
          'bg-[#FFFDF7]', 'bg-[#F9F7F1]', 'bg-[#fffdf0]', 'border-[#e8dcb8]',
          'bg-[var(--color-cream)]', 'text-[var(--color-maroon)]', 'border-[var(--color-maroon)]'
        ];
        if (!lightClassesToRemove.includes(c)) {
          newClasses.push(c);
        }
      }
    });
    
    return `className=${quote}${newClasses.join(' ')}${quote}`;
  });

  const templateClassRegex = /className=\{`([^`]+)`\}/g;
  content = content.replace(templateClassRegex, (match, classStr) => {
    let parts = classStr.split(/(\$\{[^}]+\})/); 
    let res = parts.map(part => {
      if (part.startsWith('${')) return part;
      
      let classes = part.split(/\s+/);
      let newClasses = [];
      classes.forEach(c => {
        if (!c) return;
        if (c.startsWith('dark:')) {
          newClasses.push(c.replace('dark:', ''));
        } else {
          const lightClassesToRemove = [
            'bg-white', 'text-gray-900', 'text-gray-800', 'text-gray-700', 'text-gray-600', 'text-gray-500', 
            'bg-gray-50', 'bg-gray-100', 'bg-gray-200', 'bg-gray-300',
            'border-gray-100', 'border-gray-200', 'border-gray-300',
            'bg-[#FFFDF7]', 'bg-[#F9F7F1]', 'bg-[#fffdf0]', 'border-[#e8dcb8]',
            'bg-[var(--color-cream)]', 'text-[var(--color-maroon)]', 'border-[var(--color-maroon)]'
          ];
          if (!lightClassesToRemove.includes(c)) {
            newClasses.push(c);
          }
        }
      });
      return newClasses.join(' ');
    }).join('');
    
    return `className={\`${res}\`}`;
  });

  fs.writeFileSync(file, content, 'utf8');
  console.log('Processed', file);
});
