import { DateUtils } from "./date-utils";
import { ObjectType } from "./objtype.enum";

/**
 * Trim 
 */
export class TrimObject {

	/** this helper checks, that string has only white spaces. */
	private static hasOnlySpaces(str: string): boolean {
		if (!str) return false;
		if (str.length === 0) return false;
		for (let index = 0; index < str.length; index++) if (str[index] !== ' ') return false;
		return true;
	}

	/**
	 * Remove empty properties form object.
	 */
	public static trimProps(obj: any): any {

		Object.keys(obj).forEach((key) => {

			const value = obj[key];

			if (value === null || value === '') {
				delete obj[key];
				if (!Object.keys(obj) || Object.keys(obj).length === 0) return null;
				return obj;
			}

			switch (value.constructor.name) {

				case ObjectType.Date: obj[key] = DateUtils.convertDateToUTC(value); break;
				case ObjectType.Object: obj[key] = this.trimProps(value as any); break;
				case ObjectType.String: {
					if (this.hasOnlySpaces(value)) delete obj[key];
					if (obj[key]) obj[key] = value.trim(); break;
				}

				case ObjectType.Array:
					
					const arr = value as Array<any>;

					console.dir(arr);
					console.dir(arr.length);

					if (!arr || arr.length === 0) {
						delete obj[key];
						break;
					}

					if (arr.length === 1 && arr[0] === null ) { delete obj[key];
						break;}

					for (let index = 0; index < arr.length; index++) {
						if (arr[index].constructor.name) {
							switch (arr[index].constructor.name) {
								case ObjectType.Object:
								case ObjectType.Array:
									arr[index] = this.trimProps(arr[index]);
									break;
								case ObjectType.String:
									if (!arr[index] || arr[index] === '') arr.splice(index, 1)
									// delete arr[index];
									break;
							}
						}
					}

					break;
				default: break;
			}
		});

		if (!Object.keys(obj) || Object.keys(obj).length === 0) return null;

		return obj;
	}
}
