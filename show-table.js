async function init() {
  const params = new URLSearchParams(window.location.search);
  const hgnc = params.get('hgnc') || '16435';
  console.log(`Param: ${hgnc}`);
  const data = await fetchDatabySPARQL(hgnc);
  renderTable(data);
}

function renderTable(data) {
  const table = document.getElementById('resultsTable');

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  data.head.vars.forEach(variable => {
    const th = document.createElement('th');
    th.textContent = variable;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  data.results.bindings.forEach(binding => {
    const tr = document.createElement('tr');
    data.head.vars.forEach(variable => {
      const td = document.createElement('td');
      td.textContent = binding[variable].value;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
}

async function fetchDatabySPARQL(hgnc) {
  const endpointUrl = 'https://orth.dbcls.jp/sparql-orth4';
  const sparqlQuery = `
PREFIX hgnc: <http://identifiers.org/hgnc/>
PREFIX biolink: <https://w3id.org/biolink/vocab/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT ?gene ?label ?symbol ?phenotype ?phenotype_label
WHERE {
  VALUES ?hgnc { hgnc:${hgnc} }
  ?hgnc biolink:orthologous_to ?gene .
  ?gene rdfs:label ?label ;
        biolink:symbol ?symbol ;
        biolink:has_phenotype ?phenotype .
  ?phenotype rdfs:label ?phenotype_label .
  FILTER(CONTAINS(?label, ' '))
}
             `;

  const response = await fetch(endpointUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/sparql-results+json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `query=${encodeURIComponent(sparqlQuery)}`
  });

  return await response.json();
}
