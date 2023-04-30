export async function fetchData(url) {
    const res = await fetch(url);
    if (!res.ok) {
        throw {
            "message": JSON.parse(res._bodyText).error,
            "status": res.status,
            "statusText": res.statusText,
        }
    }
    const data = await res.json();
    return data;
}