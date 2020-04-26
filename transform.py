#!/usr/bin/env python
# -*- coding: utf-8 -*-
import csv
import json


def find_stop(card, other_cards):
    starts_after = [x['start'] for x in other_cards if x['start'] > card['start']]
    if len(starts_after) > 0:
        return min(starts_after)
    return 0


def parse_int(i):
    if i == '':
        return 0
    return int(i)


def get_seconds(h, m, s):
    return parse_int(h) * 60 * 60 + parse_int(m) * 60 + parse_int(s)


def main():
    cards = []
    with open('ikoria.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for line in reader:
            line['start'] = get_seconds(line['hour'],
                                        line['minute'],
                                        line['second'])
            cards.append(line)
    show_1_cards = [x for x in cards if x['show'] == '1']
    show_2_cards = [x for x in cards if x['show'] == '2']
    for card in show_1_cards:
        card['stop'] = find_stop(card, show_1_cards)
    for card in show_2_cards:
        card['stop'] = find_stop(card, show_2_cards)
    with open('ikoria.json', 'w') as jsonfile:
        json.dump(cards, jsonfile)


if __name__ == "__main__":
    main()
