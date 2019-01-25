import { getClassNameFromPredict } from "./utils";

test("getClassNameFromPredict -> Classname (Amigo)", () => {
    expect(getClassNameFromPredict([1, 0, 0])).toBe("Amigo");
});

test("getClassNameFromPredict -> Classname (Desculpa)", () => {
    expect(getClassNameFromPredict([0, 1, 0])).toBe("Desculpa");
});

test("getClassNameFromPredict -> Classname (Telefone)", () => {
    expect(getClassNameFromPredict([0, 0, 1])).toBe("Telefone");
});
