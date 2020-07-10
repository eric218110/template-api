type TPathParams = string | RegExp | (string | RegExp)[];

interface IControllerMiddleware{
    useBefore: any[];
    use: any[];
    useAfter: any[];
}

interface IControllerOptions{
    path: TPathParams;
    routingOptions: any;
    middleware?: IControllerMiddleware
}

export function Controller (options: TPathParams | IControllerOptions): Function {
  return (target: any): void => {
    console.log(options, target);
  };
}
