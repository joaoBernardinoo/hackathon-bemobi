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

    resposta_empresa = '--'
    replica_usuario = '--'

    interaction_list = soup.select_one('div[data-testid="complaint-interaction-list"]')
    
    if interaction_list:
        interactions = interaction_list.select('div[data-testid="complaint-interaction"]')
        
        for interaction in interactions:
            interaction_type = interaction.select_one('h2')
            if interaction_type and 'Resposta da empresa' in interaction_type.text:
                resposta_empresa = interaction.select_one('p').text if interaction.select_one('p') else '--'
            
            if interaction_type and 'Réplica do consumidor' in interaction_type.text:
                replica_usuario = interaction.select_one('p').text if interaction.select_one('p') else '--'

    reclamacao = Reclamacao(
        url,
        complaint_text,
        complaint_title,
        complaint_local,
        complaint_date,
        complaint_status,
        find_and_assign_element(soup, constants.COMPLAIN_CATEGORY_1_SELECTOR),
        find_and_assign_element(soup, constants.COMPLAIN_CATEGORY_2_SELECTOR),
        find_and_assign_element(soup, constants.COMPLAIN_CATEGORY_3_SELECTOR),
        resposta_empresa,  # Novo campo
        replica_usuario  # Novo campo
    )

    return reclamacao



def find_and_assign_element(soup, selector):
    element = soup.select_one(selector)
    return element.text if element else '--'
