const caseInsensitiveStringGen = (text: string) => {
  return new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
};

export default caseInsensitiveStringGen;
