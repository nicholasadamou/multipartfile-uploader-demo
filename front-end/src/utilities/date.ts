import moment from 'moment';

export function convertDate(date: Date, tzAbbr: string, format: string) {
	let tzObj;

	const timeZones = [
		{ name: 'Africa/Johannesburg', abbr: 'SAST', extraAbbr: 'SAST' },
		{ name: 'America/Araguaina', abbr: 'BET', extraAbbr: '-03' },
		{ name: 'America/Mexico_City', abbr: 'CST', extraAbbr: 'CST' },
		{ name: 'America/Cordoba', abbr: 'AGT', extraAbbr: '-03' },
		{ name: 'America/Denver', abbr: 'MST', extraAbbr: 'MST' },
		{ name: 'America/Los_Angeles', abbr: 'PST', extraAbbr: 'PST' },
		{ name: 'America/New_York', abbr: 'EST', extraAbbr: 'EST' },
		{ name: 'Asia/Calcutta', abbr: 'IST', extraAbbr: 'IST' },
		{ name: 'Asia/Dubai', abbr: 'GST', extraAbbr: '+04' },
		{ name: 'Asia/Hong_Kong', abbr: 'HKT', extraAbbr: 'HKT' },
		{ name: 'Asia/Kuala_Lumpur', abbr: 'MYT', extraAbbr: '+08' },
		{ name: 'Asia/Manila', abbr: 'PHT', extraAbbr: 'PST' },
		{ name: 'Asia/Shanghai', abbr: 'CTT', extraAbbr: 'CST' },
		{ name: 'Asia/Tokyo', abbr: 'JST', extraAbbr: 'JST' },
		{ name: 'Australia/Brisbane', abbr: 'AET', extraAbbr: 'AEST' },
		{ name: 'Europe/Berlin', abbr: 'CET', extraAbbr: 'CET' },
		{ name: 'Europe/Istanbul', abbr: 'EET', extraAbbr: '+03' },
		{ name: 'Europe/Lisbon', abbr: 'WET', extraAbbr: 'WET' },
		{ name: 'Europe/London', abbr: 'GMT', extraAbbr: 'GMT' }
	]


	if (format) {
		if (tzAbbr) {
			tzObj = timeZones.filter((tz) => tz.abbr === tzAbbr)[0];
		} else {
			// @ts-ignore
			const tzGuess = moment.tz.guess();

			tzObj = timeZones.filter(
				// @ts-ignore
				(tz) => tz.extraAbbr === moment.tz(tzGuess).zoneAbbr()
			)[0];

			tzAbbr = tzObj ? tzObj.abbr : '';
		}

		const showTZ = format.includes('hh:mm') ? ' ' + tzAbbr : ''

		return tzObj
			// @ts-ignore
			? moment(date).tz(tzObj.name).format(format) + showTZ
			: moment(date).format(format)
	}

	return moment(date).format()
}
