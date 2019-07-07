const API_BASE = 'https://api.lyrics.ovh/v1/';

const handleResponses = async (response = null) => {
    let errorMessage = '';
    if (response && response.type) {
        if (response.ok) {
            switch (response.status) {
                case 200:
                    return await response.json();
                default:
                    console.log('THIS SHOULD NOT HAPPEN!: ', response);
                    return true;
            }
        } else {
            switch (response.status) {
                case 400:
                    errorMessage = 'Song lyrics could not be found.';
                    throw errorMessage;
                default:
                    errorMessage = 'Something went wrong.';
                    throw errorMessage;
            }
        }
    } else {
        errorMessage = response && response.message ? response.message : response ? response : 'Error response missing.';
        throw errorMessage;
    }
};

const fetchData = async (methodType, path, bodyData) => {
    const requestHeaders = new Headers();
    requestHeaders.append('Content-Type', 'application/json-patch+json');

    const data = {
        method: methodType,
        headers: requestHeaders,
        body: bodyData ? JSON.stringify(bodyData) : null
    };

    const endpoint = `${API_BASE}${path}`;

    try {
        const request = new Request(endpoint, data);
        const response = await fetch(request);
        return handleResponses(response);
    } catch (error) {
        return handleResponses(error);
    }
};

export default {
    get: async (path = '') => (await fetchData('GET', path)),
    post: async (path = '', body = undefined) => (await fetchData('POST', path, body)),
    put: async (path = '', body = undefined) => (await fetchData('PUT', path, body)),
    patch: async (path = '', body = undefined) => (await fetchData('PATCH', path, body)),
    delete: async (path = '') => (await fetchData('DELETE', path))
};

// This class keeps count of the amount calls done
// for a particular action. This is done so we can make
// sure only the result of the latest call done is returned
// to the app. This is so we can prevent unnecessary
// component updates
export class Counter {
    constructor(states = []) {
        // ['stateNameA', 'stateNameB'] =>
        // { stateNameA: 0, stateNameB: 0 }
        this.counters = states.reduce((acc, identifier) => ({
            ...acc,
            [identifier]: 0
        }), {});
    }

    increment(identifier) {
        this.counters[identifier]++;
        return this.counters[identifier];
    }

    reset(identifier) {
        this.counters[identifier] = 0;
    }

    isCurrent(identifier, value) {
        return this.counters[identifier] === value;
    }
}
