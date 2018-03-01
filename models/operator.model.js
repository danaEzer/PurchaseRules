exports.Operator = class Operator {
  constructor(id, propertyName, value, compareMethod) {
    this.id = id;
    this.propertyName = propertyName;
    this.value = value;
    this.compareMethod = compareMethod;
  }
}

