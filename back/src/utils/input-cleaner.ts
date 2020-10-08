export module InputCleaner {

	export function email(mail: string) {
		return mail.trim().toLocaleLowerCase();
	}

}