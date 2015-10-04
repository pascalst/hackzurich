	
import json

with open('data_test.json') as data_file:    
    data = json.load(data_file)

dic = {}

root = data["tree"]["children"]  


# Every feature is matched to its percentage 
for category in root[0]["children"][0]["children"]:
	for feature in category["children"]:
         dic[feature["name"]]=feature["percentage"]
for i in range(1,3) :
    for feature in root[i]["children"][0]["children"]:
         dic[feature["name"]]=feature["percentage"]	

# Match personality types to vehicule features

vehiculeScores = {
	"family" : 100*(dic["Cautiousness"]+dic["Dutifulness"])/2,
	"sport" : 100*(dic["Adventurousness"]+dic["Activity level"]+dic["Assertiveness"]+dic["Excitement-seeking"]+(1 - dic["Modesty"])+dic["Excitement"])/6,
    "eco" : 100*(dic["Emotionality"]+dic["Authority-challenging"]+dic["Altruism"]+dic["Cooperation"])/4,
    "design" : 100*(dic["Artistic interests"]+dic["Imagination"]+dic["Intellect"]+dic["Achievement striving"]+dic["Orderliness"])/5,
    "offroad" : 100*(dic["Adventurousness"]+(1 - dic["Self-discipline"])+dic["Activity level"])/3,
    "price" : 100*(1 - dic["Cautiousness"]),
}

for item in vehiculeScores :
    if vehiculeScores[item] >= 80 :
        vehiculeScores[item] = 5
    elif vehiculeScores[item] >= 60 :
        vehiculeScores[item] = 4 
    elif vehiculeScores[item] >= 40 :
        vehiculeScores[item] = 3 
    elif vehiculeScores[item] >= 20 :
        vehiculeScores[item] = 2
    else :
        vehiculeScores[item] = 1       
            

#print vehiculeScores
print vehiculeScores




			





        
        

    
