declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module "*.svg" {
    const content: any;
    export default content;
}

declare module "*"{
    const content: any;
    export default content;
}

declare const __dirname: string;

