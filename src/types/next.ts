type GenerateStaticParams = () => Promise<{ [key: string]: string }[]>;

export type InferGenerateStaticParamsType<T extends GenerateStaticParams> = {
  params: Awaited<ReturnType<T>>[number];
  searchParams?: { [key: string]: string | string[] | undefined };
};
