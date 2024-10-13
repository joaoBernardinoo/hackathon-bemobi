import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./menu.module.css";
import { useRouter } from "next/navigation";

const Menu = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    console.log(`Você clicou em: ${option}`);
  };

  const handleLogout = () => {
    console.log("Logout realizado");
    router.push("/");
  };

  // Set the default selected option to 'Opção 1'
  useEffect(() => {
    setSelectedOption("Opção 1");
  }, []);

  return (
    <div className={styles.sidebar}>
      <div className={styles.menu}>
        <div className={styles.logo}>
          <Image src="/vivo.png" alt="Logo" width={41} height={56} />
        </div>

        <div
          className={`${styles.menuItem} ${selectedOption === "Opção 1" ? styles.selectedOption : ""}`}
          onClick={() => handleOptionClick("Opção 1")}
        >
          <Image src="/primeiro.png" alt="Logo Opção 1" width={32} height={32} />
        </div>
        <div
          className={`${styles.menuItem} ${selectedOption === "Opção 2" ? styles.selectedOption : ""}`}
          onClick={() => handleOptionClick("Opção 2")}
        >
          <Image src="/segundo.png" alt="Logo Opção 2" width={32} height={32} />
        </div>
        <div
          className={`${styles.menuItem} ${selectedOption === "Opção 3" ? styles.selectedOption : ""}`}
          onClick={() => handleOptionClick("Opção 3")}
        >
          <Image src="/terceiro.png" alt="Logo Opção 3" width={32} height={32} />
        </div>
      </div>

      <div className={styles.logoutContainer}>
        <button className={styles.logoutButton} onClick={handleLogout}>
          <Image src="/logout.png" alt="Logo Opção 3" width={54} height={57} />
        </button>
      </div>
    </div>
  );
};

export default Menu;
