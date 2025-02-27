type BuildMode = 'production' | 'development';

export interface BuildEnv {
    mode: BuildMode;
    port: number;
}

export interface BuildPaths {
    entry: string;
    build: string;
    html: string;
    src: string;
    favicon: string;
}

export interface BuildOptions {
    paths: BuildPaths;
    mode: BuildMode;
    port: number;
    isDev: boolean;
}
