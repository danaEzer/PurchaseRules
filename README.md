# PurchaseRules
1. Run npm i
2. Run npm start

You can use the following request in order to preforme a Purchase object vaidation:
URL: http://localhost:3000/rules
Method: POST
Header: [{"key":"Content-Type":"application/json"}]
Body: 
{
	"fileName": "fileName"
}

Body example a: 
{
	"fileName": ["1","2","3","4","5","6","7","8", "9", "10", "11", "12", "13"]
}

Body example b: 
{
	"fileName": "1"
}

The response will contain if the object is valid or not (true for valid).
