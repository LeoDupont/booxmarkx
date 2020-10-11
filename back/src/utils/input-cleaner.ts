export module InputCleaner {

	export function email(mail: string) {
		return mail.trim().toLocaleLowerCase();
	}

	export function url(input: string) {
		return input.trim();
	}

}