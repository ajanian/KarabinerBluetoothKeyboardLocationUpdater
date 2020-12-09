#!/usr/local/bin/node

import execa from "execa";
import { readFileSync, writeFileSync } from "fs";
import { getLogger } from "log4js";

const log = getLogger();
log.level = 'INFO';

if (process.argv.length !== 3) {
    log.error("Must specify karabiner config filename");
    process.exit(1);
} else {
    const karabinerConfigFilename = process.argv[2];

    log.info(`Updating ${karabinerConfigFilename}`);

    (async (): Promise<void> => {
        const { stdout } = await execa(`${__dirname}/../bin/getLocationID.sh`);

        //TODO #3 check exit code in javascript

        if (stdout && /^[0-9]*$/.test(stdout)) {
            // the result from the command is a number and only a number
            log.debug(stdout);

            const locationID = parseInt(stdout);

            const karabinerConfig = JSON.parse(readFileSync(karabinerConfigFilename, 'utf-8'));

            log.debug(JSON.stringify(karabinerConfig, null, 2));

            // be a _little_ lazy here.  rather than be precise about where to replace the locationID just do it under any rule recursively
            karabinerConfig?.profiles?.forEach((profile: { complex_modifications: { rules: any[]; }; }) => {
                profile.complex_modifications.rules.forEach((rule) => {
                    changeLocationIDs(rule, locationID);
                });
            });

            log.debug(JSON.stringify(karabinerConfig, null, 2));

            writeFileSync(karabinerConfigFilename, JSON.stringify(karabinerConfig, null, 2));

            log.info(`Updated ${locationID} in ${karabinerConfigFilename}`);

            process.exit(0);
        } else {
            log.error(`Result from getLocationID.sh does not contain only a number: ${stdout}`);
            process.exit(2);
        }

    })();
}

function changeLocationIDs(rule: any, locationID: number): void {
    for (const prop in rule) {
        if ({}.hasOwnProperty.call(rule, prop)) {
            if (typeof rule[prop] === 'object') {
                changeLocationIDs(rule[prop], locationID);
            }
            else if (prop === 'location_id') {
                rule[prop] = locationID;
            }
        }
    }
}