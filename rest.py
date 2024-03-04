from flask import Flask, jsonify, request
import json
import datetime
import conversion_rate

app = Flask(__name__)
global currency_rates
global timestamp
currency_rates = dict()
timestap = ""


@app.route('/api/rates', methods=['GET'])
def get_rates():
    # Read the currency rates from the file
    global currency_rates
    global timestamp
    if((datetime.datetime.now()-timestamp).seconds > 3600):
        currency_rates = conversion_rate.get_all_rates()
        timestamp = datetime.datetime.now()
        with open("rates.json", 'w', encoding='utf-8') as f:
            json.dump({"rates":currency_rates,"timestamp":timestamp.strftime("%Y-%m-%d %H:%M:%S")}, f)
    return jsonify(currency_rates)

if __name__ == '__main__':
    try:
        with open("rates.json", 'r', encoding='utf-8') as f:
            tmp_json = json.load(f)
    
        currency_rates = tmp_json["rates"]
        timestamp = tmp_json["timestamp"]
        timestamp = datetime.datetime.strptime(timestamp, "%Y-%m-%d %H:%M:%S")
    except:
        currency_rates = conversion_rate.get_all_rates()
        timestamp = datetime.datetime.now()
        with open("rates.json", 'w', encoding='utf-8') as f:
            json.dump({"rates":currency_rates,"timestamp":timestamp.strftime("%Y-%m-%d %H:%M:%S")}, f)
    app.run()
