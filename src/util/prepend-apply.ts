/**
 * Utility function which takes a string and returns a trimmed version of it
 * with `@apply` at the start.
 *
 * Returns the provided string if `@apply` is already present
 * at the beginning of the string.
 *
 * @param {string} style
 * @returns Style string guaranteed to start with `@apply`
 */
export const prependApply = (style: string) => {
	const trimmed = style.trim();
	if (!trimmed.startsWith('@apply')) {
		return '@apply ' + trimmed;
	}

	return style;
};
