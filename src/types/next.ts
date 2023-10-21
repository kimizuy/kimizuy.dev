type GenerateStaticParams = () => Promise<Record<string, string>[]>;

export type InferGenerateStaticParamsType<T extends GenerateStaticParams> = {
  params: Awaited<ReturnType<T>>[number];
  searchParams?: Record<string, string | string[] | undefined>;
};
