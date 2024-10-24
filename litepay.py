import subprocess, pymongo, requests
pays = pymongo.MongoClient()['JalusPay']['pays']
pays.create_index(['date', 'src', 'dst', 'value'])  # pas bayad date khodesh bashe
while True: pass
    # TODO get all sms
    # TODO hamon code haye sms(date, src, dst, value)
    # TODO if not in db
    # TODO get request to /pay/
    # TODO status is 200
    # TODO insert to db