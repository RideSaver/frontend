import { jest } from "@jest/globals";

const storage = {};

module.exports = {
    __esmodule: true,
    default: {
        getItem: jest.fn(async (key, cb) => {
            if (key in storage) {
                cb && cb(JSON.parse(storage[key]));
                return JSON.parse(storage[key]);
            }
            throw new Error();
        }),
        setItem: jest.fn(async (key, value, cb) => {
            storage[key] = JSON.stringify(value);
            cb && cb();
            return;
        }),
    },
};
