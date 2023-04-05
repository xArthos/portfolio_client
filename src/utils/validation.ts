export const areRequired = (values: Object, errors: Object, keys: Array<string>) => {
    keys.forEach(key => {
        if (!values[key] || values[key] === null || values[key] === '') errors[key] = 'Required';
        // if (
        //     values[key]?.country === null ||
        //     values[key]?.country === '' ||
        //     key === 'country' && !values[key]?.country ||
        //     JSON.stringify(values[key]?.country) === '{}'
        // ) errors[key] = 'Required';
    }); 
};

export const maxCharacterLength = (values: any, errors: { [x: string]: string; }, checks: any) => {
    for (const check of checks) {
        if (values[check.key] && values[check.key].length > check.length)
            errors[check.key] = `${values[check.key].length} / ${check.length} 
            Max number of characters has reached`;
    };
};

export const infoCheck = (data: { toString: () => { (): any; new(): any; length: number; }; }) => {
    return data && data.toString().length >= 1 ? data : 'Currently no information';
};