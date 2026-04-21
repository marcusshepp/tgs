#!/usr/bin/env node
// One-shot: clean up the events + reviews collection schema for TGS.
// - removes unused fields (events.locationLabel, events.menuPdfUrl)
// - converts ISO-text fields to datetime (orderOpensAt/ClosesAt, pickupStartAt/EndAt, reviews.date)
// - strips "(ISO 8601…)" out of labels
// - assigns `order` to every events field so the form renders in website order

import {
    DynamoDBClient,
    GetItemCommand,
    PutItemCommand,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

const TABLE = 'sync-platform-production';
const REGION = 'us-east-1';
const PK = 'PORTAL#tgs';
const SK = 'CMS#schema';

// Relies on AWS_PROFILE / AWS_REGION from the calling shell.
const client = new DynamoDBClient({ region: REGION });

const got = await client.send(
    new GetItemCommand({ TableName: TABLE, Key: marshall({ PK, SK }) }),
);
if (!got.Item) throw new Error('schema row not found');
const row = unmarshall(got.Item);
const schema = row.schema;
const events = schema.documents?.events;
if (!events) throw new Error('events collection not in schema');

// 1. Remove unused fields
delete events.fields.locationLabel;
delete events.fields.menuPdfUrl;

// 2. Convert ISO-text fields to datetime with clean labels
const datetimeFields = {
    orderOpensAt: 'Order Opens At',
    orderClosesAt: 'Order Closes At',
    pickupStartAt: 'Pickup Window Start',
    pickupEndAt: 'Pickup Window End',
};
for (const [key, label] of Object.entries(datetimeFields)) {
    if (events.fields[key]) {
        events.fields[key].type = 'datetime';
        events.fields[key].label = label;
    }
}

// 3. Clean label on the human-friendly display strings so they don't confuse
events.fields.date && (events.fields.date.label = 'Date (display text, e.g. "Friday, April 28th, 2026")');
events.fields.startTime && (events.fields.startTime.label = 'Start Time (display text, e.g. "5:00 PM")');
events.fields.endTime && (events.fields.endTime.label = 'End Time (display text, e.g. "7:00 PM")');

// 4. Assign order to every remaining event field in website-display order
const eventFieldOrder = [
    'slug',
    'name',
    'status',
    'badge',
    'date',
    'startTime',
    'endTime',
    'location',
    'coverImage',
    'description',
    'highlights',
    'orderOpensAt',
    'orderClosesAt',
    'maxOrders',
    'linkedMenuItemSlugs',
    'pickupLocation',
    'pickupStartAt',
    'pickupEndAt',
    'specialMenuHeading',
    'menuImageUrl',
];
eventFieldOrder.forEach((key, idx) => {
    if (events.fields[key]) events.fields[key].order = idx + 1;
});

// 5. Do the same for reviews.date
const reviews = schema.documents?.reviews;
if (reviews?.fields?.date) {
    reviews.fields.date.type = 'datetime';
    reviews.fields.date.label = 'Review Date';
}

// Put it back
row.updatedAt = new Date().toISOString();
await client.send(
    new PutItemCommand({ TableName: TABLE, Item: marshall(row, { removeUndefinedValues: true }) }),
);

console.log('✓ schema updated');
console.log('  events fields:', Object.keys(events.fields).length);
console.log('  datetime fields:', Object.keys(datetimeFields).join(', '));
