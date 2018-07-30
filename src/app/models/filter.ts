enum OperatorTypes { equal, notEqual, in, notIn, greaterThan, lessThan, greaterThanAndEqual, lessThanAndEqual };

export interface IFilter{
    name: string;
    value: any;
    operator: OperatorTypes;
}