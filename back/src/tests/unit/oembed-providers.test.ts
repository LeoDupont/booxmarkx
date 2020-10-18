import { FlickrProvider } from "../../utils/oembed/providers/flickr.provider";
import { ProvidersManager } from "../../utils/oembed/providers/providers-manager";
import { VimeoProvider } from "../../utils/oembed/providers/vimeo.provider.ts";

describe("oEmbed Providers", () => {

	describe("Providers can process their own URL schemes", () => {

		const flickr = new FlickrProvider();
		const vimeo = new VimeoProvider();

		const schemeTestCases = [

			// === Flickr ===
			{
				provider: flickr,
				scheme: "http://*.flickr.com/photos/*",
				url: "http://www.flickr.com/photos/andrzej_kocot/50440780728/in/explore-2020-10-10/",
				canProcess: true,
				objectMatch: { title: "Sunrise over the Castle" },
			},
			{
				provider: flickr,
				scheme: "https://*.flickr.com/photos/*",
				url: "https://www.flickr.com/photos/andrzej_kocot/50440780728/in/explore-2020-10-10/",
				canProcess: true,
				objectMatch: { title: "Sunrise over the Castle" },
			},
			{
				provider: flickr,
				scheme: "http://flic.kr/p/*",
				url: "http://flic.kr/p/2jRhbMf",
				canProcess: true,
				objectMatch: { title: "Sunrise over the Castle" },
			},
			{
				provider: flickr,
				scheme: "https://flic.kr/p/*",
				url: "https://flic.kr/p/2jRhbMf",
				canProcess: true,
				objectMatch: { title: "Sunrise over the Castle" },
			},

			// === Vimeo ===
			{
				provider: vimeo,
				scheme: "https://vimeo.com/*",
				url: "https://vimeo.com/303825760",
				canProcess: true,
				objectMatch: { title: "The HU - Yuve Yuve Yu The Mongolian Metal Band" },
			},
		];

		schemeTestCases.forEach(testCase => {
			test(`[${testCase.provider.NAME}] scheme: "${testCase.scheme}" => ${testCase.canProcess ? 'ok' : 'ko'}`, async () => {

				const canProcess = testCase.provider.canProcessUrl(testCase.url);
				const oEmbed = await testCase.provider.getMediaInfo(testCase.url);

				expect(canProcess).toBe(testCase.canProcess);
				expect(oEmbed).toMatchObject(testCase.objectMatch);
			});
		});
	});

	describe("ProvidersManager can select the appropriate Provider", () => {

		const testCases = [
			// Flickr OK:
			{
				testName: "Flickr => can process",
				url: "https://www.flickr.com/photos/khrimages/50439905248/in/explore-2020-10-10/",
				canProcess: true,
				objectMatch: { title: "Red Squirrel" },
			},
			// Vimeo OK:
			{
				testName: "Vimeo => can process",
				url: "https://vimeo.com/channels/staffpicks/65107797",
				canProcess: true,
				objectMatch: { title: "Omelette" },
			},
			// Unprocessable:
			{
				testName: "YouTube => cannot process",
				url: "https://www.youtube.com/watch?v=uzuYpEURrTM",
				canProcess: false,
				objectMatch: {},
			},
		];

		testCases.forEach(testCase => {
			test(testCase.testName, async () => {
				if (testCase.canProcess) {
					// Processable:
					const provider = ProvidersManager.selectProviderForUrl(testCase.url);
					const oEmbed = await ProvidersManager.getMediaInfo(testCase.url, provider);
					expect(oEmbed).toMatchObject(testCase.objectMatch);
				}
				else {
					// Unprocessable:
					expect(() => {
						ProvidersManager.selectProviderForUrl(testCase.url);
					}).toThrow();
				}
			});
		});
	});

});