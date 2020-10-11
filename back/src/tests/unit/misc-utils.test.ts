import { MiscUtils } from "../../utils/misc.utils";

describe("MiscUtils", () => {

	describe("wildcardToRegExp()", () => {

		const testCases = [
			{
				name: "Simple case",
				pattern: `foo*`,
				string: `foobar`,
				match: true,
			},
			{
				name: "Should escape dots",
				pattern: `f.o*`,
				string: `foobar`,
				match: false,
			},
			{
				name: "Should not ignore dots",
				pattern: `f.o*`,
				string: `f.obar`,
				match: true,
			},
			{
				name: "Wildcards can be empty",
				pattern: `foo*`,
				string: `foo`,
				match: true,
			},
			{
				name: "Complex pattern",
				pattern: `http://*.wikimedia.org/*_geograph.org.uk_*`,
				string: `http://www.wikimedia.org/FOO_geograph.org.uk_/BAR`,
				match: true,
			}
		];

		testCases.forEach(testCase => {
			test(testCase.name, () => {
				const regexp = MiscUtils.wildcardToRegExp(testCase.pattern);
				const match = testCase.string.match(regexp);
				expect(!!match).toEqual(testCase.match);
			});
		});

	});

});