'use client'
import { useState, useEffect } from 'react';

export default function AdminBemobi() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Todos');
  const [predictedIssues, setPredictedIssues] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Aqui futuramente irá o fetch para obter as reclamações da API e chatbot
    // Por enquanto, vamos usar dados mockados para simular reclamações e problemas previstos
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

    const mockPredictedIssues = [
      {
        id: 6,
        title: 'Cartão a expirar',
        description: 'O cartão de crédito de um cliente irá expirar em breve.',
        company: 'Tim',
        status: 'Previsto',
      },
      {
        id: 7,
        title: 'Possível saldo insuficiente',
        description: 'Um cliente tem saldo baixo e pode falhar em realizar o próximo pagamento.',
        company: 'Vivo',
        status: 'Previsto',
      },
    ];

    const mockAlerts = [
      {
        id: 1,
        message: 'Problema recorrente: Falha de pagamento Vivo (30 relatos nos últimos 7 dias)',
        severity: 'Alto',
      },
      {
        id: 2,
        message: 'Cartão expirado para vários clientes Claro',
        severity: 'Médio',
      },
    ];

    setIssues(mockIssues);
    setPredictedIssues(mockPredictedIssues);
    setAlerts(mockAlerts);
    setLoading(false);
  }, []);

  const filteredIssues = filter === 'Todos'
    ? issues
    : issues.filter((issue) => issue.company === filter);

  const filteredPredictedIssues = filter === 'Todos'
    ? predictedIssues
    : predictedIssues.filter((issue) => issue.company === filter);

  const companies = ['Todos', 'Vivo', 'Claro', 'Tim'];

  return (
    <div>
      <h1>Admin - Bemobi: Monitoramento de Reclamações e Previsão</h1>

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
          {/* Alertas */}
          <h2>Alertas Proativos</h2>
          {alerts.length === 0 ? (
            <p>Nenhum alerta no momento.</p>
          ) : (
            <ul>
              {alerts.map((alert) => (
                <li key={alert.id}>
                  <p>{alert.message}</p>
                  <p>Severidade: {alert.severity}</p>
                </li>
              ))}
            </ul>
          )}

          {/* Reclamações Recentes */}
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

          {/* Problemas Previstos */}
          <h2>Problemas Previstos</h2>
          <ul>
            {filteredPredictedIssues.map((issue) => (
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
