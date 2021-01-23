declare module 'json-url/dist/browser/json-url' {
    interface ICodec {
        compress: (obj: object) => Promise<string>;
        decompress: (str: string) => Promise<object>;
        stats: (
            obj: object
        ) => Promise<{ rawencoded: any; compressedencoded: any; compression: any }>;
    }

    const jsonurl: (codecName: string) => ICodec;

    export default jsonurl;
}
