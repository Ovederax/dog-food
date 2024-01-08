export function objectHasProperty<T, K extends PropertyKey>(
	obj: T,
	prop: K
): obj is T & Record<K, unknown> {
	if (!obj) {
		return false;
	}
	return Object.prototype.hasOwnProperty.call(obj, prop);
}
