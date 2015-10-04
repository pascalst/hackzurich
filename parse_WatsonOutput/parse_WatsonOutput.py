	
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
	"family" : 5*int(dic["Cautiousness"]*dic["Dutifulness"]*dic["Practicality"])
	"port" : 5*int(dic["Adventurousness"]*dic["Activity level"]*dic["Assertiveness"]*dic["Excitement-seeking"]*(1 - dic["Modesty"])*dic["Excitement"])
    "eco" : 5*int(dic["Emotionality"]*dic["Authority-challenging"]*dic["Altruism"]*dic["Cooperation"])
    "design" : 5*int(dic["Artistic interests"]*dic["Imagination"]*dic["Intellect"]*dic["Achievement striving"]*dic["Orderliness"]*dic["Self Expression"])
    "offroad"] : 5*int(dic["Adventurousness"]*(1 - dic[Self-discipline])*dic["Activity level"]*dic["Challenge"])
    "price" : 5*int((1 - dic["Cautiousness"])*dic["Consevation"])
}



print vehiculeScores



			





        
        

    
