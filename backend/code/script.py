import pandas as pd
import numpy as np
import tqdm

"""
locHist = pd.read_csv('../data/APA_AnimalLocationHistory.csv')
unique_ids = locHist['animalInternalID'].unique()
curLoc = pd.DataFrame()
for unique_id in tqdm.tqdm(unique_ids):
    max_date_start_row = locHist.loc[locHist['animalInternalID'] == unique_id].sort_values('dateStart').iloc[-1]
    curLoc = curLoc._append(max_date_start_row)
curLoc.to_csv('../data/APA_CurAnimalLocation.csv', index=False)

locHist = pd.read_csv('../data/APA_BehaviorCategoryHistory.csv')
unique_ids = locHist['animalInternalID'].unique()
curLoc = pd.DataFrame()
for unique_id in tqdm.tqdm(unique_ids):
    max_date_start_row = locHist.loc[locHist['animalInternalID'] == unique_id].sort_values('dateStart').iloc[-1]
    curLoc = curLoc._append(max_date_start_row)
curLoc.to_csv('../data/APA_CurBehaviorCategory.csv', index=False)


locHist = pd.read_csv('../data/APA_VolunteerCategoryHistory.csv')
unique_ids = locHist['animalInternalID'].unique()
curLoc = pd.DataFrame()
for unique_id in tqdm.tqdm(unique_ids):
    max_date_start_row = locHist.loc[locHist['animalInternalID'] == unique_id].sort_values('dateStart').iloc[-1]
    curLoc = curLoc._append(max_date_start_row)
curLoc.to_csv('../data/APA_CurVolunteerCategory.csv', index=False)
"""

# this part of it is for organizing data by the animal, which doesn't work
"""
locHist = pd.read_csv('../data/APA_CurAnimalLocation.csv')
locHist.dropna(subset=['locationTier4'], inplace=True)
# print(locHist)
unique_id1 = locHist[locHist['locationTier4'].str.startswith('Kennel')]['animalInternalID'].unique()
# print(unique_ids)

behvHist = pd.read_csv('../data/APA_CurBehaviorCategory.csv')
behvHist.dropna(subset=['behaviorCategory'], inplace=True)
# print(behvHist)
unique_id2 = behvHist['animalInternalID'].unique()

voluHist = pd.read_csv('../data/APA_CurVolunteerCategory.csv')
voluHist.dropna(subset=['volunteerCategory'], inplace=True)
# print(behvHist)
unique_id3 = voluHist['animalInternalID'].unique()

unique_ids = list(set(unique_id1.tolist()) & set(unique_id2.tolist()) & set(unique_id3.tolist()))
# print(len(unique_ids), len(unique_id1), len(unique_id2))
# print(unique_ids[:10])

animal_list = pd.read_csv('../data/APA_Animals.csv')

animal = pd.DataFrame()

for id in unique_ids:
    # print(id)
    if id in animal_list["animalInternalID"].tolist():
        # print("tes")
        animal = animal._append(animal_list.loc[animal_list['animalInternalID'] == id])

# print(animal)
animal["behaviorCategory"] = np.nan
animal["kennelNumber"] = np.nan
animal["volunteerColor"] = np.nan

for id in animal["animalInternalID"]:
    # print(locHist.loc[locHist['animalInternalID'] == id]['locationTier4'].str.extract(r'Kennel (\d+)').values[0][0])
    # print(animal.loc[animal["animalInternalID"] == id, 'behaviorCategory'], behvHist[behvHist['animalInternalID'] == id]['behaviorCategory'])
    animal.loc[animal["animalInternalID"] == id, 'behaviorCategory'] = behvHist.loc[behvHist['animalInternalID'] == id]['behaviorCategory'].values.tolist()[0]
    animal.loc[animal["animalInternalID"] == id, 'kennelNumber'] = locHist.loc[locHist['animalInternalID'] == id]['locationTier4'].str.extract(r'Kennel (\d+)').values[0][0]
    animal.loc[animal["animalInternalID"] == id, 'volunteerColor'] = voluHist.loc[voluHist['animalInternalID'] == id]['volunteerCategory'].values.tolist()[0]


# animal['behaviorCategory'] = behvHist.loc[behvHist['animalInternalID'].isin(unique_ids)]['behaviorCategory']
# animal['kennelNumber'] = locHist.loc[locHist['animalInternalID'].isin(unique_ids)]['locationTier4'].str.extract(r'Kennel (\d+)')

print(animal)

animal.to_csv('../data/APA_AnimalsInKennel_copy.csv', index=False)
"""

# organize by kennel
locHist = pd.read_csv('../data/APA_AnimalLocationHistory.csv')
locHist.dropna(subset=['locationTier4'], inplace=True)
locHist = locHist[locHist['locationTier4'].str.startswith('Kennel')]
unique_id1 = locHist['animalInternalID'].unique()

behvHist = pd.read_csv('../data/APA_BehaviorCategoryHistory.csv')
behvHist.dropna(subset=['behaviorCategory'], inplace=True)
unique_id2 = behvHist['animalInternalID'].unique()

voluHist = pd.read_csv('../data/APA_VolunteerCategoryHistory.csv')
voluHist.dropna(subset=['volunteerCategory'], inplace=True)
unique_id3 = voluHist['animalInternalID'].unique()

unique_ids = list(set(unique_id1.tolist()) & set(unique_id2.tolist()) & set(unique_id3.tolist()))

animal_list = pd.read_csv('../data/APA_Animals.csv')
animal_ids = animal_list["animalInternalID"].tolist()

animal = pd.DataFrame()
animal["behaviorCategory"] = np.nan
animal["kennelNumber"] = np.nan
animal["volunteerColor"] = np.nan

for id in unique_ids:
    # print(id)
    if id in animal_ids:
        # print("tes")
        animal = animal._append(animal_list.loc[animal_list['animalInternalID'] == id])
        animal_locHist = locHist[locHist['animalInternalID'] == id].sort_values('dateStart').iloc[-1]['locationTier4'].extract(r'Kennel (\d+)').values[0][0]
        animal_behvHist = behvHist[behvHist['animalInternalID'] == id].sort_values('dateStart').iloc[-1]['behaviorCategory'].values.tolist()[0]
        animal_voluHist = voluHist[voluHist['animalInternalID'] == id].sort_values('dateStart').iloc[-1]['volunteerCategory'].values.tolist()[0]
        animal.loc[animal["animalInternalID"] == id, 'behaviorCategory'] = animal_behvHist
        animal.loc[animal["animalInternalID"] == id, 'kennelNumber'] = animal_locHist
        animal.loc[animal["animalInternalID"] == id, 'volunteerColor'] = animal_voluHist


animal.to_csv('../data/APA_ByKennelData.csv', index=False)