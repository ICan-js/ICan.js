import { getGestureNameFromPredict } from "./utils";

test("getClassNameFromPredict -> Classname (Amigo)", () => {
    expect(getGestureNameFromPredict([1, 0, 0])).toBe("Amigo");
});

test("getGestureNameFromPredict -> Classname (Desculpa)", () => {
    expect(getGestureNameFromPredict([0, 1, 0])).toBe("Desculpa");
});

test("getGestureNameFromPredict -> Classname (Telefone)", () => {
    expect(getGestureNameFromPredict([0, 0, 1])).toBe("Telefone");
});
