import { getMeanGesture } from "./utils";

test("Test meanGesture function", () => {
    let gestures = [
        {
            amigo: 0.1,
            desculpa: 0.5,
            telefone: 0.4
        }, {
            amigo: 0.2,
            desculpa: 0.6,
            teleone: 0.2
        }
    ]
    expect(getMeanGesture(gestures)).toBe("Desculpa");
});
