from utils import define_browser, arguments
from database import db_conn
from scraper import scraper
from url_collector import url_collector


def main():
    args = arguments()
    print('\n-- RECLAME AQUI SCRAPER --')
    conn, cursor = db_conn()
    args.pages = 50 if args.pages > 50 else args.pages
    driver = define_browser(args.browser)
    coletor = url_collector(driver, args.file, args.id, args.pages, conn, cursor)
    scraper(coletor, args.id, conn, cursor)
    driver.quit()



if __name__ == '__main__':
    main()
