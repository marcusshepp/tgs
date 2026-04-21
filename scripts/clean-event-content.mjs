#!/usr/bin/env node
// Strip removed fields (locationLabel, menuPdfUrl) from existing TGS event
// content so the validator doesn't reject saves as `unknownField`.

import {
    DynamoDBClient,
    QueryCommand,
    UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

const TABLE = 'sync-platform-production';
const REGION = 'us-east-1';
const PK = 'PORTAL#tgs';
const REMOVED = ['locationLabel', 'menuPdfUrl'];

const client = new DynamoDBClient({ region: REGION });

async function scanEventItems(prefix) {
    const out = [];
    let last;
    do {
        const res = await client.send(
            new QueryCommand({
                TableName: TABLE,
                KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
                ExpressionAttributeValues: marshall({
                    ':pk': PK,
                    ':sk': prefix,
                }),
                ExclusiveStartKey: last,
            }),
        );
        out.push(...(res.Items ?? []).map((i) => unmarshall(i)));
        last = res.LastEvaluatedKey;
    } while (last);
    return out;
}

const drafts = await scanEventItems('CMS#draft#collection#events#');
const pubs = await scanEventItems('CMS#published#collection#events#');
const all = [...drafts, ...pubs];
console.log(`found ${all.length} event items (${drafts.length} draft, ${pubs.length} published)`);

let touched = 0;
for (const item of all) {
    const c = item.content ?? {};
    const removing = REMOVED.filter((k) => k in c);
    if (removing.length === 0) continue;
    const expr =
        'REMOVE ' + removing.map((_, i) => `content.#k${i}`).join(', ');
    const names = Object.fromEntries(
        removing.map((k, i) => [`#k${i}`, k]),
    );
    await client.send(
        new UpdateItemCommand({
            TableName: TABLE,
            Key: marshall({ PK: item.PK, SK: item.SK }),
            UpdateExpression: expr,
            ExpressionAttributeNames: names,
        }),
    );
    touched++;
    console.log(`  cleaned ${item.SK} (removed: ${removing.join(', ')})`);
}

console.log(`\n✓ done — ${touched}/${all.length} items cleaned`);
