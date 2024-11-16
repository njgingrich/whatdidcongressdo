# System Design

How do we keep the data (mostly) up to date?

## Daily

- Hit the Bills api to get the list of bills updated in the last day

## Hourly

- Look at bills (internally) updated within the last 24h
- Check their associated endpoints for new updates

