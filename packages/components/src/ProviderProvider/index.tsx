import React from "react";

export type ProviderProviderProps = {
    providers: ((props: {
        children: React.ReactNode;
    }) => JSX.Element)[];
};

export default function ProviderProvider({ providers }: ProviderProviderProps) {
    const Provider = providers[0];
    return (
        <Provider>
            <ProviderProvider providers={providers.slice(1)} />
        </Provider>
    );
}
