export type Dimensions = {
	width: number,
	height: number,
};

export module ImageSize {

	/**
	 * Returns the maximum `width` and `height` of an image, considering the `wantedWidth` and `wantedHeight` constraints.
	 * @param image Provide either `image` or `ratio`.
	 * @param constraints Provide at least one `wantedXXX` constraint. The `minXXX` constraints are used as strict lower boundaries.
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
			/** Maximum desired width */
			wantedWidth?: number,
			/** Maximum desired height */
			wantedHeight?: number,
			/** Strict minimum width (will overwrite `wantedWidth` if greater) */
			minWidth?: number,
			/** Strict minimum height (will overwrite `wantedHeight` if greater) */
			minHeight?: number,
		},
		getSmallest?: boolean,
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

		// Only keep possible solutions:
		const possibleDimensions = dimensions
			.filter(dim => {
				return (
					(!wantedWidth || dim.width <= wantedWidth) &&
					(!wantedHeight || dim.height <= wantedHeight)
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