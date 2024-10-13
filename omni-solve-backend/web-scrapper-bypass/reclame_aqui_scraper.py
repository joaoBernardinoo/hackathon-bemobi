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