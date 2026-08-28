const prop = (node, name) =>
  node.properties.find((p) => p.type === 'Property' && (p.key.name === name || p.key.value === name));

const literal = (node, name) => {
  const p = prop(node, name);
  return p && p.value.type === 'Literal' ? p.value.value : undefined;
};

const optionValuesUnique = {
  meta: {
    type: 'problem',
    docs: { description: 'Options arrays must not repeat a value' },
    schema: [],
  },
  create(context) {
    return {
      'Property[key.name="options"] > ArrayExpression, ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > ArrayExpression'(
        node,
      ) {
        const seen = new Map();
        for (const el of node.elements) {
          if (el?.type !== 'ObjectExpression') continue;
          const value = literal(el, 'value');
          if (value === undefined) continue;
          if (seen.has(value)) {
            context.report({ node: el, message: `Duplicate option value '${String(value)}'` });
          }
          seen.set(value, true);
        }
      },
    };
  },
};

const defaultMatchesDescription = {
  meta: {
    type: 'problem',
    docs: { description: 'A numeric default must match the default documented in the description' },
    schema: [],
  },
  create(context) {
    return {
      ObjectExpression(node) {
        const description = literal(node, 'description');
        const dflt = literal(node, 'default');
        if (typeof description !== 'string' || typeof dflt !== 'number') return;
        const match = /defaults? (?:to |is |: ?)(\d+)/i.exec(description);
        if (!match) return;
        const documented = Number(match[1]);
        if (documented !== dflt) {
          context.report({
            node: prop(node, 'default').value,
            message: `default is ${dflt} but the description says the default is ${documented}`,
          });
        }
      },
    };
  },
};

const noRequiredMutuallyExclusive = {
  meta: {
    type: 'problem',
    docs: { description: 'Params described as mutually exclusive or conditional cannot be required' },
    schema: [],
  },
  create(context) {
    return {
      ObjectExpression(node) {
        if (literal(node, 'required') !== true) return;
        const description = literal(node, 'description');
        if (typeof description !== 'string') return;
        if (/cannot be used together|mutually exclusive|only one of|optional (?:when|if)/i.test(description)) {
          context.report({
            node: prop(node, 'required'),
            message: 'Param is described as mutually exclusive or conditional; required: true would block valid requests',
          });
        }
      },
    };
  },
};

const enginePropertyDisplayOptions = {
  meta: {
    type: 'problem',
    docs: { description: 'Every top-level engine property must scope itself with displayOptions' },
    schema: [],
  },
  create(context) {
    const source = context.sourceCode;
    return {
      'VariableDeclarator[id.name="properties"] > ArrayExpression'(node) {
        for (const el of node.elements) {
          if (!el) continue;
          if (el.type === 'ObjectExpression' && prop(el, 'displayOptions')) continue;
          if (source.getText(el).includes('displayOptions')) continue;
          context.report({
            node: el,
            message: 'Top-level engine property has no displayOptions; it would show for every engine',
          });
        }
      },
    };
  },
};

const zeroDefaultNeedsGuard = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'A number param defaulting to 0 sends a literal 0 to the API unless routing guards with {{$value || ""}} or the API default really is 0',
    },
    schema: [],
  },
  create(context) {
    const source = context.sourceCode;
    return {
      ObjectExpression(node) {
        if (literal(node, 'type') !== 'number' || literal(node, 'default') !== 0) return;
        const typeOptions = prop(node, 'typeOptions');
        if (typeOptions?.value.type === 'ObjectExpression' && literal(typeOptions.value, 'minValue') === 0) return;
        const description = literal(node, 'description');
        if (typeof description === 'string' && /defaults? (?:to |is |: ?)0\b/i.test(description)) return;
        const routing = prop(node, 'routing');
        if (!routing || source.getText(routing).includes('$value ||')) return;
        context.report({
          node: prop(node, 'default'),
          message:
            'default: 0 is sent to the API as a real value; guard routing with {{$value || ""}}, document that 0 is the API default, or drop the 0 default',
        });
      },
    };
  },
};

export default {
  rules: {
    'option-values-unique': optionValuesUnique,
    'default-matches-description': defaultMatchesDescription,
    'no-required-mutually-exclusive': noRequiredMutuallyExclusive,
    'engine-property-display-options': enginePropertyDisplayOptions,
    'zero-default-needs-guard': zeroDefaultNeedsGuard,
  },
};
