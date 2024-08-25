
export const getRequest = async (endpoint) => {
    let data = []

    try {
        data = await fetch(endpoint)
    } catch {
        throw Error(`Error during getting the endpoint ${endpoint}`)
    }

    return data.json()
}