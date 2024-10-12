// src/app/admin/telaempresa/page.js

"use client"; // Adicione esta linha para tornar o componente um Client Component

import { useState } from 'react';
import styles from '../../../styles/Admin.module.css'; // Adicione estilos conforme necessário

const EmpresaIntermediaria = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados para um backend
    console.log({ name, phone, value, description });
    // Resetar os campos do formulário
    setName('');
    setPhone('');
    setValue('');
    setDescription('');
  };

  return (
    <div className={styles.container}>
      <header>
        <h1>Admin - Empresa Intermediária</h1>
      </header>
      
      <h2>Dashboard de Problemas de Pagamento</h2>
      <h3>Relatar Problema de Pagamento</h3>
      
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Nome" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Número de Telefone" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          required 
        />
        <input 
          type="number" 
          placeholder="Valor" 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          required 
        />
        <textarea 
          placeholder="Descrição do Problema" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
        <button type="submit">Enviar</button>
      </form>

      <div className={styles.graphPlaceholder}>
        <h3>Gráficos de Análise</h3>
        {/* Placeholder para gráficos */}
        <div style={{ height: '200px', backgroundColor: '#e3e3e3', margin: '20px 0' }}>
          Gráfico aqui
        </div>
      </div>
    </div>
  );
};

export default EmpresaIntermediaria;
