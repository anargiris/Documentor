export const deserializeDocument = (data) => {
  if (!data) {
    return {
      sections: [],
      content: {},
    };
  }

  const sections = data.map((section) => {
    return {
      id: section.id,
      title: section.title,
      children: section.children.map((child) => {
        return {
          id: child.id,
          title: child.title,
          content: child.content,
        };
      }),
    };
  });

  const content = {};
  sections.forEach((section, sectionIndex) => {
    const sectionContentId = `section-${sectionIndex}`;
    content[sectionContentId] = section.content || "";

    section.children.forEach((child, childIndex) => {
      const childContentId = `child-${sectionIndex}-${childIndex}`;
      content[childContentId] = child.content || "";
    });
  });

  return {
    sections,
    content,
  };
};

export const expandSectionsOnRender = (array) => {
  const resultObject = {};

  for (let i = 0; i < array.length; i++) {
    resultObject[i] = true;
  }
  console.log("SECTIONS ARE", resultObject);
  return resultObject;
};
