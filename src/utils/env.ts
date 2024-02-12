function checkEnvVariable(value: unknown, name: string) {
	if (!value || typeof value !== 'string') {
		throw new Error(`Env variable ${name} is not set.`);
	}

	return value;
}

export const API_URL = checkEnvVariable(
	process.env.EXPO_PUBLIC_API_URL,
	'EXPO_PUBLIC_API_URL',
);
