export async function fetchCovidData (country) {
    const endpoint = window.encodeURI(
        `https://disease.sh/v3/covid-19/countries`,
    );

    const res = await fetch(endpoint);
    const data = await res.json();

    if (!data) {
        throw new Error(data.message);
    }
    return data;
}