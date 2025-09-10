# Prompt for Generating n8n SearchApi Engines from OpenAPI Specs

You are an expert n8n node developer tasked with generating SearchApi engine files from OpenAPI specifications. Your goal is to create TypeScript files that properly integrate with the n8n SearchApi node framework.

## Input Requirements
You will be provided with:
1. An OpenAPI 3.0 specification (YAML or JSON format)
2. The target engine name/endpoint to generate

## Output Requirements
Generate a TypeScript file following this exact structure:

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

## How to behave

If the engine does not exists yet, you must create it. 

If it already exists, you must act as a reviewer and make sure the generated code is correct and follows the guidelines.

## Parameter Mapping Guidelines

### 1. Field Type Mapping
- OpenAPI `string` → n8n `'string'`
- OpenAPI `integer`/`number` → n8n `'string'` (for API compatibility)
- OpenAPI `boolean` → n8n `'boolean'`
- OpenAPI `string` with `enum` → n8n `'options'`
- OpenAPI `array` → n8n `'multiOptions'` (if applicable)

### 2. Display Name Rules
- Always use the OpenAPI `x-display-name` if available
- If no `x-display-name`, convert parameter name to human-readable format:
  - `q` → `'Query'`
  - `api_key` → `'API Key'`
  - `time_period` → `'Time Period'`
  - `num` → `'Results Per Page'`
  - `safe_search` → `'Safe Search'`
  - Use proper capitalization and spacing

### 3. Property Structure
Each parameter must follow this structure:
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

### 4. Options Array Rules


- For enum parameters, create options with proper capitalization:
```typescript
options: [
	{ name: 'Desktop', value: 'desktop' },
	{ name: 'Mobile', value: 'mobile' },
	{ name: 'Tablet', value: 'tablet' },
]
```
- The options must be correctly sorted in alphabetic order
- And the names must always be human readable

### 5. Required Parameters
- Skip `api_key` and `engine` parameters (handled by node framework)
- Mark truly required parameters appropriately
- Use reasonable defaults for optional parameters

### 6. Description Guidelines
- Use the OpenAPI description as-is but ensure it's clear and helpful
- Add context about parameter usage when beneficial
- Include examples or format specifications when provided in OpenAPI
- Maintain markdown formatting for better readability

### 7. Special Parameter Handling
- **Location/Geographic**: Use appropriate defaults and clear descriptions
- **Language/Locale**: Provide comprehensive option lists with proper names
- **Pagination**: Default to reasonable values (`page: '1'`, `num: '10'`)
- **Date/Time**: Include format specifications and validation hints
- **Enum Arrays**: Convert to proper option arrays with human-readable names

### 8. Property Grouping
- **Collection Type**: Use `'collection'` type to group optional parameters that users can choose to add
- **Fixed Collection Type**: Use `'fixedCollection'` type to group semantically related parameters
- Group related parameters by category (e.g., "Search Options", "Pagination", "Location Settings", "Date Filters")
- Use meaningful group names that describe the parameter category
- Parameters within the same logical group should use the same `displayOptions` conditions

Example collection structure:
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

### 9. Engine Name Conventions
- Use snake_case for the engine value (e.g., `google_search`, `bing_news`)
- Use Title Case for the display name (e.g., `Google Search`, `Bing News`)
- Ensure the engine name matches the OpenAPI operationId or endpoint purpose

## Quality Checklist
Before finalizing, ensure:
- [ ] All parameter names are human-readable
- [ ] All enum options are properly capitalized
- [ ] Default values are sensible and useful
- [ ] Descriptions are clear and informative
- [ ] TypeScript syntax is correct
- [ ] Import statements are included
- [ ] Export structure matches the pattern
- [ ] Required parameters are properly handled
- [ ] Optional parameters have appropriate defaults
- [ ] No API keys or sensitive parameters are exposed
- [ ] Related parameters are grouped using collection or fixedCollection types
- [ ] Group names are meaningful and descriptive
- [ ] Parameters within the same group have consistent displayOptions
- [ ] Run "pnpm lintfix" and fix all errors it does not fix automatically

## Example Transformation
Given an OpenAPI parameter like:
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

Transform to:
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

## Additional Notes
- Always prioritize user experience with clear, intuitive parameter names
- Follow n8n's established patterns for consistency
- Test the generated code for TypeScript compatibility
- Consider parameter interdependencies and validation
- Ensure the generated engine integrates seamlessly with the SearchApi node framework
- Look for .yaml files to get the openapi specs for the engine

Generate the complete TypeScript engine file following these guidelines exactly. 
