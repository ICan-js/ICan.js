import { LinearRegression } from './index';


test("doRegression test -> Test result", () => {
    let linearRegression = new LinearRegression();

    // Gerando dados para testar
    let nDataset = [
        [0, 1],
        [1, 2],
        [3, 4],
        [5, 6],
        [7, 8]
    ];

    expect(linearRegression.doRegression(nDataset))
                        .toEqual({gradient: 1, intercept: 1});
});


test("inferMousePosition test -> Validate the model to predict", () => {
    let linearRegression = new LinearRegression();

    expect(() => {
        linearRegression.inferMousePosition([]);
    }).toThrow();
});


test("trainModel test -> Try train model with defined weights", () => {
    let linearRegression = new LinearRegression({}, {});

    expect(() => {
        linearRegression.trainModel([], []);
    }).toThrow();
});
