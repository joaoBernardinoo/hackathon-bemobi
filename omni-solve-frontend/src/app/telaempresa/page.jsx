"use client";

import { useState } from 'react';
import Menu from '../../components/Menu'; // Caminho correto para o componente Menu

const EmpresaIntermediaria = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, phone, value, description });
    setName('');
    setPhone('');
    setValue('');
    setDescription('');
  };

  return (
    <div>
      <Menu/>
    </div>
  );
};

export default EmpresaIntermediaria;
