var validationService = require('../services/validation.service.js');
var dataService = require('../services/data.service.js');

// POST - verify one file or multiple files. 
// Input: A JSON with a fileName property. fileName should be a one file name or a list of files names
// If the return value is True then it means that the purchase object is valid
exports.verifyPurchase = function(req, res) {
    if(req.body.fileName){
        if(Array.isArray(req.body.fileName)){
            multiFiles(req.body.fileName, function(results){
                res.status(200).send({resultsValue: results});
            });
        } else {
            validateObj(req.body.fileName, function(isValid){
                res.status(200).send({resultValue: isValid});
            });
        }
    } else{
        res.status(200).send({resultValue: "No purchase object"});
    }
    
};

// GET - Getting all the existing operators
exports.gettingOperators = function(req, res) {
    dataService.getOperatorsInstance(function(operatorsMap){
        res.json([...operatorsMap]);
    });
}

// Validate multiple purchase Obj
function multiFiles(files, res){
    // Validate each file using the validateObj method
    var resultsPromise = files.map(fileName => {
        return new Promise((resolve) => {
            validateObj(fileName, function(isValid){
                resolve(isValid);
            });
        });
    });
    // When all files were validated then return all the results
    Promise.all(resultsPromise).then(allResults => {
        res(allResults);
    } );
}
// Validate one purchase Obj
function validateObj(fileName, res){
    dataService.readJSONFile(fileName, function(purchaseObj){
        if(!purchaseObj){
            res.status(200).send({message: "file was not found"});
        } else{
            rule = dataService.getRulesInstance(function(rule){
                var results = validationService.isValidPurchase(purchaseObj, rule, function(isValid){
                    res(isValid);
                });
            });
        }
    });
}