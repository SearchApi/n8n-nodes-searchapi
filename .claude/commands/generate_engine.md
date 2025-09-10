# Generate n8n SearchApi Engine Command

## Overview
You are an expert n8n node developer tasked with generating SearchApi engine files from OpenAPI specifications. Your goal is to create TypeScript files that properly integrate with the n8n SearchApi node framework.

**⚠️ CRITICAL REQUIREMENT**: You MUST run lint checks on the generated file before completing this task. The file MUST pass all lint checks.

---

## Task Workflow

### 1. Input Analysis
You will receive:
- An OpenAPI 3.0 specification (YAML or JSON format) 
- The target engine name/endpoint to generate
- Look for .yaml files to get the openapi specs for the engine

### 2. Behavior Rules
- **If engine doesn't exist**: Create it from scratch
- **If engine already exists**: Act as a reviewer and ensure the code follows all guidelines

### 3. Final Validation (MANDATORY)
1. Run `pnpm lint` to check for any linting errors
2. If there are errors, run `pnpm lintfix` to automatically fix what can be fixed
3. Manually fix any remaining errors that couldn't be auto-fixed
4. Ensure the file passes all lint checks before completing the task

**DO NOT stop until the engine file passes all lint checks.**

---

## Code Structure Requirements

### TypeScript File Template
```typescript
import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['{engine_name}'],
	},
};

const resource: INodePropertyOptions = { 
	name: '{Human Readable Engine Name}', 
	value: '{engine_name}' 
};

const properties: INodeProperties[] = [
	// Generated properties array (use collection/fixedCollection for grouping when appropriate)
];

export const {engine_name} = {
	resource,
	properties,
};
```

### Property Structure Template
```typescript
{
	displayName: 'Human Readable Name',
	name: 'parameter_name',
	type: 'string' | 'options' | 'boolean' | 'multiOptions',
	required: false, // true if the value is required, false if not
	default: 'default_value',
	description: 'Clear, helpful description from OpenAPI',
	options: [], // For non-options types, empty array
	displayOptions,
	routing: {
		request: {
			qs: {
				parameter_name: '={{$value}}',
			},
		},
	},
}
```

---

## Parameter Mapping Rules

### Type Mappings
| OpenAPI Type | n8n Type | Notes |
|--------------|----------|-------|
| `string` | `'string'` | Basic text input |
| `integer` | `'string'` | For API compatibility |
| `number` | `'string'` | For API compatibility |
| `boolean` | `'boolean'` | Checkbox input |
| `string` with `enum` | `'options'` | Dropdown selection |
| `array` | `'multiOptions'` | If applicable |

### Display Name Conventions
- **Priority**: Use OpenAPI `x-display-name` if available
- **Fallback**: Convert parameter names to human-readable format
  
Common conversions:
- `q` → `'Query'`
- `api_key` → `'API Key'`
- `time_period` → `'Time Period'`
- `num` → `'Results Per Page'`
- `safe_search` → `'Safe Search'`
- `video_id` → `'Video ID'`
- Always use proper capitalization and spacing

### Engine Naming Rules
- **Value**: Use snake_case (e.g., `google_search`, `bing_news`, `youtube_transcripts`)
- **Display Name**: Use Title Case (e.g., `Google Search`, `Bing News`, `YouTube Transcripts`)
- Must match the OpenAPI operationId or endpoint purpose

---

## Special Parameter Handling

### Excluded Parameters
Skip these parameters (handled by node framework):
- `api_key`
- `engine`

### Required vs Optional Parameters
- Mark truly required parameters with `required: true`
- Use reasonable defaults for optional parameters
- Optional parameters should have sensible `default` values

### Options/Enum Parameters
```typescript
options: [
	{ name: 'Desktop', value: 'desktop' },
	{ name: 'Mobile', value: 'mobile' },
	{ name: 'Tablet', value: 'tablet' },
]
```
Requirements:
- Options must be sorted alphabetically by name
- Names must be human-readable with proper capitalization
- Values should match the API's expected format

### Parameter Grouping
Use collections to group related parameters:

#### Collection Type (for optional parameter groups)
```typescript
{
	displayName: 'Search Options',
	name: 'searchOptions',
	type: 'collection',
	placeholder: 'Add Search Option',
	default: {},
	options: [
		// Related parameters go here
	],
	displayOptions,
}
```

#### Fixed Collection Type (for required parameter groups)
```typescript
{
	displayName: 'Required Settings',
	name: 'requiredSettings',
	type: 'fixedCollection',
	default: {},
	options: [
		// Related parameters go here
	],
	displayOptions,
}
```

Group categories examples:
- "Search Options"
- "Pagination"
- "Location Settings"
- "Date Filters"
- "Transcript Options"
- "Advanced Settings"

---

## Content Guidelines

### Descriptions
- Use the OpenAPI description as-is when clear and helpful
- Add context about parameter usage when beneficial
- Include format specifications when provided
- Maintain markdown formatting for readability
- End descriptions with periods for consistency

### Default Values
Common defaults by type:
- Pagination: `page: '1'`, `num: '10'`
- Language: `'en'`
- Boolean flags: `false`
- Location: Appropriate regional defaults

---

## Quality Checklist

Before finalizing, verify:

### Code Quality
- [ ] TypeScript syntax is correct
- [ ] Import statements are included
- [ ] Export structure matches the pattern
- [ ] No TypeScript errors

### Parameter Quality
- [ ] All parameter names are human-readable
- [ ] All enum options are properly capitalized and sorted
- [ ] Default values are sensible and useful
- [ ] Descriptions are clear and informative
- [ ] Required parameters are properly marked
- [ ] Optional parameters have appropriate defaults

### Structure Quality
- [ ] Related parameters are grouped using collections
- [ ] Group names are meaningful and descriptive
- [ ] Parameters within groups have consistent displayOptions
- [ ] No API keys or sensitive parameters are exposed

### Linting (MANDATORY)
- [ ] Run `pnpm lint` - no errors
- [ ] Run `pnpm lintfix` if needed
- [ ] All lint errors resolved

---

## Example Transformation

### OpenAPI Input:
```yaml
device:
  name: device
  in: query
  required: false
  description: "The device type for the search"
  schema:
    type: string
    enum: [desktop, mobile, tablet]
    default: desktop
  x-display-name: "Device Type"
```

### n8n Output:
```typescript
{
	displayName: 'Device Type',
	name: 'device',
	type: 'options',
	default: 'desktop',
	description: 'The device type for the search',
	options: [
		{ name: 'Desktop', value: 'desktop' },
		{ name: 'Mobile', value: 'mobile' },
		{ name: 'Tablet', value: 'tablet' },
	],
	displayOptions,
	routing: {
		request: {
			qs: {
				device: '={{$value}}',
			},
		},
	},
}
```

---

## Completion Criteria

The task is **ONLY** complete when:

1. ✅ The engine file has been generated or reviewed
2. ✅ `pnpm lint` has been run on the file
3. ✅ All linting errors have been fixed
4. ✅ The file passes all lint checks without errors

**🛑 STOP**: Do NOT mark this task as complete until the lint check passes!

---

## Additional Notes

- Prioritize user experience with clear, intuitive parameter names
- Follow n8n's established patterns for consistency
- Test the generated code for TypeScript compatibility
- Consider parameter interdependencies and validation
- Ensure the generated engine integrates seamlessly with the SearchApi node framework
- To save tokens, when reading the yaml files, you can read everything that is inside the "parameters" key, and everything that is inside the "request" key. As it is the only thing that is needed to generate the engine.
