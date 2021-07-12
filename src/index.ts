import * as discord from './discord'
import { Config } from './types';

function run(cfg: Config) {
    let start = Date.now()

    discord.sendEmbed(cfg).then(() => {
        console.log(`Webhook delivered successfully in ${Number((Date.now() - start) / 1000).toFixed(2)} second(s)!`)
        process.exit(0)
    }).catch(err => {
        console.log(err)
        process.exit(1)
    })
}

// TODO: read config
run();
