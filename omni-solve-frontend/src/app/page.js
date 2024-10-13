// src/app/admin/page.js

"use client"; // Adicione esta linha para tornar o componente um Client Component

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AdminPage = () => {
  const router = useRouter();

  // Função para redirecionar ao clicar no botão
  const handleRedirect = () => {
    router.push('/telaempresa');
  };

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif', padding: '20px', textAlign: 'center' }}>
      <h1>Bem-vindo ao Omni Solve</h1>
      <h2>Painel de Administração</h2>
      <p>Para acessar a tela da empresa intermediária, clique no botão abaixo:</p>
      
      {/* Botão de redirecionamento */}
      <button 
        onClick={handleRedirect} 
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          color: '#fff',
          backgroundColor: '#0070f3',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Acessar Tela da Empresa Intermediária
      </button>
    </div>
  );
};

export default AdminPage;
