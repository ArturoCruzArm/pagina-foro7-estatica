const r = require('./lhr-1769759442362.json');
const accAudits = r.categories.accessibility.auditRefs.map(a => a.id);

console.log('\n=== PROBLEMAS DE ACCESIBILIDAD ===\n');

Object.entries(r.audits)
  .filter(([k, v]) => accAudits.includes(k) && v.score !== null && v.score < 1)
  .forEach(([k, v]) => {
    console.log(`❌ ${v.title}`);
    console.log(`   Score: ${Math.round(v.score * 100)}%`);
    if (v.details && v.details.items) {
      v.details.items.slice(0, 3).forEach(item => {
        if (item.node && item.node.snippet) {
          console.log(`   Element: ${item.node.snippet.substring(0, 80)}...`);
        }
      });
    }
    console.log('');
  });
