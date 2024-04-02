from flask import Flask, jsonify
import pandas as pd
from flask_cors import CORS


class AnimalDataProcessor:
    locHist = pd.DataFrame()

    def __init__(self):
        self.locHist = pd.read_csv('../data/APA_AnimalsInKennel_copy.csv')

    def get_kennel(self, num):
        kennel_data = {column: value if pd.notnull(value) else "none" for column, value in kennel_data.items()}
        return {column: value for column, value in kennel_data.items()}
    
    def get_kennel_range(self, startNum, endNum):
        kennel_range_data = self.locHist[(self.locHist["kennelNumber"] >= startNum) & (self.locHist["kennelNumber"] <= endNum)].fillna("none").to_dict(orient='records')
        return kennel_range_data
    
    def get_kennels_color(self, startNum, endNum):
        # kennel_range_data = self.locHist[(self.locHist["kennelNumber"] >= startNum) & (self.locHist["kennelNumber"] <= endNum)].fillna("none").to_dict(orient='records')
        kennel_color_data = self.locHist[(self.locHist["kennelNumber"] >= startNum) & (self.locHist["kennelNumber"] <= endNum)][["kennelNumber", "volunteerColor"]].fillna("none").to_dict(orient='records')
        for entry in kennel_color_data:
            entry["volunteerColor"] = entry["volunteerColor"].split()[0]
        return kennel_color_data

DP = AnimalDataProcessor()
app = Flask(__name__)
CORS(app)

@app.route('/')
def get_animal_location_history():
    return 'Hello, World!'

@app.route('/api/kennel/<int:kennelNumber>', methods=['GET'])
def get_kennel_data(kennelNumber):
    if kennelNumber < 0:
        return {'status': 'failed - Invalid kennel number'}, 400
    kennel_data = DP.get_kennel(kennelNumber)
    if kennel_data == []:
        return {'status': 'failed - Kennel not occupied'}
    else:
        return {'status': 'successful', 'data': kennel_data}
    
@app.route('/api/kennel/start=<int:start>&end=<int:end>', methods=['GET'])
def get_kennels_data(start, end):
    if start < 0 or end < 0 or start > end:
        return {'status': 'failed - Invalid kennel number'}, 400
    kennel_data = DP.get_kennel_range(start, end)
    if kennel_data == []:
        return {'status': 'failed - Kennel not occupied'}
    else:
        return {'status': 'successful', 'data': kennel_data}
    
@app.route('/api/kennel-color/start=<int:start>&end=<int:end>', methods=['GET'])
def get_kennels_color(start, end):
    if start < 0 or end < 0 or start > end:
        return {'status': 'failed - Invalid kennel number'}, 400
    kennel_data = DP.get_kennels_color(start, end)
    if kennel_data == []:
        return {'status': 'failed - Kennel not occupied'}
    else:
        return {'status': 'successful', 'data': kennel_data}

if __name__ == '__main__':
    app.run()