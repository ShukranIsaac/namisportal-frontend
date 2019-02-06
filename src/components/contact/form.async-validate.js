
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const AsyncValidate = async (values, dispatch) => {

    return sleep(1000).then(() => {
        // silmulate server latency
        if (['foo@foo.com', 'isaa@isaa.com'].includes(values.email)) {
            // eslint-disable-next-line
            throw { email: 'Email already exists' }
        }
    });

}

export default AsyncValidate;
