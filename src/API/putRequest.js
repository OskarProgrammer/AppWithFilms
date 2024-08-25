
export const putRequest = async ( endpoint , payload) => {
    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    }

    try {
        await fetch(endpoint, requestOptions)
    } catch {
        throw Error(`Error during putting ${payload} to ${endpoint}`)
    }
}