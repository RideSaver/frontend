import React from "react";
import PropTypes, { InferProps } from "prop-types";

export default function ProviderProvider({
    providers,
}: InferProps<typeof ProviderProvider.propTypes>) {
    return ({ children }) =>
        providers.reduceRight(
            (children, provider) =>
                React.createElement(
                    typeof provider == "object" ? provider.provider : provider,
                    typeof provider == "object" ? provider.options : {},
                    ...children
                ),
            children
        );
}

ProviderProvider.propTypes = {
    children: PropTypes.node.isRequired,
    providers: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.elementType,
            PropTypes.shape({
                provider: PropTypes.elementType.isRequired,
                options: PropTypes.object,
            }).isRequired,
        ]).isRequired
    ).isRequired,
};

export type ProviderProviderProps = InferProps<typeof ProviderProvider.propTypes>;
