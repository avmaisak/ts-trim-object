export class DateUtils {
	static convertDateToUTC(date: Date): Date {
		return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()))
	}
}
