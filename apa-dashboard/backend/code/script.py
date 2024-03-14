import pandas as pd
import tqdm

locHist = pd.read_csv('../data/APA_AnimalLocationHistory.csv')
unique_ids = locHist['animalInternalID'].unique()
curLoc = pd.DataFrame()
for unique_id in tqdm.tqdm(unique_ids):
    max_dateEnd_row = locHist.loc[locHist['animalInternalID'] == unique_id].dropna(subset=['dateEnd']).sort_values('dateEnd', ascending=False).head(1)
    curLoc = curLoc._append(max_dateEnd_row)
curLoc.to_csv('../data/APA_CurAnimalLocation.csv', index=False)