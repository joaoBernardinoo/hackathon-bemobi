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
    { category: "Não classificados", operation: "Pagamento", requests: 300, urgency: "Alta", trend: "subiu" },
    { category: "Cobrança indevida", operation: "Pagamento", requests: 300, urgency: "Alta", trend: "subiu" },
    { category: "Estorno não recebido", operation: "Estorno", requests: 25, urgency: "Baixa", trend: "desceu" },
    {
      category: "Falhas com o débito automático",
      operation: "Débito automático",
      requests: 60,
      urgency: "Moderada",
      trend: "desceu",
    },
    {
      category: "Informações incorretas na fatura",
      operation: "Fatura",
      requests: 60,
      urgency: "Moderada",
      trend: "subiu",
    },
    { category: "Cobrança indevida", operation: "Pagamento", requests: 300, urgency: "Alta", trend: "subiu" },
    { category: "Estorno não recebido", operation: "Estorno", requests: 25, urgency: "Baixa", trend: "desceu" },
    {
      category: "Falhas com o débito automático",
      operation: "Débito automático",
      requests: 60,
      urgency: "Moderada",
      trend: "desceu",
    },
    {
      category: "Informações incorretas na fatura",
      operation: "Fatura",
      requests: 60,
      urgency: "Moderada",
      trend: "subiu",
    },
    { category: "Cobrança indevida", operation: "Pagamento", requests: 300, urgency: "Alta", trend: "subiu" },
    { category: "Estorno não recebido", operation: "Estorno", requests: 25, urgency: "Baixa", trend: "desceu" },
    {
      category: "Falhas com o débito automático",
      operation: "Débito automático",
      requests: 60,
      urgency: "Moderada",
      trend: "desceu",
    },
    {
      category: "Informações incorretas na fatura",
      operation: "Fatura",
      requests: 60,
      urgency: "Moderada",
      trend: "subiu",
    },
  ];

  return (
    <div className={styles.container}>
      <Menu />
      <div>
        <h1 className={styles.title}>Central de Reclamações</h1>
        <main className={styles.content}>
          <header>
            <div className={styles.details}>
              <div className={styles.details_box}>
                <div className={styles.details_ico}>
                  <Image src="/Ticket.svg" alt="Ticket Icon" width={48} height={48} />
                </div>
                <div className={styles.detailContainer}>
                  <p className={styles.detailText}>256</p>
                  <p className={styles.detailSubText}>Tickets abertos</p>
                </div>
              </div>
              <div className={styles.details_box}>
                <div className={styles.details_ico}>
                  <Image src="/HourglassSimple.svg" alt="Ticket Icon" width={48} height={48} />
                </div>
                <div className={styles.detailContainer}>
                  <p className={styles.detailText}>24h</p>
                  <p className={styles.detailSubText}>Tempo médio de resposta inicial</p>
                </div>
              </div>
              <div className={styles.details_box}>
                <div className={styles.details_ico}>
                  <Image src="/ChatsCircle.svg" alt="Ticket Icon" width={48} height={48} />
                </div>
                <div className={styles.detailContainer}>
                  <p className={styles.detailText}>12h</p>
                  <p className={styles.detailSubText}>Tempo médio de resolução</p>
                </div>
              </div>
            </div>
          </header>

          <section>
            <div className={styles.table}>
              <div className={styles.tableHeader}>
                <div className={styles.tableRow}>
                  <div className={`${styles.tableCell} ${styles.thBold}`}>Categoria</div>
                  <div className={`${styles.tableCell} ${styles.th}`}>Operação</div>
                  <div className={`${styles.tableCell} ${styles.th}`}>n° de solicitações</div>
                  <div className={`${styles.tableCell} ${styles.th}`}>Urgência</div>
                </div>
              </div>
              <div className={styles.tableBody}>
                {complaints.map((complaint, index) => (
                  <div key={index} className={`${styles.tableRow} ${styles[`coluna${index + 1}`]}`}>
                    <div className={styles.tableCell}>
                      <div className={styles.categoryCell}>
                        <Image src="/caret-circle-right.svg" alt="caret circle" width={20} height={20} />
                        <div>{complaint.category}</div>
                      </div>
                    </div>
                    <div className={styles.tableCell}>
                      <div className={styles.operationCell}>
                        <p className={styles.operationCellText}>{complaint.operation}</p>
                      </div>
                    </div>
                    <div className={styles.tableCell}>
                      <div className={styles.requestsCell}>
                        <p className={styles.requestsCellText}>{complaint.requests}</p>
                        {complaint.trend == "subiu" ? (
                          <Image src="/arrow-up.svg" alt="trend up" width={16} height={16} />
                        ) : (
                          <Image src="/ArrowDown.svg" alt="trend down" width={16} height={16} />
                        )}
                      </div>
                    </div>
                    <div
                      className={`${styles.tableCell} ${styles.urgencyCell} ${
                        styles[`urgency-${complaint.urgency.toLowerCase()}`]
                      }`}
                    >
                      * {complaint.urgency}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default EmpresaIntermediaria;
