"use client";

import { useState } from "react";
import Menu from "../../components/Menu"; // Caminho correto para o componente Menu
import styles from "./page.module.css"; // Importa o arquivo CSS como um módulo
import Image from "next/image"; // Importa o componente Image do Next.js

const EmpresaIntermediaria = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, phone, value, description });
    setName("");
    setPhone("");
    setValue("");
    setDescription("");
  };

  // Aqui futuramente vai haver um fetch no back para receber
  // as reclamações categorizadas

  const complaints = [
    { category: "Não classificados", operation: "Pagamento", requests: 300, urgency: "Alta" },
    { category: "Cobrança indevida", operation: "Pagamento", requests: 300, urgency: "Alta" },
    { category: "Estorno não recebido", operation: "Estorno", requests: 25, urgency: "Baixa" },
    { category: "Falhas com o débito automático", operation: "Débito automático", requests: 60, urgency: "Moderada" },
    { category: "Informações incorretas na fatura", operation: "Fatura", requests: 60, urgency: "Moderada" },
  ];

  return (
    <div className={styles.container}>
      <Menu />
      <main className={styles.content}>
        <header>
          <h1 className={styles.title}>Central de Reclamações</h1>
          <div className={styles.details}>
            <div className={styles.details_box}>
              <div className={styles.details_ico}>
                <Image src="/Ticket.svg" alt="Ticket Icon" width={48} height={48} />
              </div>
              <p>256 Tickets abertos</p>
            </div>
            <div className={styles.details_box}>
              <div className={styles.details_ico}>
                <Image src="/HourglassSimple.svg" alt="Ticket Icon" width={48} height={48} />
              </div>
              <p>24h Tempo médio de resposta inicial</p>
            </div>
            <div className={styles.details_box}>
              <div className={styles.details_ico}>
                <Image src="/ChatsCircle.svg" alt="Ticket Icon" width={48} height={48} />
              </div>
              <p>12h Tempo médio de resolução</p>
            </div>
          </div>
        </header>

        <section>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Categoria</th>
                <th className={styles.th}>Operação</th>
                <th className={styles.th}>n° de solicitações</th>
                <th className={styles.th}>Urgência</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint, index) => (
                <tr key={index}>
                  <td className={styles.td}>{complaint.category}</td>
                  <td className={styles.td}>{complaint.operation}</td>
                  <td className={styles.td}>{complaint.requests}</td>
                  <td className={`${styles.td} ${styles[`urgency-${complaint.urgency.toLowerCase()}`]}`}>
                    {complaint.urgency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default EmpresaIntermediaria;
