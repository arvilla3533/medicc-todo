export const paths = {
  home: "/",
  public: {
    login: "/login",
  },
  app: {
    todo: "/todo",
  },
} as const;

const getAllValues = (object: object): string[] => {
  const values: string[] = [];

  const traverseObject = (obj: object) => {
    for (const value of Object.values(obj)) {
      if (typeof value === "object" && value !== null) {
        traverseObject(value);
      } else if (value) {
        // Filter out empty strings
        values.push(value);
      }
    }
  };

  traverseObject(object);

  return values;
};

export const publicPaths = getAllValues(paths.public);
