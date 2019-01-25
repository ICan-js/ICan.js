import { mean, median } from "./index";

test("Stats test -> Test mean function (3 elements in array)", () => {
    expect(mean([1, 2, 3])).toBe(2);
});

test("Stats test -> Test mean function (4 elements in array)", () => {
    expect(mean([1, 2, 3, 4])).toBe(2.5);
});

test("Stats test -> Test median function (3 elements in array)", () => {
    expect(median([1, 2, 3])).toBe(2);
});

test("Stats test -> Test median function (4 elements in array)", () => {
    expect(median([1, 2, 3, 4])).toBe(2.5);
});
