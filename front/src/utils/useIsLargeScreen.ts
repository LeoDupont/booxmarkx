import React from "react";
import { Dimensions, ScaledSize } from "react-native";

export const LARGE_SCREEN_MIN_WIDTH = 414;

/**
 * A React hook to listen for screen size.
 * Source: https://github.com/react-navigation/react-navigation/blob/80ff5a9c543a44fa2fd7ba7fda0598f1b0d52a64/example/src/Screens/MasterDetail.tsx#L27
 */
export const useIsLargeScreen = () => {
	const [dimensions, setDimensions] = React.useState(Dimensions.get('window'));

	React.useEffect(() => {
		const onDimensionsChange = ({ window }: { window: ScaledSize }) => {
			setDimensions(window);
		};

		Dimensions.addEventListener('change', onDimensionsChange);

		return () => Dimensions.removeEventListener('change', onDimensionsChange);
	}, []);

	return dimensions.width > 414;
};
