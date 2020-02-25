export const apiUrl = 'http://localhost:3001/api'
export const gremioId = 1083

export async function request(endPoint, params = null, signal, method = 'GET') {

    const options = {
        method,
        signal: signal,
        headers: {
            'Content-Type': 'text/plain'
        }
    }

    const response = await fetch(apiUrl + endPoint, options)

    if (response.status !== 200) {
        return generateErrorResponse('The server responded with an unexpected status.')
    }

    const result = await response.json()

    return result;
}

function generateErrorResponse(message) {
    return {
        status: 'error',
        message
    }
}