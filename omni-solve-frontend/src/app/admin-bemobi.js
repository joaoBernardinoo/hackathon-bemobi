import { useState, useEffect } from 'react';

export default function AdminBemobi() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Todos');

  useEffect(() => {
    // Aqui futuramente irá o fetch para obter as reclamações da API
    // Por enquanto, vamos usar dados mockados
    const mockIssues = [
      {
        id: 1,
        title: 'Falha no pagamento',
        description: 'O cliente não conseguiu realizar o pagamento, houve erro de transação.',
        company: 'Vivo',
        status: 'Em andamento',
      },
      {
        id: 2,
        title: 'Cartão expirado',
        description: 'O cartão de crédito do cliente expirou e ele não conseguiu atualizar os dados.',
        company: 'Claro',
        status: 'Resolvido',
      },
      {
        id: 3,
        title: 'Erro de saldo insuficiente',
        description: 'O cliente não conseguiu pagar devido a saldo insuficiente na conta.',
        company: 'Tim',
        status: 'Pendente',
      },
      {
        id: 4,
        title: 'Problema de estorno',
        description: 'O estorno não foi realizado após uma falha no serviço.',
        company: 'Vivo',
        status: 'Em andamento',
      },
      {
        id: 5,
        title: 'Atividade suspeita',
        description: 'O sistema detectou uma atividade suspeita na conta do cliente.',
        company: 'Claro',
        status: 'Investigando',
      },
    ];

    setIssues(mockIssues);
    setLoading(false);
  }, []);

  const filteredIssues = filter === 'Todos'
    ? issues
    : issues.filter((issue) => issue.company === filter);

  const companies = ['Todos', 'Vivo', 'Claro', 'Tim'];

  return (
    <div>
      <h1>Admin - Bemobi: Monitoramento de Reclamações</h1>

      {/* Filtros por empresa */}
      <div>
        <label htmlFor="company-filter">Filtrar por empresa: </label>
        <select
          id="company-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {companies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Carregando dados...</p>
      ) : (
        <div>
          <h2>Reclamações Recentes</h2>
          <ul>
            {filteredIssues.map((issue) => (
              <li key={issue.id}>
                <h3>{issue.title} - {issue.company}</h3>
                <p>{issue.description}</p>
                <p>Status: {issue.status}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
