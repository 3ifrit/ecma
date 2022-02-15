import fastify from 'fastify';
// see axios doc on how to use it
import axios from 'axios';

const app = fastify({ logger: true });

let requestCat = async () => {
    try {
        const cat = await axios.get(
            `https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=3`
        );
        console.log(cat);
        const fact = cat.data.map((cat) => {
            return cat.text;
        });
        return fact;
    } catch (err) {
        console.log('Error');
        return null;
    }
};

let requestFox = async () => {
    try {
        const fox = await axios.post('https://randomfox.ca/floof/');
        return fox.data.image;
    } catch (err) {
        console.log('Error');
        return null;
    }
};

let requestHolidays = async () => {
    try {
        const holidays = await axios.get(
            `https://date.nager.at/api/v2/PublicHolidays/2021/fr`
        );
        return holidays.data;
    } catch (err) {
        console.log('Error');
        return null;
    }
};

let fetchApis = async () => {
    const catFacts = await requestCat();
    const foxPicture = await requestFox();
    const holidays = await requestHolidays();

    return {
        foxPicture: foxPicture,
        catFacts: catFacts,
        holidays: holidays,
    };
};

app.post('/', async (req, res) => {
    return await fetchApis(req.body);
});

// Run the server!
const start = async () => {
    try {
        await app.listen(5000);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();