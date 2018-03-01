var fs = require('fs');
var operatorModel = require('../models/operator.model.js');
var compareMethod = require('../models/compareMethod.model.js');
var ruleModel = require('../models/rule.model.js');

var operatorsMap;
var rule;
exports.readJSONFile = function(fileName, res){
    // The path to the sample folder
    var URL = './sample/' + fileName + '.json';
    fs.readFile(URL, (err, data) => {  
        if (err) {
            console.log('File not found');
            res(null);
        } else {
            res(JSON.parse(data));
        }
    });
}
exports.getOperatorsInstance = function(res) {
    if(!operatorsMap) {
        // Init operators if were not created yet
        initOperators();
    }
    res(operatorsMap);
}

exports.getRulesInstance = function(res) {
    if(!rule) {
        // Init rules if were not created yet
        initRules();
    }
    res(rule);
}

// Creating example operators 
function initOperators(){
    operatorsMap = new Map();
    // Email should not containe gmail.com
    operatorsMap.set(0, new operatorModel.Operator('0', 'email', 'gmail.com', compareMethod.CompareOperator.containes));
    // Total price shouldn't be bigger than 100
    operatorsMap.set(1, new operatorModel.Operator('1', 'total_price', 100, compareMethod.CompareOperator.biggerThan));
}

// Creating example rules
function initRules(){
    // We can change here the compare rule to AND/OR
    // We can change here the ids of the operators
    rule = new ruleModel.Rule(['0','1'], compareMethod.compareRule.or);
}