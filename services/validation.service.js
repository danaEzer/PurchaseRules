var compareMethod = require('../models/compareMethod.model.js');
var dataService = require('../services/data.service.js');

exports.isValidPurchase = function(purchaseObj, rule, res) {     
    dataService.getOperatorsInstance(function(operatorsMap){
        var results = []
        for (let i = 0; i < rule.operatorsIds.length; i++) {
            if(!operatorsMap.get(Number(rule.operatorsIds[i]))){
                return true;
            }
            const operator = operatorsMap.get(Number(rule.operatorsIds[i]));
            if(!operator.propertyName || !operator.value || !purchaseObj[operator.propertyName]) {
                continue;
            }
            results.push(validateOperator(purchaseObj[operator.propertyName], operator.value, operator.compareMethod));
        }
        res(validateRule(rule.compareMethod, results));
    });
    
}

function validateRule(ruleType, results){
   switch (ruleType) {
        case 1:
            return results.every(result => result);
        case 2:
            return results.some(result => result);
       default:
           return true;
   }
}

function validateOperator(propertyValue, compareValue, compareMethod){    
    switch(compareMethod) {
        case 1:
            return propertyValue.includes(compareValue);
        case 2:
            return (propertyValue > compareValue);
        default:
            return true;
    }
}
