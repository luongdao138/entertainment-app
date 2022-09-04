export function trimData(data: any) {
  let new_data: any = {};
  Object.keys(data).map((key) => {
    const value = data[key];
    if (typeof value === 'string') {
      new_data[key] = value.trim();
    } else {
      new_data[key] = value;
    }
  });

  return new_data;
}
