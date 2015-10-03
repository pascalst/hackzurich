import json
import requests

#access token needs to be dynamic
r = requests.get('https://graph.facebook.com/v2.3/me/outbox?access_token=CAACEBABTL9cKol3OFxuyf19dDyXAdeZAaOWzihjZCNw5GIx4vbI4Lp6LZBbjJUX3WbdSHt6OffxpfuIfaeyWnN27RRZBuHIC6CxITzHU2E3rygyh60wlwZAX4h8C8lIjAgxYf46Hey4CHh1PxteZAkwL757huuvNJ6bOd33sOGp0enLRKN9cL346t7uAhZCzTd2aZBwZDZD')


json.loads(r.text)
f = open('data.json', 'w')

jfile = json.loads(f)


jfile['data'][0]['comments'][0]


