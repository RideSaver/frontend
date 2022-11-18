/** @format */

const original =
    jest.requireActual<typeof import("@zxcvbn-ts/core")>("@zxcvbn-ts/core");

module.exports = {
    __esmodule: true,
    zxcvbn: jest.fn(original.zxcvbn),
    zxcvbnAsync: jest.fn(original.zxcvbnAsync),
    debounce: jest.fn(original.debounce),
    zxcvbnOptions: {
        ...original.zxcvbnOptions,
        setOptions: jest.fn((obj) => Object.assign(module.exports, obj)),
    },
} as Omit<typeof original, "zxcvbnOptions"> & {
    zxcvbnOptions: Partial<typeof original.zxcvbnOptions>;
};
