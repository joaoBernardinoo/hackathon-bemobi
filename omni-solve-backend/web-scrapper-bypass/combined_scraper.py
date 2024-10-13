
# --- constants.py ---

COMPLAIN_LIST_BASE_URL = "https://www.reclameaqui.com.br/empresa/{}/lista-reclamacoes/?pagina=1"

COMPLAIN_URL_SELECTOR = "div.sc-1sm4sxr-0 a"
COMPLAIN_TEXT_SELECTOR = 'p[data-testid="complaint-description"]'
COMPLAIN_TITLE_SELECTOR = 'h1[data-testid="complaint-title"]'
COMPLAIN_LOCAL_SELECTOR = 'span[data-testid="complaint-location"]'
COMPLAIN_DATE_SELECTOR = 'span[data-testid="complaint-creation-date"]'
COMPLAIN_STATUS_SELECTOR = 'div[data-testid="complaint-status"]'

COMPLAIN_CATEGORY_1_SELECTOR = 'li[data-testid="listitem-categoria"]'
COMPLAIN_CATEGORY_2_SELECTOR = 'li[data-testid="listitem-produto"]'
COMPLAIN_CATEGORY_3_SELECTOR = 'li[data-testid="listitem-problema"]'

SQL_SELECT_URL = "SELECT DISTINCT url FROM links where status in(0) and page_id in(?)"
SQL_STATUS_UPDATE = "UPDATE links set status = {} where url = ? and page_id = ?;"
SQL_CREATE_TABLE = "CREATE TABLE IF NOT EXISTS links (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,url TEXT NOT NULL,status INTEGER NOT NULL,page_id TEXT NOT NULL);"
SQL_INSERT_LINK = "INSERT INTO links (url, status, page_id) VALUES (?, ?, ?);"
SQL_SUCCESS_STATUS = "1"
SQL_ERROR_STATUS = "3"

CSV_FILE_HEADERS = ['url', 'titulo', 'texto', 'status', 'local',
                    'data_hora', 'problem_type', 'product_type', 'category']

# --- database.py ---

import os
import sqlite3
import constants


def db_conn():
    if not os.path.exists('Database'):
        os.mkdir('Database')

    conn = sqlite3.connect('Database/coleta.db')
    cursor = conn.cursor()

    return conn, cursor


def db_writer(url_texto, url_id, conn, cursor):
    cursor.execute(constants.SQL_CREATE_TABLE)

    for link in url_texto:
        cursor.execute(constants.SQL_INSERT_LINK, (link, 0, url_id))
    conn.commit()

    with open('Arquivos/{}_log.txt'.format(url_id), 'a', encoding='utf8') as logfile:
        logfile.writelines('URL_ID:{}'.format(url_id))


def update_status(cursor, status, url, id_page):
    cursor.execute(constants.SQL_STATUS_UPDATE.format(
        status), (url, id_page))

# --- Reclamacao.py ---

class Reclamacao:
    def __init__(self, url, texto, titulo, local, data_hora, status, problem_type, product_type, category):
        self.url = url
        self.texto = texto
        self.titulo = titulo
        self.local = local
        self.data_hora = data_hora
        self.status = status
        self.problem_type = problem_type
        self.product_type = product_type
        self.category = category

    def to_dict(self):
        return vars(self)

# --- scraper.py ---

import constants
from Reclamacao import Reclamacao
from database import update_status
from utils import csv_writer, format_url
from logger import logger, write_log_file
import cloudscraper
import time
from bs4 import BeautifulSoup

def scraper(nome, id_page, conn, cursor):
    scraper = cloudscraper.create_scraper()
    cursor.execute(constants.SQL_SELECT_URL, (id_page,))
    urls = cursor.fetchall()

    cont = 1
    try:
        for url in urls:
            try:
                url = format_url(url)
                logger.info('Acessando: {}'.format(url[30:]))
                
                response = scraper.get(url)
                soup = BeautifulSoup(response.content, 'html.parser')
                
                reclamacao = create_complaint(soup, url)
                csv_writer(reclamacao.to_dict(), nome)
                logger.info('URL {} OK'.format(cont))
                cont += 1
                update_status(cursor, constants.SQL_SUCCESS_STATUS, url, id_page)
                write_log_file(id_page, url)
                time.sleep(2)
            except Exception as e:
                logger.error('Não foi possível acessar a reclamação, indo para próxima...\n')
                update_status(cursor, constants.SQL_ERROR_STATUS, url, id_page)
                write_log_file(id_page, url, 'EXCEPTION', e)

        logger.info('Coleta concluída! Nome do arquivo: {}'.format(nome))
    except Exception as e:
        logger.error(e)
    finally:
        conn.commit()


def create_complaint(soup, url):
    complaint_text = soup.select_one(constants.COMPLAIN_TEXT_SELECTOR).text
    complaint_title = soup.select_one(constants.COMPLAIN_TITLE_SELECTOR).text
    complaint_local = soup.select_one(constants.COMPLAIN_LOCAL_SELECTOR).text
    complaint_date = soup.select_one(constants.COMPLAIN_DATE_SELECTOR).text
    complaint_status = soup.select_one(constants.COMPLAIN_STATUS_SELECTOR).text

    reclamacao = Reclamacao(
        url,
        complaint_text,
        complaint_title,
        complaint_local,
        complaint_date,
        complaint_status,
        find_and_assign_element(soup, constants.COMPLAIN_CATEGORY_1_SELECTOR),
        find_and_assign_element(soup, constants.COMPLAIN_CATEGORY_2_SELECTOR),
        find_and_assign_element(soup, constants.COMPLAIN_CATEGORY_3_SELECTOR)
    )

    return reclamacao


