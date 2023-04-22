const needle = require('needle');
const express = require('express'); 
const nodeNotifier = require('node-notifier');

const date = new Date()
const nowDate = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`
const URL = `https://www.avtovokzal.org/app_php/request_schedule.php?id=1346&date=%27${nowDate}%27&station=nt&platform=web`;

const PORT = 5555

const app = express();

app.set('view engine', 'pug');
app.set('views', './views')

app.get('/api' , async (req, respons) => {
    setTimeout(() => {
        nodeNotifier.notify({
            title: 'bus starting',
            message: 'Run',
        });
    }, 10000)

    const data = await fetInfo()
    respons.render('index', {buses: data});
})

app.listen(PORT, () => console.log(`Server listen on PORT ${PORT}`));

async function fetInfo (){
    return await needle(URL).then((res) => JSON.parse(res.body).data)
}

    // "builds": [
    //     {
    //         "src": "./api/index.js",
    //         "use": "@vercel/node"
    //     }
    // ],
    // "routes": [
    //     {
    //         "src": "/(.*)",
    //         "dest": "/"
    //     }
    // ]