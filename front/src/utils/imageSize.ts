export type Dimensions = {
	width: number,
	height: number,
};

export module ImageSize {

	/**
	 * Returns the maximum `width` and `height` of an image, considering the `wantedWidth` and `wantedHeight` constraints.
	 * @param image Provide either `image` or `ratio`.
	 * @param constraints Provide at least one constraint.
	 * @param getSmallest If we want to get the smallest possible dimensions. Returns the largest otherwise.
	 */
	export function getDimensions(
		image: {
			/** Only used to calculate `aspectRatio` */
			dims?: Dimensions,
			/** Mandatory if `image` dimensions are not provided */
			ratio?: number,
		},
		constraints: {
			wantedWidth?: number,
			wantedHeight?: number,
			minWidth?: number,
			minHeight?: number,
		},
		getSmallest?: boolean,
		// strict?: boolean,
	) {
		// Aspect ratio:
		let { dims, ratio } = image;
		if (!ratio) {
			if (!dims) {
				throw new Error("[imageSize] Please provide either `image` or `ratio` to `imageDims` param.");
			}
			ratio = dims.width / dims.height;
		}

		// Check constraints:
		let { wantedWidth, wantedHeight, minWidth, minHeight } = constraints;

		// Normalize wanted dimensions:
		if (wantedWidth && minWidth && wantedWidth < minWidth) {
			wantedWidth = minWidth;
		}
		if (wantedHeight && minHeight && wantedHeight < minHeight) {
			wantedHeight = minHeight;
		}

		// if (!strict && wantedWidth && minWidth && wantedWidth < minWidth) {
		// 	if (getSmallest) { minWidth = wantedWidth; }
		// 	else { wantedWidth = minWidth; }
		// }
		// if (!strict && wantedHeight && minHeight && wantedHeight < minHeight) {
		// 	if (getSmallest) { minHeight = wantedHeight; }
		// 	else { wantedHeight = minHeight; }
		// }

		// Compute sizes:
		const dimensions: Dimensions[] = [];
		if (wantedWidth) {
			dimensions.push({
				width: wantedWidth,
				height: heightFromWidth(wantedWidth, ratio),
			});
		}
		if (wantedHeight) {
			dimensions.push({
				width: widthFromHeight(wantedHeight, ratio),
				height: wantedHeight,
			});
		}
		// if (minWidth) {
		// 	dimensions.push({
		// 		width: minWidth,
		// 		height: heightFromWidth(minWidth, ratio),
		// 	});
		// }
		// if (minHeight) {
		// 	dimensions.push({
		// 		width: widthFromHeight(minHeight, ratio),
		// 		height: minHeight,
		// 	});
		// }

		// Only keep possible solutions:
		const possibleDimensions = dimensions
			.filter(dim => {
				return (
					(!wantedWidth || dim.width <= wantedWidth) &&
					// (!minWidth || dim.width >= minWidth) &&
					(!wantedHeight || dim.height <= wantedHeight)
					// (!minHeight || dim.height >= minHeight)
				);
			})
			.sort((dim1, dim2) => {
				if (dim1.width > dim2.width) { return 1; }
				if (dim1.width < dim2.width) { return -1; }
				return 0;
			});
		;

		if (possibleDimensions.length < 1) {
			console.warn("[imageSize] Pre-error dump:",
				{ image, constraints, dimensions: dims, possibleDimensions },
				// { newConstraints: { wantedWidth, minWidth, wantedHeight, minHeight } }
			);
			throw new Error("[imageSize] Impossible to respect constraints");
		}

		// Return one solution:
		if (getSmallest) {
			return possibleDimensions[0];
		}
		return possibleDimensions[possibleDimensions.length - 1];
	}

	export function widthFromHeight(height: number, ratio: number) {
		return height * ratio;
	}
	export function heightFromWidth(width: number, ratio: number) {
		return width / ratio;
	}

}