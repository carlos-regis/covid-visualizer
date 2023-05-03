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

function getErrorMsg(message, country) {
    if (message === 'Not Found') {
      return `${country} doesn't exist`;
    }
  
    return message;
  }

async function getCountryProfile(country) {
    const res = await fetch(`https://disease.sh/v3/covid-19/countries/${country}`);
    const data = await res.json();
    if (data.message) {
      throw new Error(getErrorMsg(data.message, country));
    }
    return data;
}

function calculateScore(casesPerOneMillion, deathsPerOneMillion) {
    return casesPerOneMillion + deathsPerOneMillion * 2;
}

async function getCountryData(country) {
    const profile = await getCountryProfile(country);

    return {
        profile,
        score: calculateScore(
            profile.casesPerOneMillion,
            profile.deathsPerOneMillion),
    };
}

function sortPlayers(countries) {
    return countries.sort((a, b) => b.score - a.score);
  }

export async function comparison(countries) {
    const countries_1 = await Promise.all([
        getCountryData(countries[0]),
        getCountryData(countries[1]),
    ]);
    return sortPlayers(countries_1);
  }