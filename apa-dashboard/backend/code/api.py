from flask import Flask
import pandas as pd

class AnimalDataProcessor:
    locHist = pd.DataFrame()

    def __init__(self):
        self.locHist = pd.read_csv('../data/APA_AnimalsInKennel.csv')

    def get_kennel(self, num):
        return self.locHist[self.locHist["kennelNumber"] == num].values.tolist()
    
    def get_kennel_range(self, startNum, endNum):
        return self.locHist[(self.locHist["kennelNumber"] >= startNum) & (self.locHist["kennelNumber"] <= endNum)].values.tolist()

DP = AnimalDataProcessor()
app = Flask(__name__)

@app.route('/')
def get_animal_location_history():
    return 'Hello, World!'

@app.route('/api/kennel/<int:kennelNumber>', methods=['GET'])
def get_kennel_data(kennelNumber):
    if kennelNumber < 0:
        return {'error': 'Invalid kennel number'}, 400
    kennel_data = DP.get_kennel(kennelNumber)
    if kennel_data == []:
        return {'error': 'Kennel not occupied'}
    else:
        return {'data': kennel_data}
    
@app.route('/api/kennel/start=<int:start>&end=<int:end>', methods=['GET'])
def get_kennels_data(start, end):
    if start < 0 or end < 0 or start > end:
        return {'error': 'Invalid start or end number'}, 400
    kennel_data = DP.get_kennels(start, end)
    if kennel_data == []:
        return {'error': 'No kennels occupied'}
    else:
        return {'data': kennel_data}

if __name__ == '__main__':
    app.run()