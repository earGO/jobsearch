function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function capitlizeObjectKeys(object) {
	var isArray = Array.isArray(object);
	for (let key in object) {
		let value = object[key];
		let newKey = key;
		if (!isArray) {
			delete object[key];
			newKey = capitalizeFirstLetter(key);
		}
		let newValue = value;
		if (typeof value === 'object') {
			newValue = capitlizeObjectKeys(value);
		}
		object[newKey] = newValue;
	}
	return object;
}

export default capitlizeObjectKeys;
