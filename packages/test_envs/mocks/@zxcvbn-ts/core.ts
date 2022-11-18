/** @format */

module.exports =
    jest.requireActual<typeof import("@zxcvbn-ts/core")>("@zxcvbn-ts/core");

Object.entries<typeof import("@zxcvbn-ts/core").zxcvbnOptions>(
    module.exports.zxcvbnOptions
)
    .filter(([, value]) => typeof value === "function")
    .map((ent) => ent as unknown as [string, (...args) => unknown])
    .forEach(([key, value]) => {
        module.exports.zxcvbnOptions[key] = value.bind(
            module.exports.zxcvbnOptions
        );
    });

Object.entries<typeof import("@zxcvbn-ts/core")>(module.exports)
    .filter(([, value]) => typeof value === "function")
    .map((ent) => ent as unknown as [string, (...args) => unknown])
    .forEach(([key, value]) => {
        module.exports[key] = value.bind(module.exports);
    });
