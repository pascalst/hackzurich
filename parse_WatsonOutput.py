	
import json

with open('data_test.json') as data_file:    
    data = json.load(data_file)

vehiculeScores = {}

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
vehiculeScores["family"] = 5*int(dic["Cautiousness"]*dic["Dutifulness"]*dict["Practicality"])
vehiculeScores["Sport"] = 5*int(dic["Adventurousness"]*dic["Activity level"]*dict["Assertiveness"]*dict["Excitement-seeking"]*(1 - dict["Modesty"])*dict["Excitement"])
vehiculeScores["eco"] = 5*int(dic["Emotionality"]*dic["Authority-challenging"]*dict["Altruism"]*dict["Cooperation"])
vehiculeScores["design"] = 5*int(dic["Artistic interests"]*dic["Imagination"]*dic["Intellect"]*dic["Achievement striving"]*dic["Orderliness"]*dict["Self Expression"])
vehiculeScores["offroad"] = 5*int(dic["Adventurousness"]*(1 - dict[Self-discipline])*dict["Activity level"]*dict["Challenge"])
vehiculeScores["price"] = 5*int((1 - dic["Cautiousness"])*dic["Consevation"])

print vehiculeScores


			





        
        

    
