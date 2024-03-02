from bs4 import BeautifulSoup
import requests
import json

# Function to parse the title from a given link
def parse_currency_rate(link) -> int:
    response = requests.get(link)
    soup = BeautifulSoup(response.text, 'html.parser')
    class_id="YMlKec fxKbKc"
    title = soup.find_all(class_=class_id)
    return float(title[0].text)
    

# Example usage
base_link=f"https://www.google.com/finance/quote/"

with open("currencies.json",'r',encoding='utf-8') as f:
    currencies = json.load(f)

currency_rates=dict()

for currency in currencies:
    if currency == 'HUF':
        currency_rates['HUF'] = 1
        continue
    link = base_link + f"{currency}-HUF"
    currency_rates[currency] = parse_currency_rate(link)

with open("rates.json",'w',encoding='utf-8') as f:
    json.dump(currency_rates,f)

print("Done parsing")
