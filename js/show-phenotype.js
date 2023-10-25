function renderTable(data) {
  const table = document.getElementById('resultsTable');

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const th1 = document.createElement('th');
  th1.textContent = 'Organism';
  headerRow.appendChild(th1);
  const th2 = document.createElement('th');
  th2.textContent = 'Gene';
  headerRow.appendChild(th2);
  const th3 = document.createElement('th');
  th3.textContent = 'Phenotype';
  headerRow.appendChild(th3);
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  const v = data.head.vars;
  data.results.bindings.forEach(binding => {
    const tr = document.createElement('tr');
    let geneUri = binding[v[0]].value;
    geneUri = geneUri.replace('identifiers.org/mgi/', 'identifiers.org/mgi/MGI:');
    const organismLabel = binding[v[1]].value;
    const geneSymbol = binding[v[2]].value;
    const phenotypeId = binding[v[3]].value;
    const phenotypeLabel = binding[v[4]].value;
    const td1 = document.createElement('td');
    td1.textContent = organismLabel;
    tr.appendChild(td1);
    const link2 = document.createElement('a');
    link2.href = geneUri;
    link2.textContent = geneSymbol;
    const td2 = document.createElement('td');
    td2.appendChild(link2);
    tr.appendChild(td2);
    const link3 = document.createElement('a');
    link3.href = phenotypeId;
    link3.textContent = phenotypeLabel;
    const td3 = document.createElement('td');
    td3.appendChild(link3);
    tr.appendChild(td3);
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
}
