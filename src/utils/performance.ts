export const reportWebVitals = (onPerfEntry?: (metric: unknown) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export function measurePerformance(
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: unknown[]) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const end = performance.now();

    console.log(`${propertyKey} выполнен за ${end - start}ms`);

    return result;
  };

  return descriptor;
}
