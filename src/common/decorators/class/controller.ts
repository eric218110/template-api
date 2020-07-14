function formatPrefix (prefix: string): string {
  const char = prefix.substring(0, 1);

  if (char === '/') {
    return prefix;
  }

  return '/' + prefix;
}

export const Controller = (prefix: string): ClassDecorator => {
  return (TargetClass: any) => {
    prefix = formatPrefix(prefix);
    Reflect.defineMetadata('prefix', prefix, TargetClass);
    if (!Reflect.hasMetadata('routes', TargetClass)) {
      Reflect.defineMetadata('routes', [], TargetClass);
    }
  };
};
