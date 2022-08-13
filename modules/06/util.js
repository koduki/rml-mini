export const $ = (type, value = null) => {
  return { type: type, value: value };
};

export function deep_copy(xs) {
  return JSON.parse(JSON.stringify(xs));
}

export const show_tree = (tree) => {
  const _blank = (size) => {
    let blank = "";
    for (let i = 0; i < size; i++) {
      blank += "  ";
    }
    return blank;
  };
  const _show = (tree, indent) => {
    if (Array.isArray(tree)) {
      for (let i = 0; i < tree.length; i++) {
        console.log(_blank(indent) + "[");
        _show(tree[i], indent + 1);
        console.log(_blank(indent) + "],");
      }
    } else {
      const obj = `{type: "${tree.type}", value: ${tree.value}}`;
      console.log(_blank(indent) + obj);
    }
  };
  _show(tree, 0);
};