def find_and_assign_element(soup, selector):
    element = soup.select_one(selector)
    return element.text if element else '--'

# --- url_collector.py ---

from logger import logger
from database import db_writer
from selenium.webdriver.common.by import By

import os
import constants
import re
import time


def url_collector(driver, file, id_page, pages, conn, cursor):
    create_file_folder()
    if log_file_exists(id_page):
        logger.info(
            'Já foram coletados os link para o ID: {}'.format(id_page))
        return file
    else:
        logger.info("ID: {}".format(file))

        url = constants.COMPLAIN_LIST_BASE_URL.format(id_page)
        cont = 1

        val = re.search(r'pagina=[0-9]+', url, re.MULTILINE)
        url = url.replace(val.group(0), 'pagina={}')
        lista_urls = []
        while cont <= int(pages):
            driver.get(url.format(cont))
            logger.info("Página {}".format(cont))
            time.sleep(5)
            url_pg = driver.find_elements(
                By.CSS_SELECTOR, constants.COMPLAIN_URL_SELECTOR)
            for u in url_pg:
                logger.info(u.get_attribute('href'))
                lista_urls.append(u.get_attribute('href'))

            logger.info("Página {} OK".format(cont))
            cont = cont + 1
        db_writer(lista_urls, id_page, conn, cursor)
        logger.info('Coleta de URLs concluída para o ID: {}'.format(file))
    return file


def create_file_folder():
    if not os.path.exists('Arquivos'):
        os.mkdir('Arquivos')


def log_file_exists(id_page):
    if os.path.exists('Arquivos/{}_log.txt'.format(id_page)):
        return True
    return False

# --- utils.py ---

from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.firefox import GeckoDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.firefox.options import Options

import csv
import os
import argparse

import constants


def arguments():
    parser = argparse.ArgumentParser('Reclame Aqui Scraper')
    parser.add_argument('-i', '--id', help='Link ou ID da empresa no Reclame Aqui',
                        action='store', dest='id', required=True)
    parser.add_argument('-p', '--pages', help='Número de páginas para coletar',
                        action='store', dest='pages', required=True, type=int)
    parser.add_argument('-f', '--file', help='Nome do arquivo em que será salvo os dados da coleta',
                        action='store', dest='file', required=True)
    parser.add_argument('-b', '--browser', help='Browser que será utilizado para a coleta, (F) para Firefox e (C) para Chrome',
                        action='store', dest='browser', nargs='?', default="f")
    args = parser.parse_args()
    
    return args


def driver_chrome():
    chrome_options = Options()
    chrome_options.headless = True
    driver = webdriver.Chrome(options=chrome_options, executable_path=ChromeDriverManager(
    ).install(), service_log_path=None)
    return driver


from selenium.webdriver.firefox.service import Service

def driver_firefox():
    geckodriver = '/usr/bin/geckodriver'  # ou o caminho onde o geckodriver está instalado
    firefox_options = Options()
    firefox_options.headless = True
    service= Service(geckodriver)
    driver = webdriver.Firefox(options=firefox_options, service=service)
    return driver


def define_browser(argument):
    if (argument.lower() == "c" or argument.lower() == "chrome"):
        return driver_chrome()
    if (argument.lower() == "f" or argument.lower() == "firefox"):
        return driver_firefox()
    raise Exception("Invalid browser argument.")


def csv_writer(reclamacao, nome):
    with open('Arquivos/{}.csv'.format(nome),
              'a', encoding='utf8', newline='') as arquivo_csv:
        writer = csv.DictWriter(
            arquivo_csv, fieldnames=constants.CSV_FILE_HEADERS)
        file_is_empty = os.stat('Arquivos//{}.csv'.format(nome)).st_size == 0
        if file_is_empty:
            writer.writeheader()
        writer.writerow(reclamacao)


def format_url(url):
    url_str = str(url)
    return url_str.replace("(", "").replace(")", "").replace("'", "").replace(",", "")

# --- reclame_aqui_scraper.py ---

from utils import define_browser, arguments
from database import db_conn
from scraper import scraper
from url_collector import url_collector
import argparse

def parse_args():
    parser = argparse.ArgumentParser(description='Reclame Aqui Scraper')
    parser.add_argument('--browser', type=str, required=True, help='Browser type')
    parser.add_argument('--file', type=str, required=True, help='File path')
    parser.add_argument('--id', type=int, required=True, help='ID')
    parser.add_argument('--pages', type=int, default=50, help='Number of pages')
    return parser.parse_args()

def main(browser, file, id, pages):
    print('\n-- RECLAME AQUI SCRAPER --')
    conn, cursor = db_conn()
    pages = 50 if pages > 50 else pages
    driver = define_browser(browser)
    coletor = url_collector(driver, file, id, pages, conn, cursor)
    scraper(coletor, id, conn, cursor)
    driver.quit()

if __name__ == '__main__':
    args = parse_args()
    main(args.browser, args.file, args.id, args.pages)